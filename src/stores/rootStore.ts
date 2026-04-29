import { makeAutoObservable } from 'mobx';
import { Post } from '../types/api';

class RootStore {
    posts: Post[] = [];
    likes = new Map<string, { isLiked: boolean; likesCount: number }>();
    websocketConnected = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLike(postId: string, isLiked: boolean, likesCount: number) {
        this.likes.set(postId, { isLiked, likesCount });
    }

    getLike(postId: string) {
        return this.likes.get(postId);
    }
}

export const rootStore = new RootStore();