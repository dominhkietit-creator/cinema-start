import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../src/constants/theme';

export default function ScreensOverview() {
  const router = useRouter();

  const GROUPS = [
    {
      group: '1. MÀN HÌNH TỪ FILE .ZIP (THIẾT KẾ GỐC)',
      screens: [
        { id: 1, name: 'Màn hình Khởi động (Splash Screen)', route: '/', icon: 'flash-on', file: 'app/index.jsx' },
        { id: 2, name: 'Màn hình Giới thiệu (Onboarding)', route: '/onboarding', icon: 'view-carousel', file: 'app/onboarding.jsx' },
        { id: 3, name: 'Màn hình Đăng nhập (Login)', route: '/auth/login', icon: 'login', file: 'app/auth/login.jsx' },
        { id: 4, name: 'Màn hình Đăng ký (Register)', route: '/auth/register', icon: 'person-add', file: 'app/auth/register.jsx' },
        { id: 5, name: 'Màn hình Quên mật khẩu (Forgot Password)', route: '/auth/forgot-password', icon: 'lock-reset', file: 'app/auth/forgot-password.jsx' },
        { id: 6, name: 'Màn hình Xác thực OTP (OTP Verification)', route: '/auth/otp', icon: 'verified-user', file: 'app/auth/otp.jsx' },
      ],
    },
    {
      group: '2. KHÁM PHÁ & CHI TIẾT PHIM',
      screens: [
        { id: 7, name: 'Trang chủ phim & Rạp (Home)', route: '/(tabs)/home', icon: 'local-movies', file: 'app/(tabs)/home.jsx' },
        { id: 8, name: 'Chi tiết phim & Trailer 5s (Movie Detail)', route: '/movie/m1', icon: 'movie', file: 'app/movie/[id].jsx' },
        { id: 14, name: 'Tìm kiếm & Lọc phim (Search & Filter)', route: '/(tabs)/search', icon: 'search', file: 'app/(tabs)/search.jsx' },
      ],
    },
    {
      group: '3. QUY TRÌNH ĐẶT VÉ & THANH TOÁN (BOOKING FLOW)',
      screens: [
        { id: 9, name: 'Chọn Rạp & Suất Chiếu (Showtimes)', route: '/booking/showtimes?movieId=m1', icon: 'calendar-today', file: 'app/booking/showtimes.jsx' },
        { id: 10, name: 'Sơ đồ chọn ghế cong IMAX (Seats Matrix)', route: '/booking/seats?movieId=m1&time=20:15', icon: 'event-seat', file: 'app/booking/seats.jsx' },
        { id: 11, name: 'Chọn Bắp Nước & Combos (Concessions)', route: '/booking/combos?seatPrice=220000', icon: 'fastfood', file: 'app/booking/combos.jsx' },
        { id: 12, name: 'Thanh toán & Quét mã QR (Checkout & QR Pay)', route: '/booking/checkout?movieId=m1&seatPrice=220000&combosPrice=89000', icon: 'qr-code-scanner', file: 'app/booking/checkout.jsx' },
        { id: 13, name: 'Vé điện tử & Mã QR (E-Ticket Voucher)', route: '/booking/ticket/TK-89421?movieId=m1', icon: 'qr-code', file: 'app/booking/ticket/[id].jsx' },
      ],
    },
    {
      group: '4. CỤM RẠP & TIỆN ÍCH HỆ THỐNG',
      screens: [
        { id: 15, name: 'Danh sách Cụm rạp (Cinemas List)', route: '/(tabs)/cinemas', icon: 'theaters', file: 'app/(tabs)/cinemas.jsx' },
        { id: 16, name: 'Chi tiết rạp & Tiện ích (Cinema Detail)', route: '/cinema/c1', icon: 'place', file: 'app/cinema/[id].jsx' },
      ],
    },
    {
      group: '5. TÀI KHOẢN, HỘI VIÊN & HỖ TRỢ',
      screens: [
        { id: 17, name: 'Vé của tôi & Lịch sử xem (My Tickets)', route: '/(tabs)/tickets', icon: 'confirmation-number', file: 'app/(tabs)/tickets.jsx' },
        { id: 18, name: 'Hội viên Star Club & Đổi điểm (Star Club)', route: '/star-club', icon: 'stars', file: 'app/star-club.jsx' },
        { id: 19, name: 'Kho Khuyến Mãi & Voucher (Promotions)', route: '/promotions', icon: 'local-offer', file: 'app/promotions.jsx' },
        { id: 20, name: 'Hồ sơ người dùng (User Profile)', route: '/(tabs)/profile', icon: 'person', file: 'app/(tabs)/profile.jsx' },
        { id: 21, name: 'Thông báo hệ thống (Notifications)', route: '/notifications', icon: 'notifications', file: 'app/notifications.jsx' },
        { id: 22, name: 'Cài đặt & Trợ giúp 24/7 (Settings)', route: '/settings', icon: 'settings', file: 'app/settings.jsx' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <View>
          <Text style={styles.headerTitle}>Mục Lục 22 Màn Hình</Text>
          <Text style={styles.headerSub}>Ứng Dụng Đặt Vé Cinema Star</Text>
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <MaterialIcons name="close" size={20} color={THEME.colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        <View style={styles.summaryBox}>
          <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
          <Text style={styles.summaryText}>
            Toàn bộ 22 màn hình đã được xây dựng hoàn chỉnh bằng Expo React Native (.jsx), chuẩn hệ màu Obsidian Lumina!
          </Text>
        </View>

        {GROUPS.map((g, gIdx) => (
          <View key={gIdx} style={styles.groupContainer}>
            <Text style={styles.groupHeading}>{g.group}</Text>
            <View style={styles.screensList}>
              {g.screens.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  onPress={() => router.push(s.route)}
                  style={styles.screenRow}
                  activeOpacity={0.7}
                >
                  <View style={styles.badgeNum}>
                    <Text style={styles.badgeNumText}>#{s.id}</Text>
                  </View>

                  <View style={styles.screenIconBox}>
                    <MaterialIcons name={s.icon} size={18} color={THEME.colors.primaryContainer} />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.screenName}>{s.name}</Text>
                    <Text style={styles.screenPath}>{s.file}</Text>
                  </View>

                  <MaterialIcons name="chevron-right" size={20} color={THEME.colors.primary} />
                </TouchableOpacity>
              ))}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  headerSub: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 1,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 40,
  },
  summaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  summaryText: {
    flex: 1,
    fontSize: 11,
    color: THEME.colors.onSurface,
    lineHeight: 16,
  },
  groupContainer: {
    marginBottom: 18,
  },
  groupHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.outline,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  screensList: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  screenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
  },
  badgeNum: {
    width: 28,
    height: 20,
    borderRadius: 4,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeNumText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.primary,
  },
  screenIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  screenPath: {
    fontSize: 9,
    color: THEME.colors.outline,
    marginTop: 1,
  },
});
