import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useMoodflix } from "../../../../shared/hooks/useMoodflix";
import LoginForm from "../../components/forms/loginForm";
import AuthScreen from "../../components/screens/AuthScreen";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { loginAuth } = useMoodflix();
  const router = useRouter();
  const { setUser } = useAuth();

  const onSubmit = async (emailOrUsername, password, rememberMe) => {
    if (!emailOrUsername || !password) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    try {
      const response = await loginAuth(emailOrUsername, password);

      if (response?.token && response?.userDTO) {
        await AsyncStorage.setItem("authToken", response.token);
        if (rememberMe) {
          await AsyncStorage.setItem("rememberMe", "true");
        } else {
          await AsyncStorage.removeItem("rememberMe");
        }

        setUser(response.userDTO);
        router.replace("/(tabs)");
      } else {
        console.log("Login inválido");
      }
    } catch (err) {
      Alert.alert("Error", err.message || "Ocurrió un error inesperado");
    }
  };

  return (
    <AuthScreen isLogin={true}>
      <LoginForm onSubmit={onSubmit} />
    </AuthScreen>
  );
}
