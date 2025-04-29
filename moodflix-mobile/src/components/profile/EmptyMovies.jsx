import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import SubmitBtn from "../commoms/SubmitBtn";
import { Title } from "../commoms/Title";

export default function EmptyMovies({
  title = "Prueba",
  textBtn = "prueba",
  btnRoute = "/search/popular",
}) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(btnRoute);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View 
        className = "flex-1 items-center justify-center gap-y-5"
        style={{ padding: hp("5%") }}
      >
        <Title className="text-center font-spaceGroteskBold">{title}</Title>
        <SubmitBtn handleSubmit={handleNavigation}>{textBtn}</SubmitBtn>
      </View>
    </ScrollView>
  );
}