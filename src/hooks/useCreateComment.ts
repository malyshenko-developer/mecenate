import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { Comment } from '../types/api';

interface CreateCommentVariables {
    postId: string;
    text: string;
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<Comment, Error, CreateCommentVariables>({
        mutationFn: ({ postId, text }) => apiClient.createComment(postId, text),

        onSuccess: (_data, { postId }) => {
            queryClient.invalidateQueries({ queryKey: ['comments', postId], refetchType: 'none' });
            queryClient.invalidateQueries({ queryKey: ['post', postId], exact: true });
        },

        onError: (error) => {
            console.error('Create comment error:', error);
        },
    });
};