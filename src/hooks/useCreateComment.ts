import {InfiniteData, useMutation, useQueryClient} from '@tanstack/react-query';
import {apiClient, CommentsResponse} from '../services/api';
import {Comment} from "../types/api";

interface CreateCommentVariables {
    postId: string;
    text: string;
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<Comment, Error, CreateCommentVariables>({
        mutationFn: ({ postId, text }) => apiClient.createComment(postId, text),

        onSuccess: async (newComment, { postId }) => {
            queryClient.setQueryData<InfiniteData<CommentsResponse>>(
                ['comments', postId],
                (old): InfiniteData<CommentsResponse> | undefined => {
                    if (!old?.pages?.[0]) return old;

                    return {
                        pageParams: old.pageParams,
                        pages: [
                            {
                                ...old.pages[0],
                                data: {
                                    ...old.pages[0].data,
                                    comments: [
                                        ...old.pages[0].data.comments,
                                        newComment
                                    ]
                                }
                            },
                            ...old.pages.slice(1)
                        ]
                    };
                }
            );

            await queryClient.invalidateQueries({ queryKey: ['post', postId], exact: true})
        },

        onError: (error) => {
            console.error('Create comment error:', error);
        },

        mutationKey: ['createComment'],
    });
};