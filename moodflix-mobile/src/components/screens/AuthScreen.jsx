import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native";

export default function AuthScreen({ children, isLogin }) {

  return (
    <View className="flex-1 bg-raisinBlack">

      
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}