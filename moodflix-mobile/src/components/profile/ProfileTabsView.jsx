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
                return <Vistas />;
            case 1:
                return <Favoritos />;
            case 2:
                return <Watchlist />;
            default:
                return <Vistas />;
        }
    }, [index]);

    return (
      <View className="justify-center items-center" style={{paddingTop: hp("3%")}}>
        <TabsController onChange={setIndex} current={index} />
          {TabContent}
      </View>
    );
}

function TabsController({ current, onChange }) {
    return (
        <Tabs current={current} onChange={onChange} />
    );
}