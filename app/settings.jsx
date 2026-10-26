import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
  Alert,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../src/constants/theme';
import { CURRENT_USER } from '../src/data/mockData';

export default function SettingsScreen() {
  const router = useRouter();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [showtimeReminder, setShowtimeReminder] = useState(true);
  const [promoNotifications, setPromoNotifications] = useState(false);
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài Đặt & Hỗ Trợ</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* App Settings Group */}
        <Text style={styles.sectionHeading}>Bảo mật & Trải nghiệm</Text>
        <View style={styles.cardGroup}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="finger-print-outline" size={20} color={THEME.colors.tertiary} />
              <View>
                <Text style={styles.settingTitle}>Đăng nhập Face ID / Vân tay</Text>
                <Text style={styles.settingSub}>Mở khóa ứng dụng và thanh toán nhanh</Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: THEME.colors.surfaceContainerHighest, true: THEME.colors.primaryContainer }}
              thumbColor={THEME.colors.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="notifications-active" size={20} color={THEME.colors.primaryContainer} />
              <View>
                <Text style={styles.settingTitle}>Nhắc giờ chiếu trước 30 phút</Text>
                <Text style={styles.settingSub}>Thông báo chuẩn bị vào rạp</Text>
              </View>
            </View>
            <Switch
              value={showtimeReminder}
              onValueChange={setShowtimeReminder}
              trackColor={{ false: THEME.colors.surfaceContainerHighest, true: THEME.colors.primaryContainer }}
              thumbColor={THEME.colors.white}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <MaterialIcons name="local-offer" size={20} color={THEME.colors.secondary} />
              <View>
                <Text style={styles.settingTitle}>Nhận ưu đãi qua tin nhắn</Text>
                <Text style={styles.settingSub}>Vé đồng giá và quà tặng StarClub</Text>
              </View>
            </View>
            <Switch
              value={promoNotifications}
              onValueChange={setPromoNotifications}
              trackColor={{ false: THEME.colors.surfaceContainerHighest, true: THEME.colors.primaryContainer }}
              thumbColor={THEME.colors.white}
            />
          </View>
        </View>

        {/* Support & Legal Group */}
        <Text style={styles.sectionHeading}>Trung tâm hỗ trợ khách hàng</Text>
        <View style={styles.cardGroup}>
          <TouchableOpacity
            onPress={() => Linking.openURL('tel:19006868')}
            style={styles.menuRow}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons name="headset-mic" size={20} color={THEME.colors.primaryContainer} />
              <View>
                <Text style={styles.settingTitle}>Tổng đài rạp 24/7</Text>
                <Text style={styles.settingSub}>1900 6868 (1.000đ/phút)</Text>
              </View>
            </View>
            <MaterialIcons name="call" size={18} color={THEME.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert('Điều khoản', 'Điều khoản sử dụng dịch vụ đặt vé Cinema Star')}
            style={styles.menuRow}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons name="description" size={20} color={THEME.colors.outline} />
              <Text style={styles.settingTitle}>Điều khoản dịch vụ</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={THEME.colors.outline} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Alert.alert('Chính sách', 'Chính sách bảo mật thông tin người dùng Cinema Star')}
            style={styles.menuRow}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <MaterialIcons name="verified-user" size={20} color={THEME.colors.outline} />
              <Text style={styles.settingTitle}>Chính sách bảo mật</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={THEME.colors.outline} />
          </TouchableOpacity>
        </View>

        {/* Account Session Actions */}
        <Text style={styles.sectionHeading}>Phiên đăng nhập</Text>
        <TouchableOpacity
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={18} color={THEME.colors.secondaryContainer} />
          <Text style={styles.logoutButtonText}>Đăng xuất khỏi thiết bị này</Text>
        </TouchableOpacity>

        {/* App Version Info */}
        <View style={styles.versionCard}>
          <Text style={styles.appName}>Cinema Star Experience</Text>
          <Text style={styles.appVer}>Phiên bản 3.5.0 (Build 2026.10)</Text>
          <Text style={styles.appCopy}>Bản quyền © 2026 Cinema Star Vietnam.</Text>
        </View>
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
            <View style={styles.logoutIconHalo}>
              <View style={styles.logoutIconBox}>
                <MaterialIcons name="logout" size={32} color={THEME.colors.secondaryContainer} />
              </View>
            </View>

            <Text style={styles.modalTitle}>Xác Nhận Đăng Xuất?</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn đăng xuất tài khoản{' '}
              <Text style={styles.boldUserName}>{CURRENT_USER.name}</Text>?
              Sau khi đăng xuất, bạn sẽ được đưa về màn hình Đăng nhập.
            </Text>

            <View style={styles.snippetCard}>
              <Image source={{ uri: CURRENT_USER.avatar }} style={styles.snippetAvatar} />
              <View>
                <Text style={styles.snippetName}>{CURRENT_USER.name}</Text>
                <Text style={styles.snippetPhone}>+84 {CURRENT_USER.phone}</Text>
              </View>
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                style={styles.cancelBtn}
                disabled={isLoggingOut}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelBtnText}>Ở lại</Text>
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
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 8,
    marginTop: 6,
  },
  cardGroup: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 18,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  settingTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.onSurface,
  },
  settingSub: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 86, 37, 0.1)',
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 86, 37, 0.3)',
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.secondaryContainer,
  },
  versionCard: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  appName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  appVer: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  appCopy: {
    fontSize: 9,
    color: THEME.colors.outline,
  },

  /* MODAL STYLES */
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
