import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import { RouteProp } from '@react-navigation/native';

import {RootStackParamList} from "../types/navigation";
import {useComments, usePostDetail} from "../hooks/usePostDetail";
import {PostComment} from "../components/PostComment";
import {tokens} from "../constants/tokens";
import PostItem from "../components/PostItem";
import {SafeAreaView} from "react-native-safe-area-context";

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>

interface PostDetailScreenProps {
    route: PostDetailScreenRouteProp;
}

const PostDetailScreen = ({ route }: PostDetailScreenProps) => {
    const { postId } = route.params || {};

    const { data: post, isLoading: postLoading, refetch } = usePostDetail(postId);
    const {
        data: commentsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: commentsLoading,
        refetch: refetchComments
    } = useComments(postId);

    const comments = commentsData?.pages.flatMap(page => page.data.comments) || []

    const onRefresh = () => {
        refetch()
        refetchComments()
    }

    if (postLoading) {
        return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.bgScreen, paddingHorizontal: tokens.space.lg }}>
            <FlatList
                data={comments}
                renderItem={({ item }) => <PostComment comment={item} />}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={postLoading || commentsLoading} onRefresh={onRefresh} />
                }
                onEndReached={() => hasNextPage && fetchNextPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <ActivityIndicator
                            style={{ padding: tokens.space.xxl }}
                            color={tokens.colors.textSecondary}
                        />
                    ) : null
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tokens.space.xxxl }}
                style={{ backgroundColor: tokens.colors.bgScreen }}
            />
        </SafeAreaView>
    );
};

export default PostDetailScreen;