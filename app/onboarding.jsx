import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../src/constants/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    badge: 'IMAX Laser 4K',
    badgeColor: THEME.colors.tertiary,
    dotColor: THEME.colors.tertiaryContainer,
    subTag: 'Đắm chìm thị giác',
    subTagIcon: 'hd',
    tagPill: '120 FPS',
    specIcon: 'surround-sound',
    specText: 'Âm vòm Dolby Atmos 64 kênh',
    ratingText: '5.0',
    title: 'Đặt Vé Nhanh Chóng,\nKhông Lo Xếp Hàng',
    desc: 'Chủ động chọn ghế VIP yêu thích, thanh toán đa kênh siêu tốc trong vài giây và quét mã QR vào thẳng phòng chiếu màn hình lớn.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    badge: 'Tốc độ tức thì',
    badgeColor: THEME.colors.primary,
    dotColor: THEME.colors.primaryContainer,
    subTag: 'Đặt vé 3 chạm',
    subTagIcon: 'touch-app',
    tagPill: '15 Giây',
    specIcon: 'airline-seat-recline-extra',
    specText: 'Giữ chỗ VIP thời gian thực',
    ratingText: 'Cực nhanh',
    title: 'Màn Hình Cong IMAX\nLaser Đỉnh Cao',
    desc: 'Trải nghiệm rạp chiếu chuẩn quốc tế với hệ thống máy chiếu Laser 4K sắc nét và hiệu ứng âm thanh 360 độ ngập tràn cảm xúc.',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
  },
  {
    badge: 'VIP Lounge Service',
    badgeColor: THEME.colors.secondary,
    dotColor: THEME.colors.secondaryContainer,
    subTag: 'Giao tận tay',
    subTagIcon: 'room-service',
    tagPill: 'Nóng giòn',
    specIcon: 'fastfood',
    specText: 'Bắp phô mai & nước ngọt mát lạnh',
    ratingText: 'Chuẩn vị',
    title: 'Bắp Nước Nóng Giòn\nGiao Tận Ghế',
    desc: 'Gọi combo bắp rang bơ thơm lừng cùng đồ uống mát lạnh ngay trên ứng dụng, nhân viên phục vụ tận vị trí ngồi trước giờ chiếu.',
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=800&q=80',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      router.push('/auth/login');
    }
  };

  const goToSlide = (index) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.2, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setCurrentSlide(index);
  };

  const handleSkip = () => {
    router.push('/auth/login');
  };

  const slide = SLIDES[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      {/* Background ambient radial glows */}
      <View style={styles.ambientGlowTop} />
      <View style={styles.ambientGlowRight} />

      {/* Top Header */}
      <View style={styles.headerBar}>
        <View style={styles.headerBrand}>
          <View style={styles.brandIconBox}>
            <MaterialIcons name="movie" size={18} color={THEME.colors.primaryFixedDim} />
          </View>
          <View>
            <Text style={styles.brandSub}>CINEMA STAR</Text>
            <Text style={styles.brandTitle}>EXPERIENCE</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSkip} style={styles.skipBtn} activeOpacity={0.7}>
          <Text style={styles.skipBtnText}>Bỏ qua</Text>
          <MaterialIcons name="arrow-forward-ios" size={12} color={THEME.colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Ticket-shaped Carousel Card */}
        <Animated.View style={[styles.ticketCard, { opacity: fadeAnim }]}>
          {/* Film Visual Area */}
          <View style={styles.ticketImageContainer}>
            <Image
              source={{ uri: slide.image }}
              style={styles.ticketImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />

            {/* Format Pill Badge */}
            <View style={styles.badgePill}>
              <View style={[styles.badgeDot, { backgroundColor: slide.dotColor }]} />
              <Text style={[styles.badgeText, { color: slide.badgeColor }]}>{slide.badge}</Text>
            </View>

            {/* Bottom Inner Image Tags */}
            <View style={styles.imageBottomRow}>
              <View style={styles.subTagRow}>
                <MaterialIcons name={slide.subTagIcon} size={15} color={THEME.colors.primary} />
                <Text style={styles.subTagText}>{slide.subTag}</Text>
              </View>
              <View style={styles.tagPillContainer}>
                <Text style={styles.tagPillText}>{slide.tagPill}</Text>
              </View>
            </View>
          </View>

          {/* Ticket Perforated Cutouts & Dashed Tear Line */}
          <View style={styles.perforatedRow}>
            <View style={styles.notchLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.notchRight} />
          </View>

          {/* Ticket Bottom Specs */}
          <View style={styles.ticketBottomSpecs}>
            <View style={styles.specLeft}>
              <MaterialIcons name={slide.specIcon} size={18} color={THEME.colors.primaryFixedDim} />
              <Text style={styles.specText} numberOfLines={1}>{slide.specText}</Text>
            </View>
            <View style={styles.specRight}>
              <MaterialIcons name="star" size={14} color={THEME.colors.primaryContainer} />
              <Text style={styles.ratingText}>{slide.ratingText}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Dynamic Indicator Dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToSlide(i)}
              style={[
                styles.dot,
                i === currentSlide ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Narrative Copy */}
        <Animated.View style={[styles.textBlock, { opacity: fadeAnim }]}>
          <Text style={styles.headlineTitle}>{slide.title}</Text>
          <Text style={styles.bodyDesc}>{slide.desc}</Text>
        </Animated.View>

        {/* Perk Badges Row */}
        <View style={styles.perksGrid}>
          <View style={styles.perkCard}>
            <MaterialIcons name="qr-code-scanner" size={20} color={THEME.colors.primaryContainer} />
            <Text style={styles.perkLabel}>Vào rạp 1s</Text>
          </View>
          <View style={styles.perkCard}>
            <MaterialIcons name="event-seat" size={20} color={THEME.colors.tertiary} />
            <Text style={styles.perkLabel}>Ghế đôi Sweetbox</Text>
          </View>
          <View style={styles.perkCard}>
            <MaterialIcons name="account-balance-wallet" size={20} color={THEME.colors.secondary} />
            <Text style={styles.perkLabel}>0% phụ phí</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA Actions */}
      <View style={styles.bottomCtaSection}>
        <TouchableOpacity
          onPress={handleNext}
          style={styles.primaryBtn}
          activeOpacity={0.88}
        >
          <Text style={styles.primaryBtnText}>
            {currentSlide === SLIDES.length - 1 ? 'Khám phá ngay' : 'Tiếp tục'}
          </Text>
          <MaterialIcons name="arrow-forward" size={18} color={THEME.colors.onPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/auth/login')}
          style={styles.secondaryBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryBtnMuted}>Đã có tài khoản? </Text>
          <Text style={styles.secondaryBtnHighlight}>Đăng nhập ngay</Text>
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
  ambientGlowTop: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
  },
  ambientGlowRight: {
    position: 'absolute',
    top: 260,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 86, 37, 0.08)',
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandSub: {
    fontSize: 9,
    color: 'rgba(213, 196, 171, 0.7)',
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  brandTitle: {
    fontSize: 12,
    color: THEME.colors.primaryFixed,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 42, 46, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
    gap: 4,
  },
  skipBtnText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
    fontWeight: '600',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  ticketCard: {
    width: width - 40,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.xl,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  ticketImageContainer: {
    width: '100%',
    height: 190,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: THEME.colors.surfaceContainerLowest,
    position: 'relative',
  },
  ticketImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 19, 23, 0.35)',
  },
  badgePill: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
    backgroundColor: 'rgba(13, 14, 18, 0.85)',
    gap: 6,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  imageBottomRow: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subTagText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  tagPillContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: THEME.borderRadius.full,
    backgroundColor: 'rgba(255, 184, 0, 0.25)',
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  perforatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    position: 'relative',
  },
  notchLeft: {
    position: 'absolute',
    left: -20,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: THEME.colors.background,
  },
  notchRight: {
    position: 'absolute',
    right: -20,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: THEME.colors.background,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: 'rgba(158, 143, 120, 0.4)',
    borderStyle: 'dashed',
    marginHorizontal: 12,
  },
  ticketBottomSpecs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 2,
  },
  specLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  specText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
    flex: 1,
  },
  specRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: THEME.colors.primary,
    fontWeight: '700',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 28,
    backgroundColor: THEME.colors.primaryContainer,
  },
  dotInactive: {
    width: 8,
    backgroundColor: THEME.colors.surfaceContainerHighest,
  },
  textBlock: {
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 10,
  },
  headlineTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    textAlign: 'center',
    lineHeight: 28,
  },
  bodyDesc: {
    fontSize: 13,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
    maxWidth: 320,
  },
  perksGrid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 8,
  },
  perkCard: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  perkLabel: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomCtaSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  primaryBtn: {
    width: '100%',
    backgroundColor: THEME.colors.primaryContainer,
    paddingVertical: 14,
    borderRadius: THEME.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 6,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  secondaryBtn: {
    width: '100%',
    backgroundColor: 'rgba(41, 42, 46, 0.7)',
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBtnMuted: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
  },
  secondaryBtnHighlight: {
    fontSize: 12,
    color: THEME.colors.primaryFixed,
    fontWeight: '700',
  },
});
