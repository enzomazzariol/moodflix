import { useRouter } from "expo-router";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ActivityCard from "../../components/activity/ActivityCard";
import ActivityScreen from "../../components/screens/ActivityScreen";
import { activities } from "../../lib/mocks/Activity"; // Mock de actividades

// Libreria de rating https://github.com/kolking/react-native-rating

export default function Activity() {
  const router = useRouter();

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
        {activities.map((activity, index) => (
          <ActivityCard
            key={index}
            activity={activity}
            onPressUser={() =>
              goToUserProfile(activity.user.id, activity.user.name)
            }
            onPressMovie={() =>
              goToMoviePage(activity.movie.id, activity.movie.title)
            }
          />
        ))}
      </View>
    </ActivityScreen>
  );
}
