import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import {RootStackParamList} from "../types/navigation";

type PostDetailScreenRouteProp = RouteProp<RootStackParamList, 'PostDetail'>

interface PostDetailScreenProps {
    route: PostDetailScreenRouteProp;
}

const PostDetailScreen = ({ route }: PostDetailScreenProps) => {
    const { postId } = route.params || {};
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Post Detail {postId}</Text>
        </View>
    );
};

export default PostDetailScreen;