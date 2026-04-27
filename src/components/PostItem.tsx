import {Image, TouchableOpacity, View, Text} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/native";

import LikeSvg from '../../assets/icons/like.svg';
import CommentSvg from '../../assets/icons/comment.svg';
import DollarSvg from '../../assets/icons/dollar.svg';

import {Post} from "../types/api";
import {RootStackParamList} from "../types/navigation";
import {tokens} from "../constants/tokens";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

interface PostItemProps {
    post: Post
}

const PostItem = ({ post}: PostItemProps) => {
    const navigation = useNavigation<Navigation>();

    const isPaid = post.tier === 'paid';

    const handlePress = () => {
        navigation.navigate('PostDetail', { postId: post.id });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ backgroundColor: tokens.colors.bgCard, borderRadius: tokens.radii.sm  }}>
            <View style={{ paddingTop: tokens.space.md, paddingBottom: tokens.space.lg, paddingHorizontal: tokens.space.lg, flexDirection: "row", alignItems: "center", gap: tokens.space.md }}>
                <Image source={{uri: post.author.avatarUrl}} style={{ width: 40, height: 40, borderRadius: tokens.radii.pill }} />
                <Text style={{ fontWeight: 'bold' }}>{post.author.displayName}</Text>
            </View>

            <View style={{ width: "100%", aspectRatio: 1, marginBottom: tokens.space.sm, position: 'relative' }}>
                <Image source={{ uri: post.coverUrl }} style={{ width: '100%', height: '100%'}} blurRadius={isPaid ? 20 : 0} />

                {isPaid && (
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: tokens.colors.overlayDark,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{borderRadius: tokens.radii.xs, width: 42, height: 42, backgroundColor: tokens.colors.brandPrimary, justifyContent: 'center',
                                alignItems: 'center', marginBottom: tokens.space.sm}}>
                                <DollarSvg width={20} height={20} />
                            </View>
                            <Text style={{
                                color: tokens.colors.white,
                                textAlign: 'center',
                                ...tokens.typography.body,
                                fontWeight: "semibold",
                                maxWidth: 236,
                                marginBottom: tokens.space.md
                            }}>
                                Контент скрыт пользователем. Доступ откроется после доната
                            </Text>

                            <View style={{
                                paddingHorizontal: tokens.space.xl,
                                paddingVertical: tokens.space.md,
                                borderRadius: tokens.radii.md,
                                width: 239,
                                backgroundColor: tokens.colors.brandPrimary,
                                alignItems: 'center',
                            }}>
                                <Text style={{ color: tokens.colors.white, fontWeight: '600', ...tokens.typography.body }}>
                                    Отправить донат
                                </Text>
                            </View>
                        </View>
                )}
            </View>

            <View style={{ paddingHorizontal: tokens.space.lg,
                paddingBottom: tokens.space.md }}>
                {!isPaid ? (
                    <>
                        <Text style={{ ...tokens.typography.h4,
                            color: tokens.colors.textPrimary,
                            fontWeight: "bold", marginBottom: tokens.space.sm }}>
                            {post.title}</Text>
                        <View style={{ position: 'relative', marginBottom: tokens.space.lg }}>
                            <Text
                                style={{
                                    ...tokens.typography.body,
                                    color: tokens.colors.textPrimary,
                                    fontWeight: "medium"
                                }}
                                numberOfLines={2}
                            >
                                {post.body}
                            </Text>

                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: tokens.colors.white,
                                    opacity: 0.8
                                }} />

                                <Text style={{
                                    color: tokens.colors.brandPrimary,
                                    ...tokens.typography.body,
                                    fontWeight: '500',
                                    backgroundColor: tokens.colors.white
                                }}>
                                    Показать еще
                                </Text>
                            </View>
                        </View>

                        <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: tokens.space.sm}}>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: tokens.space.sm, height: 36, backgroundColor: tokens.colors.bgPill,
                                borderRadius: tokens.radii.pill, paddingHorizontal: tokens.space.md}}>
                                <LikeSvg width={16} height={16} />
                                <Text style={{ ...tokens.typography.caption,
                                    color: tokens.colors.textSecondary,
                                    fontWeight: "bold"
                                }}>
                                    {post.likesCount}
                                </Text>
                            </View>
                            <View style={{display: "flex", flexDirection: "row", alignItems: "center", gap: tokens.space.sm, height: 36, backgroundColor: tokens.colors.bgPill,
                                borderRadius: tokens.radii.pill, paddingHorizontal: tokens.space.md}}>
                                <CommentSvg width={16} height={16} />
                                <Text style={{
                                    ...tokens.typography.caption,
                                    color: tokens.colors.textSecondary,
                                    fontWeight: "bold"
                                }}>{post.commentsCount}</Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={{ marginBottom: tokens.space.sm, borderRadius: tokens.radii.lg, width: "100%", height: 26, backgroundColor: tokens.colors.bgSkeleton, maxWidth: 164, marginTop: tokens.space.sm }} />
                        <View style={{ borderRadius: tokens.radii.lg, width: "100%", height: 40, backgroundColor: tokens.colors.bgSkeleton }} />
                    </>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default PostItem