import { useMemo, useState } from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Tabs from "../commoms/Tabs";
import Favoritos from "./Favoritos";
import Vistas from "./Vistas";
import Watchlist from "./Watchlist";

export default function ProfileTabsView() {
    const [index, setIndex] = useState(0);

    const TabContent = useMemo(() => {
        switch (index) {
            case 0:
                return <Favoritos />;
            case 1:
                return <Vistas />;
            case 2:
                return <Watchlist />;
            default:
                return <Favoritos />;
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
        <Tabs current={current} onChange={onChange} items={['Favoritos', 'Vistas', 'Watchlist']} />
    );
}