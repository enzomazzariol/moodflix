import { Tabs } from 'expo-router';

export default function TabsLayout() {

 //TODO: mejorar barra de navegacion cuando tenga los estilos

  return (
    <Tabs>
        <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />

      <Tabs.Screen
        name="randomizer"
        options={{
          title: "Randomizer",
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  )
}