import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import SectionLink from "../../components/commoms/SectionLink";
import { Title } from "../../components/commoms/Title";
import SearchScreen from "../../components/screens/SearchScreen";
import EmotionBtn from "../../components/search/EmotionBtn";
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
      <View className="flex-1">
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
              </View>

              <Title className="pb-0">Buscar por</Title>
            </>
          }
          contentContainerStyle={{
            paddingHorizontal: hp("1.7%"),
            paddingVertical: hp("2%"),
            gap: hp("2%"),
          }}
        />
      </View>
    </SearchScreen>
  );
}
