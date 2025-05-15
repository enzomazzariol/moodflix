import { Image, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const providerLogos = {
  "Movistar Plus+":
    "https://image.tmdb.org/t/p/w92/jse4MOi92Jgetym7nbXFZZBI6LK.jpg",
  "Movistar Plus+ Ficción Total":
    "https://image.tmdb.org/t/p/w92/f6TRLB3H4jDpFEZ0z2KWSSvu1SB.jpg",
  SkyShowtime: "https://image.tmdb.org/t/p/w92/h0ZYcYHicKQ4Ixm5nOjqvwni5NG.jpg",
  Max: "https://image.tmdb.org/t/p/w92/170ZfHTLT6ZlG38iLLpNYcBGUkG.jpg",
  Tivify: "https://image.tmdb.org/t/p/w92/8VhN4PeHU7yfMNoWK0DnwdS1HlS.jpg",
  "Max  Originals Amazon Channel":
    "https://image.tmdb.org/t/p/w92/5m6o1XxLQzGzJ5n3t2vYf0k5j0ZQp.png",
  Netflix: "https://image.tmdb.org/t/p/w92/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
  "Disney Plus":
    "https://image.tmdb.org/t/p/w92/97yvRBw1GzX7fXprcF80er19ot.jpg",
  "Apple TV": "https://image.tmdb.org/t/p/2E03IAZsX4ZaUqM7tXlctEPMGWS.jpg",
  "Amazon Prime Video":
    "https://image.tmdb.org/t/p/w92/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
  "Rakuten TV":
    "https://image.tmdb.org/t/p/w92/bZvc9dXrXNly7cA0V4D9pR8yJwm.jpg",
  "Filmin Plus":
    "https://image.tmdb.org/t/p/w92/ozZU2vSlyL11rFGEkq1HE0yxIJq.jpg",
  "Google Play Movies":
    "https://image.tmdb.org/t/p/w92/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg",
  MUBI: "https://image.tmdb.org/t/p/w92/fj9Y8iIMFUC6952HwxbGixTQPb7.jpg",
  "Youtube Premium": "https://image.tmdb.org/t/p/w92YouTube Premium",
  "Amazon Video":
    "https://image.tmdb.org/t/p/w92/seGSXajazLMCKGB5hnRCidtjay1.jpg",
  "Pluto TV": "https://image.tmdb.org/t/p/w92/dB8G41Q6tSL5NBisrIeqByfepBc.jpg",
  "Netflix Standard with Ads":
    "https://image.tmdb.org/t/p/w92/dpR8r13zWDeUR0QkzWidrdMxa56.jpg",
  Crunchyroll: "https://image.tmdb.org/t/p/w92/fzN5Jok5Ig1eJ7gyNGoMhnLSCfh.jpg",
  "Apple TV Plus Amazon Channel":
    "https://image.tmdb.org/t/p/w92/yFrZVSC4UnDpeIzX2svcRPgV5P5.jpg",
  "Max  Originals Amazon Channel":
    "https://image.tmdb.org/t/p/w92/2aOYyNzcLZtd1ooN6K9dWFQU9GN.jpg",
};

export default function WhereToWatch({ streamingProviders }) {
  const providersArray =
    typeof streamingProviders === "string"
      ? streamingProviders.split(",").map((p) => p.trim())
      : [];

  return (
    <View
      style={{
        width: wp("90%"),
        height: hp("6%"),
        borderRadius: 9,
        paddingHorizontal: hp("2%"),
      }}
      className="flex-row items-center justify-between bg-prussianBlue"
    >
      <Text className="text-lg text-slate-100 font-spaceGroteskBold">
        Dónde ver
      </Text>

      <View className="flex-row items-end" style={{ columnGap: wp("2%") }}>
        {providersArray.length > 0 ? (
          providersArray.map((provider, index) => {
            const logo = providerLogos[provider];
            return logo ? (
              <Image
                key={index}
                source={{ uri: logo }}
                style={{ width: wp("10%"), height: hp("5%") }}
                className="rounded-lg"
                resizeMode="contain"
              />
            ) : (
              <Text className="text-slate-300 text-sm italic">
                No disponible
              </Text>
            );
          }).slice(0, 5)
        ) : (
          <Text className="text-slate-300 text-sm italic">No disponible</Text>
        )}
      </View>
    </View>
  );
}
