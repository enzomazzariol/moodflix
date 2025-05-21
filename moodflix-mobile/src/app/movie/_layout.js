import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BackArrowIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

export default function MovieLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        //headerShown: true,
        headerStyle: {
          backgroundColor: colors.raisinBlack,
        },
        headerTitleStyle: {
          fontFamily: fonts.outfitSemiBold,
          fontSize: 20,
          paddingBottom: hp("1%"),
          color: colors.floralWhite,
        },
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <BackArrowIcon size={26} color={colors.floralWhite} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Movie page",
        }}
      />

      <Stack.Screen name="review" options={{ title: "Reseñas" }} />
    </Stack>
  );
}
