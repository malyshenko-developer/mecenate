import React, {useState} from 'react';
import {View, Text, ActivityIndicator, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import { observer } from 'mobx-react';
import { SafeAreaView } from 'react-native-safe-area-context';

import MaskotSvg from '../../assets/icons/maskot.svg';

import {usePosts} from "../hooks/usePosts";
import PostItem from "../components/PostItem";
import {tokens} from "../constants/tokens";
import {FeedTabs} from "../components/FeedTabs";

type TabType = 'all' | 'free' | 'paid';

const FeedScreen = observer(() => {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = usePosts(
        activeTab === 'all' ? undefined : activeTab
    );

    if (isLoading) return <ActivityIndicator size={"large"} />;

    if (error) return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <MaskotSvg />
            <Text style={{marginTop: tokens.space.xl, marginBottom: tokens.space.lg, ...tokens.typography.h4, fontWeight: "bold", color: tokens.colors.textPrimary}}>Не удалось загрузить публикации</Text>
            <TouchableOpacity style={{
                minWidth: 239,
                backgroundColor: tokens.colors.brandPrimary,
                paddingTop: tokens.space.sm,
                paddingBottom: tokens.space.sm,
                paddingHorizontal: tokens.space.xl,
                borderRadius: tokens.radii.md,
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
        <SafeAreaView style={{ flex: 1, backgroundColor: tokens.colors.bgScreen }}>
            <FeedTabs activeTab={activeTab} onTabChange={setActiveTab}  />

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

                style={{ flex: 1, backgroundColor: tokens.colors.bgScreen }}
            />
        </SafeAreaView>
    );
});

export default FeedScreen;