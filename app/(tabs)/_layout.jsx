import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { THEME } from '../../src/constants/theme';

const TAB_ICONS = {
  home: 'local-movies',
  cinemas: 'place',
  tickets: 'confirmation-number',
  search: 'search',
  profile: 'person',
};

function CustomCinemaTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === 'web';
  const isMobileWeb =
    isWeb &&
    typeof navigator !== 'undefined' &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || '');

  // Generous clearance for mobile browser toolbars (iOS Safari address bar / Chrome mobile nav)
  // On mobile web, Safari bottom floating address bar requires ~40-44px padding to prevent label cutoffs.
  const bottomInset = insets.bottom > 0
    ? insets.bottom + 10
    : (isMobileWeb ? 42 : (isWeb ? 18 : (Platform.OS === 'ios' ? 32 : 12)));

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: bottomInset }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const iconName = TAB_ICONS[route.name] || 'circle';

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={styles.tabButton}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <MaterialIcons
              name={iconName}
              size={22}
              color={isFocused ? THEME.colors.primaryContainer : THEME.colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.tabLabel,
                isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
            {isFocused ? (
              <View style={styles.activeDot} />
            ) : (
              <View style={styles.inactiveDotPlaceholder} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomCinemaTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Trang chủ',
        }}
      />
      <Tabs.Screen
        name="cinemas"
        options={{
          title: 'Cụm rạp',
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          title: 'Vé của tôi',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Tìm kiếm',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#13151D',
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    borderTopWidth: 1,
    paddingTop: 8,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    minHeight: 50,
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    marginTop: 2,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: THEME.colors.primaryContainer,
  },
  tabLabelInactive: {
    color: THEME.colors.onSurfaceVariant,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME.colors.primaryContainer,
    marginTop: 2,
  },
  inactiveDotPlaceholder: {
    width: 4,
    height: 4,
    marginTop: 2,
  },
});
