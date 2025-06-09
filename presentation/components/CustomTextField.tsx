import {Text, TextInput, View} from "react-native";
import {ComponentType, useState} from "react";
import {colors} from "@/constants/colors";
import {SvgProps} from "react-native-svg";

interface CustomTextFieldProps {
    textFieldLabel: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    onFocus: () => void,
    onBlur: () => void,
    IconComponent?: ComponentType<SvgProps>;
    iconSize?: number;
    iconColor?: string;
}

export const CustomTextField = ({textFieldLabel, placeholder, value, onChangeText, onFocus, onBlur, IconComponent, iconSize, iconColor}: CustomTextFieldProps) => {

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    }

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    }

    return (
        <View style={{marginBottom: 20}}>
            <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: colors.labelColor,
                marginBottom: 8
            }}>
                {textFieldLabel}
            </Text>

            <View style={{
                position: 'relative',
                borderRadius: 16,
                borderWidth: isFocused ? 2 : 1,
                borderColor: isFocused ? colors.focused : colors.unfocused,
                backgroundColor: colors.textFieldBackgroundColor
            }}>
                {IconComponent && (
                    <View
                        style={{
                            position: "absolute",
                            left: 16,
                            top: 18,
                            zIndex: 1,
                        }}
                    >
                        <IconComponent
                            width={iconSize ?? 20}
                            height={iconSize ?? 20}
                            color={iconColor ?? colors.unfocused}
                        />
                    </View>
                )}
                <TextInput
                    style={{
                        paddingLeft: 48,
                        paddingRight: 16,
                        paddingVertical: 18,
                        fontSize: 16,
                        color: colors.white,
                        fontWeight: '500'
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textFieldBackgroundColor}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>
    )
}