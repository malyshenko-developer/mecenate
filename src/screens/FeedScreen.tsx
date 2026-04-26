import React from 'react';
import {View, Text, Button} from 'react-native';
import { observer } from 'mobx-react';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

import {RootStackParamList} from "../types/navigation";

const FeedScreen = observer(() => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
            <Button
                title="Go to PostDetail"
                onPress={() => navigation.navigate('PostDetail', { postId: 'test-123' })}
            />
        </View>
    );
});

export default FeedScreen;