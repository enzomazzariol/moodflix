import { useRouter } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useActivity } from "../../../../shared/hooks/useActivity";
import ActivityCard from "../../components/activity/ActivityCard";
import ActivityScreen from "../../components/screens/ActivityScreen";
import { colors } from "../../utils/colors";

// Libreria de rating https://github.com/kolking/react-native-rating

export default function Activity() {
  const router = useRouter();
  const { activity: activities, isLoading, error } = useActivity();

  if (isLoading) {
    return (
      <ActivityScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.floralWhite} />
        </View>
      </ActivityScreen>
    );
  }

  const goToMoviePage = (idMovie, title) => {
    router.push({
      pathname: "/movie/[idMovie]",
      params: { idMovie, title },
    });
  };

  const goToUserProfile = (id, username) => {
    router.push({
      pathname: "/userProfile/[id]",
      params: { id, username },
    });
  };

  // AÑADIR BOTON PARA FILTRAR POR TIPO DE ACTIVIDAD
  return (
    <ActivityScreen>
      <View
        className="flex-1 items-center"
        style={{ padding: hp("2%"), rowGap: hp("1.5%") }}
      >
        {[...activities]
          .sort((a, b) => new Date(b.activityDate) - new Date(a.activityDate))
          .map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
              onPressUser={() =>
                goToUserProfile(
                  activity?.user?.userId,
                  activity?.user?.username
                )
              }
              onPressMovie={() =>
                goToMoviePage(activity?.movie?.movieId, activity?.movie?.title)
              }
            />
          ))}
      </View>
    </ActivityScreen>
  );
}
