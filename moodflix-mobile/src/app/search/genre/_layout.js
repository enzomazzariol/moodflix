import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { BackArrowIcon } from "../../../components/ui/icons";
import { colors } from "../../../utils/colors";

export default function GenreLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackButtonMenuEnabled: true,
        headerTitleStyle: {
          fontFamily: "Outfit-SemiBold",
          fontSize: 20,
          color: colors.floralWhite,
        },
        headerStyle: {
          backgroundColor: colors.raisinBlack,
        },
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <BackArrowIcon size={26} color={colors.floralWhite} />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Géneros" }} />

      <Stack.Screen name="[id]" />
    </Stack>
  );
}
