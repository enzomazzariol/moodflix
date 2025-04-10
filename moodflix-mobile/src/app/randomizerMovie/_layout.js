import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { BackArrowIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";

export default function RandomizerMovieLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.richBlue,
          borderTopWidth: 0,
          height: heightPercentageToDP("10%"),
        },
        headerTitleStyle: {
          color: colors.floralWhite,
          fontFamily: "Outfit-SemiBold",
        },
        headerLeft: () => (
          <Pressable>
            <BackArrowIcon size={26} color={colors.floralWhite} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="[id]" options={{ title: "Randomizer Movie" }} />
    </Stack>
  );
}
