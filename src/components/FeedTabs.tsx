import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {tokens} from "../constants/tokens";

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
            paddingHorizontal: tokens.space.lg,
            paddingVertical: tokens.space.lg,
            backgroundColor: tokens.colors.bgScreen
        }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", backgroundColor: tokens.colors.bgCard, borderRadius: tokens.radii.pill, borderColor: tokens.colors.border, borderWidth: 1 }}>
                {tabs.map(tab => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: tokens.radii.lg,
                                backgroundColor: isActive ? tokens.colors.brandPrimary : tokens.colors.bgCard,
                                flex: 1,
                            }}
                            onPress={() => onTabChange(tab)}
                            activeOpacity={0.8}
                        >
                            <Text style={{
                                fontSize: 13,
                                lineHeight: 18,
                                fontWeight: isActive ? '700' : '500',
                                color: isActive ? tokens.colors.white : tokens.colors.textSecondary,
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