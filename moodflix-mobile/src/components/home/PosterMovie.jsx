import { useRouter } from "expo-router";
import { Image, Pressable } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function PosterMovie({ posterPath, title, idMovie }) {
    const path = `https://image.tmdb.org/t/p/w500${posterPath}`;
    const router = useRouter();

    const goToMoviePage = () => {
        router.push(`/movie/${idMovie}`);
    }
  return (
    <Pressable onPress={goToMoviePage}>
        <Image 
            source={{ uri: path }}
            style={{ borderRadius: 4, height: heightPercentageToDP("18%"), width: widthPercentageToDP("25%") }}
            className="border-prussianBlue border-[1px]"
        />
    </Pressable>
  );
}