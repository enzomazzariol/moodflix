import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BackArrowIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

export default function RandomizerMovieLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackButtonDisplayMode: "minimal",
        headerStyle: {
          backgroundColor: colors.raisinBlack,
          height: hp("10%"),
          borderBottomWidth: 1,
          borderBottomColor: colors.jasper,
        },
        headerTitleStyle: {
          fontFamily: fonts.outfitSemiBold,
          fontSize: 20,
          paddingBottom: hp("1%"),
          color: colors.floralWhite,
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <BackArrowIcon size={26} color={colors.floralWhite} />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Randomizer Movie",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
