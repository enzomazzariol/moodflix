import { useRouter } from "expo-router";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ActivityCard from "../../components/activity/ActivityCard";
import ActivityScreen from "../../components/screens/ActivityScreen";
import { activities } from "../../lib/mocks/Activity"; // Mock de actividades

// Libreria de rating https://github.com/kolking/react-native-rating

export default function Activity() {
  const router = useRouter();
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
            onPressUser={() => router.push(`/profile/${index + 1}`)}
            onPressMovie={() => router.push(`/movie/${activity.movie.id}`)}
          />
        ))}
      </View>
    </ActivityScreen>
  );
}
