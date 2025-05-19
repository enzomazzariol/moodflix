import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useMoodflix } from "../../../../shared/hooks/useMoodflix";
import SignupForm from "../../components/forms/SignupForm";
import AuthScreen from "../../components/screens/AuthScreen";

export default function Signup() {
  const { registerAuth, error, isLoading } = useMoodflix();
  const router = useRouter();

  const onSubmit = async ({ username, email, password, confirmPassword }) => {
    console.log(username, email, password, confirmPassword);
    if ((!username || !email || !password, !confirmPassword)) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await registerAuth(username, email, password);

      console.log(response);
      if (response?.statusCode === 201) {
        router.replace("/(auth)/login");
      } else {
        Alert.alert("Error", "Algo salió mal. Inténtalo de nuevo.");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <AuthScreen isLogin={false}>
      <SignupForm onSubmit={onSubmit} isLoading={isLoading} />
    </AuthScreen>
  );
}
