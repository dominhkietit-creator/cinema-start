import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // Handle mobile web (iOS Safari, Android Chrome) as well as native devices
  // On iOS Safari web (e.g. cinema-start.vercel.app), bottom nav bar needs extra clearance
  const isWeb = Platform.OS === 'web';
  const bottomInset = insets.bottom > 0
    ? insets.bottom + 4
    : (isWeb ? 16 : (Platform.OS === 'ios' ? 24 : 10));

  const tabHeight = 60 + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(19, 21, 29, 0.98)',
          borderTopColor: 'rgba(255, 255, 255, 0.08)',
          borderTopWidth: 1,
          height: tabHeight,
          paddingBottom: bottomInset,
          paddingTop: 6,
          elevation: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 2,
        },
        tabBarActiveTintColor: THEME.colors.primaryContainer,
        tabBarInactiveTintColor: THEME.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '700',
          marginTop: 2,
          lineHeight: 14,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="local-movies" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cinemas"
        options={{
          title: 'Cụm rạp',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="place" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Vé của tôi',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="confirmation-number" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
