import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import PosterMovie from "../commoms/PosterMovie";

export default function SearchCard({ movie }) {
    const router = useRouter();

    const handleNavigation = (id) => {
        router.push(`/movie/${id}`);
    }

    return (
        <Pressable 
            onPress={() => handleNavigation(movie?.id)}
            className="flex-row items-center gap-x-5" 
            style={{ borderBottomColor: colors.prussianBlue, borderBottomWidth: 1, paddingStart: hp("1.5%"), paddingVertical: hp("2%") }}
        >
            <PosterMovie 
                posterPath={movie?.poster_path}
                title={movie?.title}
                idMovie={movie?.id}
                posterHeight={hp("15%")}
                posterWidth={hp("10%")}
            />
            <View className="flex-col">
                <Text className="text-jasper text-2xl font-outfitBold">
                    {movie?.title}
                </Text>
                <Text className="text-floralWhite text-xl font-outfitRegular">
                    {movie?.release_date?.slice(0, 4)}
                </Text>
            </View>
        </Pressable>
    )
}