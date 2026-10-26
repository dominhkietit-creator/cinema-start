import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../../src/constants/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const isMobileWeb =
    isWeb &&
    typeof navigator !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');

  // Generous bottom clearance:
  // On Mobile Safari / Chrome web, the floating address bar requires ~38-42px padding
  // so text labels ('Trang chủ', 'Cụm rạp'...) sit comfortably above the browser bar and are never clipped.
  const bottomInset = insets.bottom > 0
    ? insets.bottom + 8
    : (isMobileWeb ? 40 : (isWeb ? 16 : (Platform.OS === 'ios' ? 32 : 12)));

  const tabHeight = 56 + bottomInset;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#13151D',
          borderTopColor: 'rgba(255, 255, 255, 0.08)',
          borderTopWidth: 1,
          height: tabHeight,
          paddingTop: 8,
          paddingBottom: bottomInset,
          elevation: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
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
            <MaterialIcons name="local-movies" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cinemas"
        options={{
          title: 'Cụm rạp',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="place" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Vé của tôi',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="confirmation-number" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
