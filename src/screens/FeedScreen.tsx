import React from 'react';
import {View, Text, Button, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import { observer } from 'mobx-react';
import {usePosts} from "../hooks/usePosts";
import PostItem from "../components/PostItem";

const FeedScreen = observer(() => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = usePosts()

    if (isLoading) return <ActivityIndicator size={"large"} />;

    const posts = data?.pages.flatMap(page => page.data.posts) || []

    return (
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem post={item} />}
                keyExtractor={item => item.id}
                onEndReached={() => hasNextPage && fetchNextPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <ActivityIndicator style={{ padding: 20 }} />
                    ) : null
                }
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }
                contentContainerStyle={{
                    paddingBottom: 40
                }}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}

                style={{ flex: 1, backgroundColor: '#F5F8FD' }}
            />
    );
});

export default FeedScreen;