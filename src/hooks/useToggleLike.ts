import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient, PostDetailResponse, PostsResponse} from '../services/api';

interface ToggleLikeVariables {
    postId: string;
}

interface ToggleLikeData {
    isLiked: boolean;
    likesCount: number;
}

interface MutationContext {
    previousPost: PostDetailResponse | undefined;
    previousPosts: PostsResponse | undefined;
}

export const useToggleLike = () => {
    const queryClient = useQueryClient();

    return useMutation<
        ToggleLikeData,
        Error,
        ToggleLikeVariables,
        MutationContext
    >({
        mutationFn: ({ postId }) => apiClient.toggleLike(postId),

        onMutate: async ({ postId }): Promise<MutationContext> => {
            await queryClient.cancelQueries({ queryKey: ['post', postId] });
            await queryClient.cancelQueries({ queryKey: ['posts'] });

            const previousPost = queryClient.getQueryData<PostDetailResponse>(['post', postId]);

            queryClient.setQueryData(['post', postId], (oldPost: PostDetailResponse | undefined) => {
                if (!oldPost?.data?.post) return oldPost;
                const post = oldPost.data.post;
                return {
                    ...oldPost,
                    data: {
                        ...oldPost.data,
                        post: {
                            ...post,
                            isLiked: !post.isLiked,
                            likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
                        },
                    },
                };
            });

            queryClient.setQueriesData<InfiniteData<PostsResponse>>(
                { queryKey: ['posts'] },
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
                                        ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
                                        : p
                                ),
                            },
                        })),
                    };
                }
            );

            return { previousPost, previousPosts: undefined };
        },

        onError: (_err, variables, context) => {
            const postId = variables.postId;
            if (context?.previousPost) {
                queryClient.setQueryData(['post', postId], context.previousPost);
            }

            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },

        onSettled: (_data, _error, variables) => {
            const postId = variables.postId;

            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            // queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
};