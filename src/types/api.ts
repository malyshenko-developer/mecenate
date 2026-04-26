export interface Author {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    bio: string;
    subscribersCount: number;
    isVerified: boolean;
}

export interface Post {
    id: string;
    author: Author;
    title: string;
    body: string;
    preview: string;
    coverUrl?: string;
    likesCount: number;
    commentsCount: number;
    isLiked: boolean;
    tier: 'free' | 'paid';
    createdAt: string;
}

export interface Comment {
    id: string;
    postId: string;
    author: Author;
    text: string;
    createdAt: string;
}

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