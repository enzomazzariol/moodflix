import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from "react-native";
import BgSVGLogin from "../../../assets/test-login.svg"; // Fondo de login
import BgSVGSignUp from "../../../assets/test-signup.svg"; // Fondo de signup

export default function AuthScreen({ children, isLogin }) {

  const BgSVG = isLogin ? BgSVGLogin : BgSVGSignUp;

  return (
    <View className="flex-1">
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <BgSVG />
      </View>
      
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