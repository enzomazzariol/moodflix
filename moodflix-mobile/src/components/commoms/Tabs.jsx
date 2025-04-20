import { Tab } from "@rneui/themed";
import { View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "../../utils/colors";

export default function Tabs({current, onChange}) {
  const width = wp("94%");
  const height = hp("4.9%");
  const paddingBottom = hp("1.4%");

  return (
    <View
      className="justify-center items-center" style={{ paddingBottom }}
    >
      <View
        style={{
          width,
          height,
          borderRadius: 6,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.prussianBlue,
          backgroundColor: colors.raisinBlack,
          elevation: 2,
          justifyContent: "center",
        }}
      >
        <Tab
          value={current}
          onChange={onChange}
          dense
          containerStyle={{
            width,
            height,
          }}
          indicatorStyle={{
            backgroundColor: colors.jasper,
            height: 3,
            borderRadius: 2,
            marginBottom: 1,
          }}
          titleStyle={{
            color: colors.jasper,
            fontFamily: "SpaceGrotesk-Regular",
            fontSize: hp("1.8%"),
            marginTop: hp("0.2%"),
          }}
        >
          <Tab.Item>Vistas</Tab.Item>
          <Tab.Item>Favoritos</Tab.Item>
          <Tab.Item>Watchlist</Tab.Item>
        </Tab>
      </View>
    </View>
  );
}
