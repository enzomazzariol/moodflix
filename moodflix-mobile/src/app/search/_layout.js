import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { BackArrowIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";

export default function SearchLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
      <Stack.Screen
        name="new"
        options={{ title: "Estrenos", headerShown: true }}
      />

      <Stack.Screen
        name="popular"
        options={{ title: "Popular", headerShown: true }}
      />

      <Stack.Screen
        name="rating"
        options={{ title: "Mejor puntaje", headerShown: true }}
      />

      <Stack.Screen
        name="genre"
        options={{ title: "Géneros", headerShown: false }}
      />

      <Stack.Screen
        name="classics"
        options={{ title: "Clásicos", headerShown: true }}
      />

      <Stack.Screen
        name="indie"
        options={{ title: "Indie", headerShown: true }}
      />

      <Stack.Screen
        name="emotion/[name]"
        options={{ title: "[Emotion]", headerShown: true }}
      />
    </Stack>
  );
}
