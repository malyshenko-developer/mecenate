import { makeAutoObservable } from 'mobx';
import { Post } from '../types/api';

class RootStore {
    posts: Post[] = [];
    likes = new Map<string, { isLiked: boolean; likesCount: number }>();
    websocketConnected = false;

    constructor() {
        makeAutoObservable(this);
    }

    setWebsocketConnected(connected: boolean) {
        this.websocketConnected = connected;
    }

    setLike(postId: string, isLiked: boolean | undefined, likesCount: number) {
        const existing = this.likes.get(postId);
        const newIsLiked = isLiked !== undefined ? isLiked : (existing?.isLiked ?? false);
        this.likes.set(postId, { isLiked: newIsLiked, likesCount });
    }

    getLike(postId: string) {
        return this.likes.get(postId);
    }
}

export const rootStore = new RootStore();