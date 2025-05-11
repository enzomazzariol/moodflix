import { Image, Pressable } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ProfilePicture({ picture, size, onPress, url, style, width, height }) {
  return (
    <Pressable onPress={onPress}>
      <Image
        source={url}
        className="rounded-full"
        resizeMode="cover"
        style={{ 
            ...style,
            width: width ?? hp("10%"), 
            height: height ?? hp("10%") 
        }}
      />
    </Pressable>
  );
}
