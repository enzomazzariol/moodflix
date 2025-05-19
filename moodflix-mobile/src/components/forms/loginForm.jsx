import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from "react-native";
import { loginFields } from "../../lib/authFields";
import SubmitBtn from "../commoms/SubmitBtn";
import GenericForm from "./GenericForm";

export default function LoginForm({ onSubmit, isLoading }) {
  const resetOnboarding = async () => {
    await AsyncStorage.removeItem("hasSeenOnboarding");
    console.log("Onboarding reseteado ✅");
  };

  return (
    <View className="flex-1 items-center justify-center pb-0">
      {/*
      <Image
        className={`rounded-md mb-8`}
        style={{ width: hp("10%"), height: hp("10%") }}
        source={require("../../../assets/william.png")}
      /> */}

      <Text className="text-4xl font-outfitBold text-white mb-8">
        Iniciar sesión en Moodflix
      </Text>

      <SubmitBtn handleSubmit={resetOnboarding} text="Reset onboarding">
        <Text className="text-xl font-outfitBold text-white">
          Reset onboarding
        </Text>
      </SubmitBtn>

      <GenericForm
        fields={loginFields}
        onSubmit={onSubmit}
        buttonText="Iniciar sesión"
        accountText="¿Aún sin una cuenta? Regístrate"
        accountRoute="/signup"
        isLogin={true}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = {
  container: `flex-1 items-center justify-center `,
  title: `text-xl font-bold text-stone-100`,
  image: "flex-1 cover justify-center items-center",
};
