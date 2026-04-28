import React from 'react';
import { View, Text, Image } from 'react-native';

import { Comment as CommentType } from '../types/api';
import { tokens } from '../constants/tokens';

interface PostCommentProps {
    comment: CommentType;
}

export const PostComment = ({ comment }: PostCommentProps) => {
    return (
            <View style={{
                flexDirection: 'row',
                gap: tokens.space.md,
                paddingVertical: tokens.space.sm,
                paddingHorizontal: tokens.space.lg,
                backgroundColor: tokens.colors.white
            }}>
                <Image
                    source={{ uri: comment.author.avatarUrl}}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: tokens.radii.pill
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontWeight: 'bold',
                        color: tokens.colors.textPrimary,
                        ...tokens.typography.body,
                        marginBottom: 2
                    }}>
                        {comment.author.displayName}
                    </Text>
                    <Text style={{
                        color: tokens.colors.textPrimary,
                        ...tokens.typography.body,
                        fontSize: 14
                    }}>
                        {comment.text}
                    </Text>
                </View>
            </View>
    );
};