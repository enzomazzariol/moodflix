import { Text } from "react-native";

export function Title({ children, textSize = "text-3xl" }) {
    return (
        <Text className={`text-floralWhite font-outfitRegular ${textSize}`}>
            {children}
        </Text>
    )
}