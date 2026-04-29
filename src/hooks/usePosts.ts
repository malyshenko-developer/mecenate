import { useInfiniteQuery } from '@tanstack/react-query';

import {apiClient, PostsResponse} from '../services/api';

type PageParam = string | undefined;

export const usePosts = (tier?: 'free' | 'paid') => {
    return useInfiniteQuery({
        queryKey: ['posts', tier],
        queryFn: async ({ pageParam }) =>
            apiClient.getPosts({ limit: 10, cursor: pageParam, tier }),
        initialPageParam: undefined as PageParam,
        getNextPageParam: (lastPage: PostsResponse) => lastPage.data.nextCursor,
        structuralSharing: false,
    });
};