import { Image, Pressable } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function PosterMovie({ posterPath, title, onPress }) {
    const path = `https://image.tmdb.org/t/p/w500${posterPath}`;
  return (
    <Pressable onPress={onPress}>
        <Image 
            source={{ uri: path }}
            style={{ borderRadius: 4, height: heightPercentageToDP("18%"), width: widthPercentageToDP("25%") }}
            className="border-prussianBlue border-[1px]"
        />
    </Pressable>
  );
}