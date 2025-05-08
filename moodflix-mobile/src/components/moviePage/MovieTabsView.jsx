import { useMemo, useState } from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import castMovie from "../../lib/mocks/castMovie.json";
import Tabs from "../commoms/Tabs";
import MovieDetailsList from "./MovieDetailsList";
import PeopleList from "./PeopleList";

export default function MovieTabsView() {
    const [index, setIndex] = useState(0);

    const TabContent = useMemo(() => {
        switch (index) {
            case 0:
                return <PeopleList people={castMovie.cast} />;
            case 1:
                return <PeopleList people={castMovie.crew} isCasting={false} />;
            case 2:
                return <MovieDetailsList />;
        }
    }, [index]);

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
        <Tabs current={current} onChange={onChange} items={['Cast', 'Crew', 'Detalles']} tabsWidth={wp("90%")} />
    );
}