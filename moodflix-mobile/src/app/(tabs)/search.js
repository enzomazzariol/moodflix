import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmotionBtn from "../../components/commoms/EmotionBtn";
import SectionLink from "../../components/commoms/SectionLink";
import { Title } from "../../components/commoms/Title";
import SearchScreen from "../../components/screens/SearchScreen";
import RecentSearchComponent from "../../components/search/recentSearchComponent";
import { useSearchContext } from "../../context/SearchContext";
import { searchBrowseLinks } from "../../lib/searchData/searchBrowseLinks";

export default function Search() {
  const { isFocused } = useSearchContext();
  const router = useRouter();

  const handleNavigation = (link) => () => {
    router.push(link);
  };

  const goToEmotionSearch = (emotion) => {
    router.push(`/search/emotion/${emotion}`);
  };

  if (isFocused)
    return (
      <SearchScreen>
        <RecentSearchComponent />
      </SearchScreen>
    );

  return (
    <SearchScreen>
      <FlatList
        data={searchBrowseLinks}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <SectionLink onPress={handleNavigation(item.link)}>
            {item.name}
          </SectionLink>
        )}
        ListHeaderComponent={
          <>
            <Title className="pb-5">Por emociones</Title>
            <View
              className="flex-row gap-5 flex-wrap"
              style={{ marginBottom: hp("3%") }}
            >
              <EmotionBtn onPress={() => goToEmotionSearch("amor")}>
                Amor
              </EmotionBtn>
              <EmotionBtn onPress={() => goToEmotionSearch("tristeza")}>
                tristeza
              </EmotionBtn>
              <EmotionBtn onPress={() => goToEmotionSearch("felicidad")}>
                felicidad
              </EmotionBtn>
              <EmotionBtn onPress={() => goToEmotionSearch("amor")}>
                Amor
              </EmotionBtn>
              <EmotionBtn onPress={() => goToEmotionSearch("tristeza")}>
                tristeza
              </EmotionBtn>
              <EmotionBtn onPress={() => goToEmotionSearch("felicidad")}>
                felicidad
              </EmotionBtn>
            </View>

            <Title>Buscar por</Title>
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: hp("1%"),
          paddingVertical: hp("2%"),
          gap: hp("2%"),
        }}
      />
    </SearchScreen>
  );
}
