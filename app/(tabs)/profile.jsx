import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { CURRENT_USER } from '../../src/data/mockData';

export default function ProfileScreen() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
      router.replace('/auth/login');
    }, 800);
  };

  const MENU_ITEMS = [
    { icon: 'confirmation-number', title: 'Vé của tôi & Lịch sử xem', route: '/(tabs)/tickets' },
    { icon: 'stars', title: 'Hội viên Star Club', route: '/star-club', badge: 'Gold' },
    { icon: 'local-offer', title: 'Kho Ưu Đãi & Voucher', route: '/promotions', badge: '3 mới' },
    { icon: 'notifications', title: 'Thông báo', route: '/notifications' },
    { icon: 'settings', title: 'Cài đặt & Trợ giúp rạp', route: '/settings' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Hồ Sơ Cá Nhân</Text>
        {/* <TouchableOpacity
          onPress={() => router.push('/screens-overview')}
          style={styles.allScreensBtn}
          activeOpacity={0.7}
        >
          <MaterialIcons name="grid-view" size={14} color={THEME.colors.primaryContainer} />
          <Text style={styles.allScreensText}>22 Màn hình</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* User Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: CURRENT_USER.avatar }} style={styles.avatar} />
          <View style={styles.userMeta}>
            <Text style={styles.userName}>{CURRENT_USER.name}</Text>
            <Text style={styles.userPhone}>+84 {CURRENT_USER.phone}</Text>
            <View style={styles.tierPill}>
              <MaterialIcons name="stars" size={12} color={THEME.colors.primaryContainer} />
              <Text style={styles.tierText}>{CURRENT_USER.membershipTier}</Text>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <TouchableOpacity onPress={() => router.push('/star-club')} style={styles.statBox} activeOpacity={0.8}>
            <Text style={styles.statValue}>{CURRENT_USER.starPoints}</Text>
            <Text style={styles.statLabel}>StarPoints</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity onPress={() => router.push('/(tabs)/tickets')} style={styles.statBox} activeOpacity={0.8}>
            <Text style={styles.statValue}>{CURRENT_USER.totalBookings}</Text>
            <Text style={styles.statLabel}>Vé đã đặt</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity onPress={() => router.push('/promotions')} style={styles.statBox} activeOpacity={0.8}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Voucher</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Navigation Group */}
        <Text style={styles.sectionHeading}>Tài khoản & Dịch vụ</Text>
        <View style={styles.menuGroup}>
          {MENU_ITEMS.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => router.push(item.route)}
              style={styles.menuItem}
              activeOpacity={0.75}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <MaterialIcons name={item.icon} size={20} color={THEME.colors.primaryContainer} />
                </View>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>

              <View style={styles.menuItemRight}>
                {item.badge && (
                  <View style={styles.menuBadge}>
                    <Text style={styles.menuBadgeText}>{item.badge}</Text>
                  </View>
                )}
                <MaterialIcons name="chevron-right" size={20} color={THEME.colors.outline} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutBtn}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={18} color={THEME.colors.secondaryContainer} />
          <Text style={styles.logoutText}>Đăng xuất tài khoản</Text>
        </TouchableOpacity>

        <Text style={styles.versionFooter}>Cinema Star App v3.5.0 • Powered by Dolby & IMAX</Text>
      </ScrollView>

      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => !isLoggingOut && setShowLogoutModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.logoutModalCard}>
            {/* Warning Icon Box */}
            <View style={styles.logoutIconHalo}>
              <View style={styles.logoutIconBox}>
                <MaterialIcons name="logout" size={32} color={THEME.colors.secondaryContainer} />
              </View>
            </View>

            <Text style={styles.modalTitle}>Đăng Xuất Tài Khoản?</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản{' '}
              <Text style={styles.boldUserName}>{CURRENT_USER.name}</Text>?
              Điểm thưởng Star Club ({CURRENT_USER.starPoints} điểm) và các vé đã đặt của bạn vẫn được lưu giữ an toàn.
            </Text>

            {/* Quick Profile Snippet */}
            <View style={styles.snippetCard}>
              <Image source={{ uri: CURRENT_USER.avatar }} style={styles.snippetAvatar} />
              <View>
                <Text style={styles.snippetName}>{CURRENT_USER.name}</Text>
                <Text style={styles.snippetPhone}>+84 {CURRENT_USER.phone}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                style={styles.cancelBtn}
                disabled={isLoggingOut}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelBtnText}>Hủy bỏ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmLogout}
                style={styles.confirmLogoutBtn}
                disabled={isLoggingOut}
                activeOpacity={0.88}
              >
                {isLoggingOut ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <MaterialIcons name="logout" size={18} color="#FFFFFF" />
                    <Text style={styles.confirmLogoutText}>Đăng xuất</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  allScreensBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
    gap: 4,
  },
  allScreensText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 16,
    gap: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 14,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: THEME.colors.primaryContainer,
  },
  userMeta: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  userPhone: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
  },
  tierPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
    marginTop: 6,
  },
  tierText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  statLabel: {
    fontSize: 10,
    color: THEME.colors.outline,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 10,
  },
  menuGroup: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.onSurface,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  menuBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 86, 37, 0.1)',
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 86, 37, 0.3)',
  },
  logoutText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.secondaryContainer,
  },
  versionFooter: {
    fontSize: 9,
    color: THEME.colors.outline,
    textAlign: 'center',
    marginTop: 20,
  },

  /* LOGOUT MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoutModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.xl,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 86, 37, 0.35)',
    shadowColor: THEME.colors.secondaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  logoutIconHalo: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 86, 37, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoutIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  boldUserName: {
    color: THEME.colors.primary,
    fontWeight: '700',
  },
  snippetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLowest,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '100%',
    gap: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  snippetAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  snippetName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  snippetPhone: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurfaceVariant,
  },
  confirmLogoutBtn: {
    flex: 1.2,
    backgroundColor: THEME.colors.secondaryContainer,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    shadowColor: THEME.colors.secondaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmLogoutText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
