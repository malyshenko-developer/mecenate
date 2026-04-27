import {Image, TouchableOpacity, View, Text} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";

import {Post} from "../types/api";
import {RootStackParamList} from "../types/navigation";
import {tokens} from "../constants/tokens";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

interface PostItemProps {
    post: Post
}

const PostItem = ({ post}: PostItemProps) => {
    const navigation = useNavigation<Navigation>();

    const handlePress = () => {
        navigation.navigate('PostDetail', { postId: post.id });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ backgroundColor: "#FFF", borderRadius: 12 }}>
            <View style={{ paddingTop: 12, paddingBottom: 16, paddingHorizontal: 16, display: "flex", flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Image source={{uri: post.author.avatarUrl}} style={{ width: 40, height: 40, borderRadius: 999 }} />
                <Text style={{ fontWeight: 'bold' }}>{post.author.displayName}</Text>
            </View>
            <Image source={{ uri: post.coverUrl }} style={{ width: "100%", aspectRatio: 1, marginBottom: 8 }} />
            <View style={{ paddingHorizontal: 16, }}>
                <Text style={{ fontSize: 18, lineHeight: 26, color: tokens.colors.textPrimary, fontWeight: "bold", marginBottom: 8 }}>{post.title}</Text>
                <Text style={{fontSize: 15, lineHeight: 20, color: tokens.colors.textPrimary, fontWeight: "medium", marginBottom: 16}}>{post.body}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PostItem