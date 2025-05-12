import { FlatList } from "react-native";
import {
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import EmotionBtn from "../commoms/EmotionBtn";
import { Title } from "../commoms/Title";

export default function EmotionSlider({ title, emotions}) {
    return (
      <>
        <Title className="font-spaceGroteskBold" style={{ paddingLeft: hp("1.5%") }}>{title}</Title>
        <FlatList
          data={emotions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <EmotionBtn width="25%">{item}</EmotionBtn>}
          contentContainerStyle={{
            paddingVertical: hp("1.7%"),
            paddingLeft: hp("1.5%"),
            gap: hp("2%"),
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          windowSize={3}
        />
      </>
    );
}