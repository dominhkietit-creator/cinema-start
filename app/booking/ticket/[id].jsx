import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../../src/constants/theme';
import { MOVIES } from '../../../src/data/mockData';

const { width } = Dimensions.get('window');

export default function TicketSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const movie = MOVIES.find((m) => m.id === params.movieId) || MOVIES[0];

  const ticketId = params.id || 'TK-89421';

  const handleDownload = () => {
    Alert.alert('Thành công', `Vé xem phim ${ticketId} đã được lưu vào Thư viện ảnh.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Vé Điện Tử</Text>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')} style={styles.closeBtn}>
          <MaterialIcons name="close" size={20} color={THEME.colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Success Header Pill */}
        <View style={styles.successPill}>
          <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
          <Text style={styles.successPillText}>ĐẶT VÉ THÀNH CÔNG</Text>
        </View>

        {/* Physical Movie Ticket Card with Notches */}
        <View style={styles.ticketCard}>
          {/* Upper Ticket Section: Movie & Screening Specs */}
          <View style={styles.ticketTop}>
            <View style={styles.formatTagRow}>
              <View style={styles.formatTag}>
                <Text style={styles.formatTagText}>{params.format || 'IMAX Laser 4K'}</Text>
              </View>
              <View style={styles.statusConfirmed}>
                <Text style={styles.statusConfirmedText}>CONFIRMED</Text>
              </View>
            </View>

            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.cinemaName}>Cinema Star Landmark 81</Text>
            <Text style={styles.hallName}>Phòng chiếu 01 (Màn hình cong IMAX)</Text>

            <View style={styles.specsGrid}>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>NGÀY CHIẾU</Text>
                <Text style={styles.specValue}>24/10/2026</Text>
              </View>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>GIỜ CHIẾU</Text>
                <Text style={styles.specValueHighlight}>{params.time || '20:15'}</Text>
              </View>
              <View style={styles.specBox}>
                <Text style={styles.specLabel}>SỐ GHẾ</Text>
                <Text style={styles.specValueHighlight}>{params.seats || 'G4, G5'}</Text>
              </View>
            </View>
          </View>

          {/* Perforated Notches & Dashed Line */}
          <View style={styles.perforatedRow}>
            <View style={styles.notchLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.notchRight} />
          </View>

          {/* Lower Ticket Section: QR Code & Barcode Stubs */}
          <View style={styles.ticketBottom}>
            <Text style={styles.qrTitle}>MÃ VÀO PHÒNG CHIẾU</Text>
            <View style={styles.qrBox}>
              <Ionicons name="qr-code" size={130} color={THEME.colors.background} />
            </View>
            <Text style={styles.bookingCodeText}>Mã đặt chỗ: {ticketId}</Text>
            <Text style={styles.scanNotice}>
              Vui lòng đưa mã này cho nhân viên soát vé tại cửa rạp
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionBtnsRow}>
          <TouchableOpacity onPress={handleDownload} style={styles.secondaryBtn} activeOpacity={0.8}>
            <MaterialIcons name="file-download" size={18} color={THEME.colors.primary} />
            <Text style={styles.secondaryBtnText}>Lưu vé ảnh</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/(tabs)/tickets')} style={styles.primaryBtn} activeOpacity={0.88}>
            <MaterialIcons name="confirmation-number" size={18} color={THEME.colors.onPrimary} />
            <Text style={styles.primaryBtnText}>Xem danh sách vé</Text>
          </TouchableOpacity>
        </View>
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.onSurface,
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
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 40,
    alignItems: 'center',
  },
  successPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
    gap: 6,
    marginBottom: 16,
  },
  successPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4CAF50',
    letterSpacing: 0.8,
  },
  ticketCard: {
    width: width - 40,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  ticketTop: {
    padding: 18,
  },
  formatTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  formatTag: {
    backgroundColor: 'rgba(0, 216, 241, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  formatTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.tertiary,
  },
  statusConfirmed: {
    backgroundColor: 'rgba(0, 218, 243, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: THEME.colors.tertiaryContainer,
  },
  statusConfirmedText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.tertiaryContainer,
    letterSpacing: 0.8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 4,
  },
  cinemaName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  hallName: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: 14,
  },
  specsGrid: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLowest,
    borderRadius: THEME.borderRadius.md,
    padding: 10,
    justifyContent: 'space-around',
  },
  specBox: {
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: THEME.colors.outline,
    marginBottom: 2,
  },
  specValue: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  specValueHighlight: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  perforatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    position: 'relative',
  },
  notchLeft: {
    position: 'absolute',
    left: -14,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: THEME.colors.background,
  },
  notchRight: {
    position: 'absolute',
    right: -14,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: THEME.colors.background,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: 'rgba(158, 143, 120, 0.4)',
    borderStyle: 'dashed',
    marginHorizontal: 16,
  },
  ticketBottom: {
    padding: 18,
    alignItems: 'center',
    backgroundColor: 'rgba(31, 31, 36, 0.85)',
  },
  qrTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.outline,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  qrBox: {
    backgroundColor: THEME.colors.white,
    padding: 10,
    borderRadius: THEME.borderRadius.lg,
    marginBottom: 10,
  },
  bookingCodeText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.primary,
    letterSpacing: 1,
  },
  scanNotice: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 4,
  },
  actionBtnsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  primaryBtn: {
    flex: 1.4,
    backgroundColor: THEME.colors.primaryContainer,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  primaryBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
  },
});
