import { SafeAreaView, ScrollView, View } from "react-native";

export default function TabsScreen({ children}) {
  return (
    <SafeAreaView className="bg-richBlue flex-1">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}