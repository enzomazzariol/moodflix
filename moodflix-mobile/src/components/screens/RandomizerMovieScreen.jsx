import { SafeAreaView } from "react-native-safe-area-context";

export default function RandomizerMovieScreen({ children}) {
  return (
    <SafeAreaView className="bg-richBlue flex-1 items-center">
        {children}
    </SafeAreaView>
  );
}