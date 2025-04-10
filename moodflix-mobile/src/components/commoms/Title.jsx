import { Text } from "react-native";

export function Title({ children, className = "text-3xl p-5 font-outfitBlack text-floralWhite" }) {
    return (
        <Text className={className}>
            {children}
        </Text>
    )
}