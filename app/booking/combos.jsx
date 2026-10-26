import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { CONCESSIONS } from '../../src/data/mockData';

export default function CombosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const baseSeatPrice = parseInt(params.seatPrice || '220000', 10);

  const [quantities, setQuantities] = useState({
    cb1: 1, // Default 1 Combo Solo
  });

  const updateQty = (id, delta) => {
    const current = quantities[id] || 0;
    const next = Math.max(0, current + delta);
    setQuantities({ ...quantities, [id]: next });
  };

  const calculateCombosTotal = () => {
    return CONCESSIONS.reduce((sum, item) => {
      const q = quantities[item.id] || 0;
      return sum + q * item.price;
    }, 0);
  };

  const grandTotal = baseSeatPrice + calculateCombosTotal();

  const handleProceed = () => {
    router.push({
      pathname: '/booking/checkout',
      params: {
        ...params,
        combosPrice: calculateCombosTotal(),
        totalAmount: grandTotal,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Combo Bắp & Nước</Text>
        <TouchableOpacity onPress={handleProceed} style={styles.skipBtn}>
          <Text style={styles.skipBtnText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Banner Teaser */}
        <View style={styles.teaserBanner}>
          <MaterialIcons name="fastfood" size={22} color={THEME.colors.primaryContainer} />
          <View style={{ flex: 1 }}>
            <Text style={styles.teaserTitle}>Phục vụ tận ghế ngồi</Text>
            <Text style={styles.teaserSub}>Bắp rang nóng hổi sẽ được nhân viên rạp chuẩn bị sẵn sàng</Text>
          </View>
        </View>

        {/* Concessions List */}
        <View style={styles.comboList}>
          {CONCESSIONS.map((item) => {
            const qty = quantities[item.id] || 0;
            return (
              <View key={item.id} style={styles.comboCard}>
                <Image source={{ uri: item.image }} style={styles.comboImage} />

                <View style={styles.comboInfo}>
                  {item.tag && (
                    <View style={styles.tagBadge}>
                      <Text style={styles.tagBadgeText}>{item.tag}</Text>
                    </View>
                  )}
                  <Text style={styles.comboName}>{item.name}</Text>
                  <Text style={styles.comboDesc} numberOfLines={2}>{item.desc}</Text>

                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>{item.price.toLocaleString('vi-VN')} đ</Text>

                    {/* Stepper */}
                    <View style={styles.stepper}>
                      <TouchableOpacity
                        onPress={() => updateQty(item.id, -1)}
                        style={[styles.stepperBtn, qty === 0 && styles.stepperBtnDisabled]}
                        disabled={qty === 0}
                      >
                        <MaterialIcons name="remove" size={16} color={qty === 0 ? THEME.colors.outline : THEME.colors.onSurface} />
                      </TouchableOpacity>
                      <Text style={styles.stepperQty}>{qty}</Text>
                      <TouchableOpacity
                        onPress={() => updateQty(item.id, 1)}
                        style={styles.stepperBtn}
                      >
                        <MaterialIcons name="add" size={16} color={THEME.colors.primaryContainer} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.summaryInfo}>
          <Text style={styles.totalLabel}>Tổng cộng (Vé + Bắp nước):</Text>
          <Text style={styles.grandTotalText}>{grandTotal.toLocaleString('vi-VN')} đ</Text>
        </View>

        <TouchableOpacity onPress={handleProceed} style={styles.nextBtn} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>Thanh Toán</Text>
          <MaterialIcons name="arrow-forward" size={18} color={THEME.colors.onPrimary} />
        </TouchableOpacity>
      </View>
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
  skipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipBtnText: {
    fontSize: 12,
    color: THEME.colors.primary,
    fontWeight: '700',
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  teaserBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.2)',
  },
  teaserTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
    marginBottom: 2,
  },
  teaserSub: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  comboList: {
    gap: 14,
  },
  comboCard: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  comboImage: {
    width: 100,
    height: 110,
  },
  comboInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  tagBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 2,
  },
  tagBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  comboName: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  comboDesc: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 14,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.full,
    paddingHorizontal: 4,
    gap: 8,
  },
  stepperBtn: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperBtnDisabled: {
    opacity: 0.3,
  },
  stepperQty: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18, 19, 23, 0.96)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryInfo: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  grandTotalText: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    marginTop: 2,
  },
  nextBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nextBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },
});
