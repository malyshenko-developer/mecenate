import { useEffect } from 'react';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import { wsService } from '../services/websocket';
import { rootStore } from '../stores/rootStore';
import { PostsResponse, CommentsResponse } from '../services/api';
import { Comment } from '../types/api';

export const useWebSocket = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        wsService.connect();

        const unsubLike = wsService.on('like_updated', (payload: { postId: string; likesCount: number }) => {
            const { postId, likesCount } = payload;

            rootStore.setLike(postId, undefined, likesCount);

            queryClient.setQueriesData<InfiniteData<PostsResponse>>(
                { queryKey: ['posts'] },
                (oldData) => {
                    if (!oldData?.pages) return oldData;
                    let changed = false;
                    const newPages = oldData.pages.map((page) => ({
                        ...page,
                        data: {
                            ...page.data,
                            posts: page.data.posts.map((p) => {
                                if (p.id === postId && p.likesCount !== likesCount) {
                                    changed = true;
                                    return { ...p, likesCount };
                                }
                                return p;
                            }),
                        },
                    }));
                    return changed ? { ...oldData, pages: newPages } : oldData;
                }
            );

            queryClient.setQueryData(['post', postId], (oldPost: any) => {
                if (!oldPost?.data?.post || oldPost.data.post.likesCount === likesCount) return oldPost;
                return {
                    ...oldPost,
                    data: {
                        ...oldPost.data,
                        post: { ...oldPost.data.post, likesCount },
                    },
                };
            });
        });

        const unsubComment = wsService.on('comment_added', (payload: { postId: string; comment: Comment }) => {
            const { postId, comment } = payload;

            // 1. Комментарии – добавляем в конец
            queryClient.setQueryData<InfiniteData<CommentsResponse>>(
                ['comments', postId],
                (oldData) => {
                    if (!oldData?.pages) return oldData;
                    const newPages = [...oldData.pages];
                    newPages[0] = {
                        ...newPages[0],
                        data: {
                            ...newPages[0].data,
                            comments: [...newPages[0].data.comments, comment],
                        },
                    };
                    return { ...oldData, pages: newPages };
                }
            );

            // 2. Детальный пост
            queryClient.setQueryData(['post', postId], (oldPost: any) => {
                if (!oldPost?.data?.post) return oldPost;
                return {
                    ...oldPost,
                    data: {
                        ...oldPost.data,
                        post: {
                            ...oldPost.data.post,
                            commentsCount: oldPost.data.post.commentsCount + 1,
                        },
                    },
                };
            });

            const postsQueries = queryClient.getQueryCache().findAll({
                queryKey: ['posts'],
            });

            postsQueries.forEach((query) => {
                queryClient.setQueryData<InfiniteData<PostsResponse>>(
                    query.queryKey,
                    (oldData) => {
                        if (!oldData?.pages) return oldData;
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page) => ({
                                ...page,
                                data: {
                                    ...page.data,
                                    posts: page.data.posts.map((p) =>
                                        p.id === postId
                                            ? { ...p, commentsCount: p.commentsCount + 1 }
                                            : p
                                    ),
                                },
                            })),
                        };
                    }
                );
            });
        });

        return () => {
            unsubLike();
            unsubComment();
        };
    }, [queryClient]);
};