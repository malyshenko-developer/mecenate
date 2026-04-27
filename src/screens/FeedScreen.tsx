import React from 'react';
import {View, Text, Button, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';

import MaskotSvg from '../../assets/icons/maskot.svg';

import {usePosts} from "../hooks/usePosts";
import PostItem from "../components/PostItem";
import {tokens} from "../constants/tokens";

const FeedScreen = observer(() => {
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = usePosts()

    if (isLoading) return <ActivityIndicator size={"large"} />;

    if (error) return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <MaskotSvg />
            <Text style={{marginTop: 32, marginBottom: 16, fontSize: 18, lineHeight: 26, fontWeight: "bold", color: tokens.colors.textPrimary}}>Не удалось загрузить публикации</Text>
            <TouchableOpacity style={{
                minWidth: 239,
                backgroundColor: '#6115CD',
                paddingTop: 8,
                paddingBottom: 8,
                paddingHorizontal: 24,
                borderRadius: 14,
                alignItems: 'center',
            }} onPress={() => refetch()}>
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    lineHeight: 26,
                    fontWeight: '600'
                }}
                >
                    Повторить
                </Text>
            </TouchableOpacity>
        </View>
    )

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