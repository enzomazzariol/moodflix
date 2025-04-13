import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View
} from "react-native";

export default function SearchScreen({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-richBlue">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} 
      >
          <View className="flex-1">{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
