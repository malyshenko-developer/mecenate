import {useState} from "react";
import {TextInput, TouchableOpacity, View} from "react-native";

import ButtonChatMessageSvg from "../../assets/icons/button-chat-message.svg"

import {tokens} from "../constants/tokens";
import {useCreateComment} from "../hooks/useCreateComment";

interface CommentInputProps {
    postId: string;
}

export const CommentInput = ({postId}: CommentInputProps) => {
    const [text, setText] = useState<string>('');
    const createComment = useCreateComment()

    const onSend = () => {
        if (text.trim()) {
            createComment.mutate({ postId, text })
            setText("")
        }
    }

    const isSendDisabled = !text.trim();

    return (
        <View style={{
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: tokens.space.lg,
            paddingVertical: tokens.space.lg,
            backgroundColor: tokens.colors.bgCard,
            alignItems: "center"
        }}>
            <TextInput
                style={{
                    flex: 1,
                    height: 40,
                    paddingHorizontal: tokens.space.lg,
                    paddingVertical: 10,
                    backgroundColor: tokens.colors.bgCard,
                    borderRadius: tokens.radii.lg,
                    ...tokens.typography.body,
                    color: tokens.colors.textPrimary,
                    borderWidth: 2,
                    borderColor: tokens.colors.border,
                }}
                placeholderTextColor={"#A4AAB0"}
                value={text}
                onChangeText={setText}
                returnKeyType="send"
                onSubmitEditing={onSend}
                placeholder={"Ваш комментарий"}
            />

            <TouchableOpacity
                style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={onSend}
                disabled={isSendDisabled}
                activeOpacity={0.8}
            >
                <ButtonChatMessageSvg
                    width={30}
                    height={30}
                    color={
                        isSendDisabled
                            ? tokens.colors.purple[100]
                            : tokens.colors.purple[400]
                    }
                />
            </TouchableOpacity>
        </View>
    )
}