import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useActivity } from "../../../../shared/hooks/useActivity";
import ActivityCard from "../../components/activity/ActivityCard";
import SubmitBtn from "../../components/commoms/SubmitBtn";
import Tabs from "../../components/commoms/Tabs";
import ActivityScreen from "../../components/screens/ActivityScreen";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../utils/colors";

export default function ActivityTabsView() {
  const { user } = useAuth();
  const {
    activity: activities,
    userActivity,
    isLoading,
    error,
  } = useActivity(user?.user_id);
  const [index, setIndex] = useState(0);
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

  const getCustomText = (activityType, title) => {
    switch (activityType) {
      case "LIKE":
        return `Te ha gustado "${title}"`;
      case "WATCHLIST":
        return `Has añadido "${title}" a tu watchlist`;
      case "VIEWED":
        return `Has marcado "${title}" como vista`;
      case "REVIEW":
        return `Has hecho una reseña de "${title}"`;
      default:
        return null;
    }
  };

  const TabContent = useMemo(() => {
    const filteredActivities =
      index === 0 ? [...(activities ?? [])] : [...(userActivity ?? [])];

    const sortedActivities = filteredActivities.sort(
      (a, b) => new Date(b.activityDate) - new Date(a.activityDate)
    );

    return (
      <View
        className="flex-1 items-center"
        style={{ padding: hp("1%"), rowGap: hp("1.5%") }}
      >
        {sortedActivities.map((activity, i) => {
          const isCurrentUser = activity?.user?.userId === user?.user_id;
          const customText = isCurrentUser
            ? getCustomText(activity?.activityType, activity?.movie?.title)
            : null;

          return (
            <ActivityCard
              key={i}
              activity={activity}
              customText={isCurrentUser ? getCustomText(activity?.activityType, activity?.movie?.title) : null}
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
          );
        })}
      </View>
    );
  }, [activities, userActivity, index, user?.user_id]);

  if (isLoading) {
    return (
      <ActivityScreen>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.floralWhite} />
        </View>
      </ActivityScreen>
    );
  }

  if (error) {
    return (
      <ActivityScreen>
        <View className="flex-1 items-center justify-center gap-y-5">
          <Text
            className="font-outfitBold text-3xl"
            style={{ color: colors.jasper, textAlign: "center" }}
          >
            Error al cargar las actividades.
          </Text>
          <SubmitBtn>
            <Text className="text-xl font-outfitBold text-white">
              Volver a intentarlo
            </Text>
          </SubmitBtn>
        </View>
      </ActivityScreen>
    );
  }

  return (
    <ActivityScreen>
      <View className="flex-1">
        <View style={{ paddingTop: hp("2%") }}>
          <TabsController onChange={setIndex} current={index} />
        </View>
        {TabContent}
      </View>
    </ActivityScreen>
  );
}

function TabsController({ current, onChange }) {
  return (
    <Tabs
      current={current}
      onChange={onChange}
      items={["Todos", "Mi actividad"]}
    />
  );
}
