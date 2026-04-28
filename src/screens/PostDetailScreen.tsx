import React from 'react';
import {
    ActivityIndicator,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    Text, TouchableWithoutFeedback,
    View
} from 'react-native';
import { RouteProp } from '@react-navigation/native';

import {RootStackParamList} from "../types/navigation";
import {useComments, usePostDetail} from "../hooks/usePostDetail";
import {PostComment} from "../components/PostComment";
import {tokens} from "../constants/tokens";
import PostItem from "../components/PostItem";
import {SafeAreaView} from "react-native-safe-area-context";
import {commentsPlural} from "../utils/pluralize";
import {CommentInput} from "../components/CommentInput";
import {useBehavior} from "../hooks/useBehavior";

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>

interface PostDetailScreenProps {
    route: PostDetailScreenRouteProp;
}

const PostDetailScreen = ({ route }: PostDetailScreenProps) => {
    const { postId } = route.params || {};
    const behaviour = useBehavior()

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
        <SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.bgScreen }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={behaviour}
                enabled
            >
            <FlatList
                data={comments}
                renderItem={({ item }) => <PostComment comment={item} />}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl refreshing={postLoading || commentsLoading} onRefresh={onRefresh} />
                }
                onEndReached={() => hasNextPage && fetchNextPage()}
                onEndReachedThreshold={0.1}
                ListHeaderComponent={
                <>
                    {post && <PostItem post={post} mode={"full"} />}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: tokens.space.lg, paddingTop: tokens.space.xs, paddingBottom: tokens.space.sm, backgroundColor: tokens.colors.bgCard }}>
                        <Text style={{ color: tokens.colors.textMuted, fontWeight: "semibold", ...tokens.typography.body }}>{post?.commentsCount} {commentsPlural(post?.commentsCount || 0)}</Text>
                        <Text style={{ color: tokens.colors.brandPrimary, fontWeight: "medium", ...tokens.typography.body }}>Сначала новые</Text>
                    </View>
                </>
                }
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <ActivityIndicator
                            style={{ padding: tokens.space.xxl }}
                            color={tokens.colors.textSecondary}
                        />
                    ) : null
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: tokens.space.sm }}
                style={{ backgroundColor: tokens.colors.bgScreen }}
            />

            <CommentInput />
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

export default PostDetailScreen;