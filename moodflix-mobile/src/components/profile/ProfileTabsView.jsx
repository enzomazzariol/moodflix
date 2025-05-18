import { useMemo, useState, useCallback, useEffect } from "react";
import { useFocusEffect} from "@react-navigation/native";
import { ActivityIndicator, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from "../../context/AuthContext";
import { useUserMoviesProfile } from "../../hooks/useUserMoviesProfile";
import { colors } from "../../utils/colors";
import SubmitBtn from "../commoms/SubmitBtn";
import Tabs from "../commoms/Tabs";
import Favoritos from "./Favoritos";
import Vistas from "./Vistas";
import Watchlist from "./Watchlist";
import { EventBus } from "../../services/eventBus";

export default function ProfileTabsView() {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [index, setIndex] = useState(0);
  const { user } = useAuth();
  const { error, isLoading, userFavorites, userWatchedMovies, userWatchlist } =
    useUserMoviesProfile(user?.user_id, reloadTrigger);

  const reload = () => setReloadTrigger((r) => r + 1);

  // Evento al volver a la pantalla
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  // Evento emitido desde otras pantallas
  useEffect(() => {
    EventBus.on("userMoviesUpdated", reload);
    return () => EventBus.off("userMoviesUpdated", reload);
  }, []);

  const TabContent = useMemo(() => {
    switch (index) {
      case 0:
        return <Favoritos movies={userFavorites} />;
      case 1:
        return <Vistas movies={userWatchedMovies} />;
      case 2:
        return <Watchlist movies={userWatchlist} />;
      default:
        return <Favoritos movies={userFavorites} />;
    }
  }, [index, userFavorites, userWatchedMovies, userWatchlist]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.floralWhite} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center gap-y-5">
        <Text
          className="font-outfitBold text-3xl"
          style={{ color: colors.jasper, textAlign: "center" }}
        >
          Error al cargar la película.
        </Text>
        <SubmitBtn>
          <Text className="text-xl font-outfitBold text-white">
            Volver a intentarlo
          </Text>
        </SubmitBtn>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View style={{ paddingTop: hp("3%") }}>
        <TabsController onChange={setIndex} current={index} />
      </View>
      {TabContent}
    </View>
  );
}

function TabsController({ current, onChange }) {
    return (
        <Tabs current={current} onChange={onChange} items={['Favoritos', 'Vistas', 'Watchlist']} />
    );
}