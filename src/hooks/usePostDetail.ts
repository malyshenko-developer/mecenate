import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import {apiClient, CommentsResponse, PostDetailResponse} from "../services/api";

export const usePostDetail = (postId: string) => {
    return useQuery({
        queryKey: ["post", postId],
        queryFn: () => apiClient.getPost(postId),
        enabled: !!postId,
        select: (data: PostDetailResponse) => data.data.post
    })
}

export const useComments = (postId: string) => {
    return useInfiniteQuery({
        queryKey: ['comments', postId],
        queryFn: ({ pageParam }) =>
            apiClient.getComments(postId, {
                limit: 20,
                cursor: pageParam as string | null
            }),
        initialPageParam: null,
        getNextPageParam: (lastPage: CommentsResponse) => {
            return lastPage.data.hasMore ? lastPage.data.nextCursor : undefined;
        },
        enabled: !!postId,
    });
};