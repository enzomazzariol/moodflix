import { FlatList } from "react-native";
import {
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import EmotionBtn from "../commoms/EmotionBtn";
import { Title } from "../commoms/Title";

export default function EmotionSlider({ title, emotions}) {
    return (
      <>
        <Title>{title}</Title>
        <FlatList
          data={emotions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <EmotionBtn>{item}</EmotionBtn>}
          contentContainerStyle={{
            paddingVertical: hp("1.7%"),
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