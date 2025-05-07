import { Image, Text, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function WhereToWatch({ streamingProviders }) {
    const imageLogoUrl = "https://image.tmdb.org/t/p/w92"
    const providers = streamingProviders?.ES?.flatrate ?? []; 

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
          Donde ver
        </Text>

        <View className="flex-row items-center space-x-2">
          {providers.map((service) => (
            <Image
              key={service.provider_id}
              source={{ uri: `${imageLogoUrl}${service.logo_path}` }}
              style={{ width: wp("10%"), height: hp("5%") }}
              className="rounded-lg"
              resizeMode="contain"
            />
          ))}
        </View>
      </View>
    );
}