import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import movie from "../../lib/mocks/movieDetails.json";
import GroupRow from "../commoms/GroupRow";

export default function MovieDetailsList() {
   const groupedFields = [
     {
       title: "Idiomas",
       items: [
         // movie.original_language,
         ...movie.spoken_languages.map((l) => l.english_name),
       ],
       needIcon: true,
     },
     {
       title: "Países",
       items: movie.production_countries.map((p) => p.name),
       needIcon: true,
     },
     {
       title: "Compañías",
       items: movie.production_companies.map((p) => p.name),
       needIcon: true,
     },
     {
       title: "Finanzas",
       needIcon: false,
       items: [
         `Presupuesto:  ${movie.budget.toLocaleString("es-ES", {
           style: "currency",
           currency: "USD",
         })}`,
         `Ganancias:  ${movie.revenue.toLocaleString("es-ES", {
           style: "currency",
           currency: "USD",
         })}`,
       ],
     },
   ];

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: hp("1%"),
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1">
        {groupedFields.map((group, idx) => (
          <GroupRow key={idx} title={group.title} items={group.items} needIcon={group.needIcon} />
        ))}
      </View>
    </ScrollView>
  );
}
