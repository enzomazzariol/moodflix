import { ActivityIndicator, View } from "react-native";
import { useMovie } from "../../../../shared/hooks/useMovie";
import GroupRow from "../commoms/GroupRow";

export default function MovieDetailsList({ movieId }) {
  const { movieDetails: movie } = useMovie(movieId);
  const groupedFields = [
    {
      title: "Idiomas",
      items: [
        movie?.original_language || "No disponible",
        ...(movie?.spoken_languages || [{ name: "No disponible" }]).map(
          (l) => l.english_name
        ),
      ],
      needIcon: true,
    },
    {
      title: "Países",
      items: (movie?.production_companies || [{ name: "No disponible" }]).map(
        (p) => p.name
      ),
      needIcon: true,
    },
    {
      title: "Compañías",
      items: (movie?.production_companies || [{ name: "No disponible" }]).map(
        (p) => p.name
      ),
      needIcon: true,
    },
    {
      title: "Finanzas",
      needIcon: false,
      items: [
        `Presupuesto:  ${
          movie?.budget?.toLocaleString?.("es-ES", {
            style: "currency",
            currency: "USD",
          }) || "No disponible"
        }`,
        `Ganancias:  ${
          movie?.revenue?.toLocaleString?.("es-ES", {
            style: "currency",
            currency: "USD",
          }) || "No disponible"
        }`,
      ],
    },
  ];

  if (!movie) {
    return (
      <View className="items-center justify-center">
        <ActivityIndicator size={24} color="white" />
      </View>
    );
  }

  return (
      <View className="">
        {groupedFields?.map((group, idx) => (
          <GroupRow key={idx} title={group.title} items={group.items} needIcon={group.needIcon} />
        ))}
      </View>
  );
}
