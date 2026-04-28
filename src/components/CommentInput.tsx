import {useState} from "react";
import {TextInput, View} from "react-native";

import {tokens} from "../constants/tokens";

export const CommentInput = () => {
    const [text, setText] = useState<string>('');

    const onSend = () => {
        if (text.trim()) {
            // TODO SEND COMMENT
            setText("")
        }
    }

    return (
        <View style={{
            flexDirection: 'row',
            gap: 10,
            paddingHorizontal: tokens.space.lg,
            paddingVertical: tokens.space.lg,
            backgroundColor: tokens.colors.bgCard
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
        </View>
    )
}