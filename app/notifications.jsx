import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../src/constants/theme';
import { NOTIFICATIONS } from '../src/data/mockData';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
    Alert.alert('Thông báo', 'Đã đánh dấu đọc tất cả thông báo.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông Báo</Text>
        <TouchableOpacity onPress={markAllRead} style={styles.markReadBtn}>
          <Text style={styles.markReadText}>Đã đọc</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {notifs.map((item) => (
          <View
            key={item.id}
            style={[styles.notifCard, !item.read && styles.notifCardUnread]}
          >
            <View style={styles.iconCircle}>
              <MaterialIcons
                name={item.icon || 'notifications'}
                size={20}
                color={!item.read ? THEME.colors.primaryContainer : THEME.colors.outline}
              />
            </View>

            <View style={styles.notifContent}>
              <View style={styles.titleRow}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                {!item.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notifMessage}>{item.message}</Text>
              <Text style={styles.notifTime}>{item.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  markReadBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  markReadText: {
    fontSize: 12,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 30,
    gap: 10,
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  notifCardUnread: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderColor: 'rgba(255, 184, 0, 0.25)',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    flex: 1,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.secondaryContainer,
    marginLeft: 6,
  },
  notifMessage: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: 6,
  },
  notifTime: {
    fontSize: 9,
    color: THEME.colors.outline,
  },
});
