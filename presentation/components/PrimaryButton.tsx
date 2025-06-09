import {TouchableOpacity, View, Text} from "react-native";
import {colors} from "@/constants/colors";

interface PrimaryButtonProps {
    onPress: () => void;
    buttonText: string;
    buttonColor: string;
}

export const PrimaryButton = ({onPress, buttonText, buttonColor}: PrimaryButtonProps) => {

    const handleOnPress = () => {
        onPress?.();
    }

    return (
        <View style={{gap: 12, marginBottom: 24}}>
            <TouchableOpacity
                onPress={handleOnPress}
                activeOpacity={0.8}
                style={{
                    backgroundColor: buttonColor,
                    borderWidth: 1,
                    borderColor: colors.unfocused,
                    paddingVertical: 16,
                    borderRadius: 16,
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '600',
                    }}
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}