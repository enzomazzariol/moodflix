import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { signupFields } from "../../lib/authFields";
import GenericForm from "./GenericForm";

export default function SignupForm({ onSubmit }) {
  return (
    <View className="flex-1 items-center justify-center pb-16">
      <Image
        className={`rounded-md mb-8`}
        style={{ width: hp("10%"), height: hp("10%") }}
        source={require("../../../assets/william.png")}
      />

      <Text className="text-4xl font-outfitBold text-white mb-8">
        Join to Moodflix
      </Text>

      <GenericForm
        fields={signupFields}
        onSubmit={onSubmit}
        buttonText="Registrarse"
        accountText="Ya tengo una cuenta? Inicia sesion"
        accountRoute="/login"
      />
    </View>
  );
}
