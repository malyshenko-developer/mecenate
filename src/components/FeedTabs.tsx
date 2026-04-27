import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type TabType = 'all' | 'free' | 'paid';

interface FeedTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const tabLabels: Record<TabType, string> = {
    all: 'Все',
    free: 'Бесплатные',
    paid: 'Платные',
};

export const FeedTabs = ({ activeTab, onTabChange }: FeedTabsProps) => {
    const tabs: TabType[] = ['all', 'free', 'paid'];

    return (
        <View style={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: '#F5F8FD'
        }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: "white", borderRadius: 999, borderColor: "#E8ECEF", borderWidth: 1 }}>
                {tabs.map(tab => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 22,
                                backgroundColor: isActive ? '#6115CD' : 'white',
                                flex: 1,
                            }}
                            onPress={() => onTabChange(tab)}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                fontSize: 13,
                                lineHeight: 18,
                                fontWeight: isActive ? '700' : '500',
                                color: isActive ? '#FFFFFF' : '#57626F',
                                textAlign: "center"
                            }}>
                                {tabLabels[tab]}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};