import React, { useCallback, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import Tabs from "../commoms/Tabs";
import MovieDetailsList from "./MovieDetailsList";
import PeopleList from "./PeopleList";

export default function MovieTabsView({ movieId, credits }) {
  const [index, setIndex] = useState(0);

  const handleTabChange = useCallback((newIndex) => {
    setIndex(newIndex);
  }, []);

  if (!credits) {
    return (
      <View style={{ paddingVertical: hp("5%") }}>
        <ActivityIndicator size={24} color={colors.floralWhite} />
      </View>
    );
  }

  return (
    <View
      style={{
        marginTop: hp("3%"),
      }}
    >
      <TabsController onChange={handleTabChange} current={index} />
      {index === 0 && <PeopleList people={credits.cast} />}
      {index === 1 && <PeopleList people={credits.crew} isCasting={false} />}
      {index === 2 && <MovieDetailsList movieId={movieId} />}
    </View>
  );
}

const TabsController = React.memo(({ current, onChange }) => {
  return (
    <Tabs
      current={current}
      onChange={onChange}
      items={["Cast", "Crew", "Detalles"]}
      tabsWidth={wp("90%")}
    />
  );
});
