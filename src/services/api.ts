import {Comment, Post} from "../types/api";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL
const TOKEN = "550e8400-e29b-41d4-a716-446655440000"

interface ApiParams {
    limit?: number;
    cursor?: string | null;
    tier?: 'free' | 'paid';
}

const buildQuery = (params: ApiParams = {}): string => {
    const searchParams = new URLSearchParams();
    if (params.limit !== undefined) searchParams.set('limit', params.limit.toString());
    if (params.cursor) searchParams.set('cursor', params.cursor);
    if (params.tier) searchParams.set('tier', params.tier);
    return searchParams.toString();
};

export const apiClient = {
    getPosts: async (params?: ApiParams): Promise<PostsResponse> => {
        const query = buildQuery(params);
        const response = await fetch(`${API_BASE_URL}/posts?${query}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data as PostsResponse;
    },

    getPost: async (id: string): Promise<PostDetailResponse> => {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data as PostDetailResponse;
    },

    getComments: async (postId: string, params: { limit?: number; cursor?: string | null }): Promise<CommentsResponse> => {
        const query = new URLSearchParams();
        if (params.limit) query.set('limit', params.limit.toString());
        if (params.cursor) query.set('cursor', params.cursor);

        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments?${query.toString()}`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json() as Promise<CommentsResponse>;
    },

    createComment: async (postId: string, text: string): Promise<Comment> => {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const result = await response.json();
        const comment = result.data.comment;

        return comment as Comment;
    },

    // toggleLike: async (postId: string): Promise<{ isLiked: boolean; likesCount: number }> => {
    //     const response = await fetch(`${API_BASE_URL}/posts/${postId}/like?token=${TOKEN}`, { method: 'POST' });
    //     if (!response.ok) throw new Error(`HTTP ${response.status}`);
    //     const data = await response.json();
    //     return data.data;
    // },
} as const;

export interface PostsResponse {
    ok: true;
    data: {
        posts: Post[];
        nextCursor: string | null;
        hasMore: boolean;
    };
}

export interface PostDetailResponse {
    ok: true;
    data: { post: Post };
}

export interface CommentsResponse {
    ok: true;
    data: {
        comments: Comment[];
        nextCursor: string | null;
        hasMore: boolean;
    };
}