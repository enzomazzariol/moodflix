import { FlatList, Pressable, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ReviewCard from "../../components/moviePage/ReviewCard";
import MovieScreen from "../../components/screens/MovieScreen";
import { PlusIcon } from "../../components/ui/icons";
import { colors } from "../../utils/colors";

const mockReviews = [
  {
    id: "1",
    username: "Carlos M.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.5,
    date: "2025-04-30",
    comment:
      "Una película inolvidable. Las actuaciones, la dirección y el guion fueron impecables.",
  },
  {
    id: "2",
    username: "Laura G.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
    date: "2025-04-28",
    comment:
      "Me hizo llorar. De mis favoritas de todos los tiempos, la recomiendo al 100%.",
  },
  {
    id: "3",
    username: "Javi R.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 3.5,
    date: "2025-04-25",
    comment: "Buena, pero algo lenta en la mitad. Gran final, eso sí.",
  },
  {
    id: "4",
    username: "Ana P.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4,
    date: "2025-04-22",
    comment:
      "Visualmente increíble. Un viaje emocional con personajes muy bien construidos.",
  },
];

export default function Review({ movie }) {
  // const { id } = movie;
  // Aquí iría la llamada a la API para obtener reseñas por película

  return (
    <MovieScreen>
      <View className="flex-1">
        <FlatList
          data={mockReviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewCard review={item} />}
        />

        <Pressable
          onPress={() => console.log("Add review")}
          className="rounded-full bg-jasper items-center justify-center"
          style={{
            position: "absolute",
            bottom: heightPercentageToDP("7%"),
            right: heightPercentageToDP("3%"),
            height: heightPercentageToDP("6.5%"),
            width: heightPercentageToDP("6.5%"),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <PlusIcon size={28} color={colors.floralWhite} />
        </Pressable>
      </View>
    </MovieScreen>
  );
}
