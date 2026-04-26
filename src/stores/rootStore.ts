import { makeAutoObservable } from 'mobx';

import {Post} from "../types/api";

class RootStore {
    posts: Post[] = [];
    likes = new Map<string, boolean>();
    websocketConnected = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleLike(postId: string) {
        this.likes.set(postId, !this.likes.get(postId));
    }
}

export const rootStore = new RootStore();