import React from 'react';
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
import { PROMOTIONS } from '../src/data/mockData';

export default function PromotionsScreen() {
  const router = useRouter();

  const handleCopy = (code) => {
    Alert.alert('Đã sao chép mã', `Mã khuyến mãi "${code}" đã được sao chép vào bộ nhớ tạm.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ưu Đãi & Khuyến Mãi</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Banner Promo Spotlight */}
        <View style={styles.spotlightCard}>
          <View style={styles.spotlightBadge}>
            <Text style={styles.spotlightBadgeText}>ƯU ĐÃI ĐỘC QUYỀN THÁNG 10</Text>
          </View>
          <Text style={styles.spotlightTitle}>Thứ Tư Vui Vẻ - Vé Đồng Giá 99K</Text>
          <Text style={styles.spotlightDesc}>
            Áp dụng cho tất cả suất chiếu 2D tiêu chuẩn tại mọi rạp Cinema Star trên toàn quốc.
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/home')}
            style={styles.spotlightBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.spotlightBtnText}>Đặt vé ngay</Text>
            <MaterialIcons name="arrow-forward" size={14} color={THEME.colors.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Vouchers List */}
        <Text style={styles.sectionHeading}>Mã giảm giá đang có</Text>
        <View style={styles.vouchersList}>
          {PROMOTIONS.map((promo) => (
            <View key={promo.id} style={styles.voucherCard}>
              <View style={styles.voucherLeft}>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{promo.badge}</Text>
                </View>
                <Text style={styles.promoTitle}>{promo.title}</Text>
                <Text style={styles.promoDesc}>{promo.discountDesc}</Text>
                <Text style={styles.validUntil}>Hạn sử dụng: {promo.validUntil}</Text>
              </View>

              {/* Perforated separator */}
              <View style={styles.perforatedCol}>
                <View style={styles.notchTop} />
                <View style={styles.verticalDashed} />
                <View style={styles.notchBottom} />
              </View>

              <View style={styles.voucherRight}>
                <Text style={styles.codeLabel}>MÃ</Text>
                <Text style={styles.codeText}>{promo.code}</Text>
                <TouchableOpacity
                  onPress={() => handleCopy(promo.code)}
                  style={styles.copyBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.copyBtnText}>Sao chép</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Bank & Partner Offers */}
        <Text style={styles.sectionHeading}>Ưu đãi đối tác ngân hàng & ví</Text>
        <View style={styles.partnersList}>
          <View style={styles.partnerCard}>
            <MaterialIcons name="account-balance-wallet" size={24} color={THEME.colors.primaryContainer} />
            <View style={{ flex: 1 }}>
              <Text style={styles.partnerTitle}>Ví MoMo: Giảm ngay 20.000đ</Text>
              <Text style={styles.partnerSub}>Dành cho khách hàng lần đầu liên kết và đặt vé qua MoMo</Text>
            </View>
          </View>
          <View style={styles.partnerCard}>
            <MaterialIcons name="credit-card" size={24} color={THEME.colors.tertiary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.partnerTitle}>Thẻ VPBank: Mua 1 tặng 1 vé cuối tuần</Text>
              <Text style={styles.partnerSub}>Áp dụng cho chủ thẻ tín dụng VPBank Platinum vào Thứ 7 & CN</Text>
            </View>
          </View>
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
  spotlightCard: {
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    borderRadius: THEME.borderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.35)',
    marginBottom: 20,
  },
  spotlightBadge: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.secondaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 8,
  },
  spotlightBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.white,
    letterSpacing: 0.8,
  },
  spotlightTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 4,
  },
  spotlightDesc: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: 12,
  },
  spotlightBtn: {
    alignSelf: 'flex-start',
    backgroundColor: THEME.colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  spotlightBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 10,
    marginTop: 4,
  },
  vouchersList: {
    gap: 12,
    marginBottom: 20,
  },
  voucherCard: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  voucherLeft: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  badgePillText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  promoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  promoDesc: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
    lineHeight: 14,
  },
  validUntil: {
    fontSize: 9,
    color: THEME.colors.outline,
    marginTop: 6,
  },
  perforatedCol: {
    width: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notchTop: {
    position: 'absolute',
    top: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.colors.background,
  },
  notchBottom: {
    position: 'absolute',
    bottom: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.colors.background,
  },
  verticalDashed: {
    width: 1,
    height: '70%',
    borderWidth: 1,
    borderColor: 'rgba(158, 143, 120, 0.3)',
    borderStyle: 'dashed',
  },
  voucherRight: {
    width: 90,
    backgroundColor: 'rgba(31, 31, 36, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  codeLabel: {
    fontSize: 8,
    color: THEME.colors.outline,
    fontWeight: '700',
  },
  codeText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primary,
    marginTop: 2,
    marginBottom: 8,
  },
  copyBtn: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  copyBtnText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  partnersList: {
    gap: 10,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  partnerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  partnerSub: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 1,
  },
});
