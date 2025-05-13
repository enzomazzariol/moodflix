import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import EmotionBtn from "../../components/commoms/EmotionBtn";
import SectionLink from "../../components/commoms/SectionLink";
import { Title } from "../../components/commoms/Title";
import SearchScreen from "../../components/screens/SearchScreen";
import RecentSearchComponent from "../../components/search/recentSearchComponent";
import { useSearchContext } from "../../context/SearchContext";
import { emotionsNames } from "../../lib/searchData/emotionsNames";
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

  // Separador entre secciones de películas
  const RenderSectionSeparator = () => <View style={{ height: hp("2%") }} />;

  const renderHeader = () => (
    <>
      <Title className="pb-5 font-spaceGroteskBold">Por emociones</Title>
      <FlatList
        data={emotionsNames}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <EmotionBtn width="28%" onPress={() => goToEmotionSearch(item.name)}>
            {item.name}
          </EmotionBtn>
        )}
        numColumns={3}
        columnWrapperStyle={{
          columnGap: wp("4%"),
        }}
        ItemSeparatorComponent={RenderSectionSeparator}
      />
      <Title className="font-spaceGroteskBold" style={{ marginTop: hp("3%") }}>
        Buscar por
      </Title>
    </>
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
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{
          paddingHorizontal: hp("1.5%"),
          paddingVertical: hp("3%"),
          gap: hp("2%"),
        }}
      />
    </SearchScreen>
  );
}
