import { Tabs } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomProfileHeader from "../../components/profile/CustomProfileHeader";
import CustomHeaderSearchBar from "../../components/search/CustomSearchBar";
import {
  ActivityIcon,
  HomeIcon,
  SearchIcon,
  StarIcon,
  UserIcon,
} from "../../components/ui/icons";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.raisinBlack,
          borderTopWidth: 0,
          height: hp("10%"),
        },
        tabBarActiveTintColor: colors.jasper,
        tabBarInactiveTintColor: colors.floralWhite,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: hp("1.5%"),
        },

        headerTintColor: colors.floralWhite,
        headerTitleStyle: {
          fontFamily: fonts.outfitSemiBold,
          fontSize: 24,
          paddingBottom: hp("1%"),
        },
        headerStyle: {
          backgroundColor: colors.raisinBlack,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          lazy: true,
          title: "Moodflix",
          tabBarIcon: ({ color, size }) => <HomeIcon size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          lazy: true,
          header: () => <CustomHeaderSearchBar />,
          tabBarIcon: ({ color, size }) => (
            <SearchIcon size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="randomizer"
        options={{
          title: "Randomizer",
          tabBarIcon: ({ color, size }) => <StarIcon size={22} color={color} />,
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Actividad",
          tabBarIcon: ({ color, size }) => (
            <ActivityIcon size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          header: () => <CustomProfileHeader />,
          tabBarIcon: ({ color, size }) => <UserIcon size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
