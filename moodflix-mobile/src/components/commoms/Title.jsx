import { Text } from "react-native";

export function Title({ children, className, style }) {
    return (
      <Text className={`text-3xl font-outfitBlack text-floralWhite ${className}`}
        style={style}
        maxFontSizeMultiplier={1.3}
      >
        {children}
      </Text>
    );
}