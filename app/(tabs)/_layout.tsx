import { Tabs } from 'expo-router';
import { Home, Map, Search } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#0f172a',
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 10
      },
      tabBarActiveTintColor: '#60a5fa',
      tabBarInactiveTintColor: '#94a3b8',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Weather',
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Radar',
          tabBarIcon: ({ color }) => <Map color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}