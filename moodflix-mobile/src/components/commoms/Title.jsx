import { Text } from "react-native";

export function Title({ children, className, style }) {
    return (
      <Text className={`text-3xl p-5 font-outfitBlack text-floralWhite ${className}`}
        style={style}
      >
        {children}
      </Text>
    );
}