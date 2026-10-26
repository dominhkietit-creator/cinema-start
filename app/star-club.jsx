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
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../src/constants/theme';
import { CURRENT_USER } from '../src/data/mockData';

export default function StarClubScreen() {
  const router = useRouter();

  const REWARDS = [
    { id: 'rw1', name: 'Voucher Giảm 50.000đ Vé Xem Phim', points: 100, icon: 'confirmation-number' },
    { id: 'rw2', name: '1 Bắp Rang Phô Mai Lớn Miễn Phí', points: 150, icon: 'fastfood' },
    { id: 'rw3', name: '1 Vé Xem Phim 2D Bất Kỳ', points: 200, icon: 'movie' },
    { id: 'rw4', name: 'Combo Đôi Sweetbox & 2 Nước Ngọt', points: 300, icon: 'local-bar' },
  ];

  const handleRedeem = (reward) => {
    if (CURRENT_USER.starPoints >= reward.points) {
      Alert.alert(
        'Đổi quà thành công!',
        `Bạn đã đổi "${reward.name}" với ${reward.points} StarPoints. Mã voucher đã được thêm vào mục Ưu đãi.`
      );
    } else {
      Alert.alert('Chưa đủ điểm', 'Bạn cần tích thêm StarPoints để đổi phần quà này.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hội Viên Star Club</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Digital Membership VIP Card */}
        <View style={styles.vipCard}>
          <View style={styles.vipCardTop}>
            <View style={styles.vipLogoRow}>
              <MaterialIcons name="stars" size={24} color={THEME.colors.primaryContainer} />
              <Text style={styles.vipLogoText}>STAR CLUB</Text>
            </View>
            <View style={styles.tierBadge}>
              <Text style={styles.tierBadgeText}>GOLD MEMBER</Text>
            </View>
          </View>

          <View style={styles.vipCardMid}>
            <Text style={styles.memberName}>{CURRENT_USER.name}</Text>
            <Text style={styles.memberId}>ID: CS-98421078</Text>
          </View>

          <View style={styles.vipCardBottom}>
            <View>
              <Text style={styles.pointsLabel}>ĐIỂM KHẢ DỤNG</Text>
              <Text style={styles.pointsVal}>{CURRENT_USER.starPoints} StarPoints</Text>
            </View>
            <Ionicons name="qr-code-outline" size={32} color={THEME.colors.primaryContainer} />
          </View>
        </View>

        {/* Tier Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressTextRow}>
            <Text style={styles.currentTier}>Hạng Vàng (Gold)</Text>
            <Text style={styles.nextTier}>Cần 50 điểm lên Bạch Kim</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '83%' }]} />
          </View>
        </View>

        {/* Star Club Perks List */}
        <Text style={styles.sectionTitle}>Quyền lợi hội viên của bạn</Text>
        <View style={styles.perksList}>
          <View style={styles.perkItem}>
            <MaterialIcons name="cake" size={20} color={THEME.colors.secondaryContainer} />
            <View style={{ flex: 1 }}>
              <Text style={styles.perkItemTitle}>Vé 0đ ngày sinh nhật</Text>
              <Text style={styles.perkItemSub}>Nhận 1 vé 2D miễn phí trong tháng sinh nhật</Text>
            </View>
          </View>
          <View style={styles.perkItem}>
            <MaterialIcons name="fastfood" size={20} color={THEME.colors.primaryContainer} />
            <View style={{ flex: 1 }}>
              <Text style={styles.perkItemTitle}>Giảm 20% combo bỏng nước thứ Tư</Text>
              <Text style={styles.perkItemSub}>Áp dụng cho mọi combo bắp nước tại quầy bar</Text>
            </View>
          </View>
          <View style={styles.perkItem}>
            <MaterialIcons name="airline-seat-recline-extra" size={20} color={THEME.colors.tertiary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.perkItemTitle}>Ưu tiên giữ chỗ ghế VIP</Text>
              <Text style={styles.perkItemSub}>Giữ chỗ rạp trước 15 phút không lo mất ghế</Text>
            </View>
          </View>
        </View>

        {/* Rewards Store */}
        <Text style={styles.sectionTitle}>Đổi quà StarPoints</Text>
        <View style={styles.rewardsList}>
          {REWARDS.map((rw) => (
            <View key={rw.id} style={styles.rewardCard}>
              <View style={styles.rewardIconBox}>
                <MaterialIcons name={rw.icon} size={22} color={THEME.colors.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rewardTitle}>{rw.name}</Text>
                <Text style={styles.rewardPoints}>{rw.points} StarPoints</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleRedeem(rw)}
                style={styles.redeemBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.redeemBtnText}>Đổi ngay</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    paddingTop: 14,
    paddingBottom: 40,
  },
  vipCard: {
    backgroundColor: 'rgba(31, 31, 36, 0.95)',
    borderRadius: THEME.borderRadius.xl,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 184, 0, 0.4)',
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
    marginBottom: 16,
  },
  vipCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vipLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vipLogoText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.primary,
    letterSpacing: 1,
  },
  tierBadge: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tierBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    letterSpacing: 0.8,
  },
  vipCardMid: {
    marginVertical: 18,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  memberId: {
    fontSize: 11,
    color: THEME.colors.outline,
    marginTop: 2,
    letterSpacing: 1,
  },
  vipCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 12,
  },
  pointsLabel: {
    fontSize: 8,
    color: THEME.colors.outline,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  pointsVal: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    marginTop: 2,
  },
  progressCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  currentTier: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  nextTier: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: THEME.colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 10,
    marginTop: 4,
  },
  perksList: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    gap: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  perkItemTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  perkItemSub: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 1,
  },
  rewardsList: {
    gap: 10,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  rewardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  rewardPoints: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    marginTop: 2,
  },
  redeemBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  redeemBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
  },
});
