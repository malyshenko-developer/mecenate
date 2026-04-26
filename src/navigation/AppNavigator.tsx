import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FeedScreen from '../screens/FeedScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import {RootStackParamList} from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
);