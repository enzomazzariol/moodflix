import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { loginFields } from "../../lib/authFields";
import SubmitBtn from "../commoms/SubmitBtn";
import GenericForm from "./GenericForm";

export default function LoginForm({ onSubmit }) {
const resetOnboarding = async () => {
  await AsyncStorage.removeItem("hasSeenOnboarding");
  console.log("Onboarding reseteado ✅");
};
  return (
    <View className="flex-1 items-center justify-center pb-16">
      <Image
        className={`rounded-md mb-8`}
        style={{ width: hp("10%"), height: hp("10%") }}
        source={require("../../../assets/william.png")}
      />

      {/*<Title textSize="text-3xl">Logo de Moodflix</Title>*/}

      <Text className="text-4xl font-outfitBold text-white mb-8">
        Login to Moodflix
      </Text>

    <SubmitBtn handleSubmit={resetOnboarding} text="Reset onboarding">
        <Text className="text-xl font-outfitBold text-white">Reset onboarding</Text>
      </SubmitBtn>
      

      <GenericForm
        fields={loginFields}
        onSubmit={onSubmit}
        buttonText="Login"
        accountText="Don't have an account? Sign up"
        accountRoute="/signup"
        isLogin={true}
      />
    </View>
  );
}

const styles = {
  container: `flex-1 items-center justify-center `,
  title: `text-xl font-bold text-stone-100`,
  image: "flex-1 cover justify-center items-center",
};
