import {useEffect} from "react";
import {observer} from "mobx-react";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import {Text, TouchableOpacity, View} from "react-native";
import * as Haptics from "expo-haptics";

import LikeSvg from '../../assets/icons/like.svg';
import  LikeSvgFilled from '../../assets/icons/like-filled.svg';

import {useToggleLike} from "../hooks/useToggleLike";
import {tokens} from "../constants/tokens";
import {rootStore} from "../stores/rootStore";

interface LikeButtonProps {
    postId: string;
    likesCount: number;
    isLiked: boolean;
}

export const LikeButton = observer(({postId,
                               likesCount: initialLikes,
                               isLiked: initialLiked }: LikeButtonProps) => {
    const { mutate: toggleLike, isPending } = useToggleLike();

    const stored = rootStore.getLike(postId);
    const currentLikes = stored ? stored.likesCount : initialLikes;
    const currentIsLiked = stored ? stored.isLiked : initialLiked;

    const scale = useSharedValue(1);
    const isLikedAnim = useSharedValue(currentIsLiked);

    useEffect(() => {
        isLikedAnim.value = currentIsLiked;
    }, [currentIsLiked]);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const likeBGStyle = useAnimatedStyle(() => ({
        backgroundColor: isLikedAnim.value ? '#FF2B75' : tokens.colors.bgPill,
    }));

    const likeTextStyle = useAnimatedStyle(() => ({
        color: isLikedAnim.value ? '#FFEAF1' : tokens.colors.textSecondary,
    }));

    const filledIconOpacity = useAnimatedStyle(() => ({
        opacity: isLikedAnim.value ? 1 : 0,
    }));
    const outlineIconOpacity = useAnimatedStyle(() => ({
        opacity: isLikedAnim.value ? 0 : 1,
    }));

    const onLikePress = () => {
        if (isPending) return;
        if (!isLikedAnim.value) {
            scale.value = withSpring(1.4, { stiffness: 800 }, () => {
                scale.value = withSpring(1, { stiffness: 800 });
            });
        }
        runOnJS(handleLike)(postId);
    };

    const handleLike = async (postId: string) => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            toggleLike(
                { postId },
                {
                    onSuccess: (data) => {
                        rootStore.setLike(postId, data.isLiked, data.likesCount);
                        isLikedAnim.value = data.isLiked;
                        if (data.isLiked) {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        }
                    },
                    onError: () => {
                        scale.value = 1;
                    },
                }
            );
        } catch (error) {
            scale.value = 1;
        }
    };

    return (
        <TouchableOpacity
            onPress={onLikePress}
            disabled={isPending}
            activeOpacity={0.7}
        >
            <Animated.View
                style={[
                    { flexDirection: "row", alignItems: "center", gap: tokens.space.sm, height: 36, borderRadius: tokens.radii.pill, paddingHorizontal: tokens.space.md },
                    likeBGStyle,
                ]}
            >
                <Animated.View style={animatedIconStyle}>
                    <Animated.View style={[{ position: 'absolute' }, filledIconOpacity]}>
                        <LikeSvgFilled width={16.35} height={15} />
                    </Animated.View>
                    <Animated.View style={outlineIconOpacity}>
                        <LikeSvg width={16.35} height={15} />
                    </Animated.View>
                </Animated.View>
                <Animated.Text style={[{ ...tokens.typography.caption, fontWeight: 'bold' }, likeTextStyle]}>
                    {currentLikes}
                </Animated.Text>
            </Animated.View>
        </TouchableOpacity>
    )
})