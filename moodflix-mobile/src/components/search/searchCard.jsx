import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { colors } from "../../utils/colors";
import PosterMovie from "../commoms/PosterMovie";

export default function SearchCard({ movie, pressed }) {
    const router = useRouter();

    const handleNavigation = (id) => {
        router.push(`/movie/${id}`);
    }

    return (
        <Pressable 
            onPress={() => handleNavigation(movie?.id)}
            className="flex-row items-center gap-x-5" 
            style={{ 
                //backgroundColor: pressed ? colors.prussianBlue : "transparent",
                borderBottomColor: colors.prussianBlue, 
                borderBottomWidth: 1, 
                paddingStart: hp("1.5%"), 
                paddingVertical: hp("2%") 
            }}
        >
            <PosterMovie 
                posterPath={movie?.poster_path}
                title={movie?.title}
                idMovie={movie?.id}
                posterHeight={hp("15%")}
                posterWidth={hp("10%")}
            />
            <View className="flex-col">
                <Text className="text-jasper text-xl font-outfitBold text-wrap" style={{ width: widthPercentageToDP("70%")}} maxFontSizeMultiplier={1.3}>
                    {movie?.title}
                </Text>
                <Text className="text-floralWhite text-lg font-outfitRegular" maxFontSizeMultiplier={1.1}>
                    {movie?.release_date?.slice(0, 4)}
                </Text>
            </View>
        </Pressable>
    )
}