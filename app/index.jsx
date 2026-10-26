import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../src/constants/theme';

const { width } = Dimensions.get('window');

const STAGES = [
  { progress: 0.25, text: 'Đang tải dữ liệu phim mới nhất...' },
  { progress: 0.55, text: 'Kết nối cụm rạp trung tâm...' },
  { progress: 0.85, text: 'Đồng bộ lịch chiếu & sơ đồ ghế VIP...' },
  { progress: 1.0, text: 'Sẵn sàng khởi chiếu!' },
];

export default function SplashScreen() {
  const router = useRouter();
  const [stageIndex, setStageIndex] = useState(0);

  const progressAnim = useRef(new Animated.Value(0.25)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Pulse animation for logo aura
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Continuous spin for film reel loader
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Step through the loading stages
    const step1 = setTimeout(() => advanceStage(1), 1000);
    const step2 = setTimeout(() => advanceStage(2), 2200);
    const step3 = setTimeout(() => advanceStage(3), 3300);
    const finish = setTimeout(() => {
      router.replace('/onboarding');
    }, 4400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(finish);
    };
  }, []);

  const advanceStage = (index) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0.2, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();

    setStageIndex(index);
    Animated.timing(progressAnim, {
      toValue: STAGES[index].progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  const handleSkip = () => {
    router.replace('/onboarding');
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.58],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Background ambient lighting effects */}
      <View style={styles.ambientGlowPrimary} />
      <View style={styles.ambientGlowSecondary} />
      <View style={styles.horizontalBeam} />

      {/* Top Banner Tag */}
      <View style={styles.topSection}>
        <View style={styles.topPill}>
          <View style={styles.pingDot} />
          <Text style={styles.topPillText}>PREMIUM CINEMA EXPERIENCE</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/screens-overview')}
          style={styles.quickNavBtn}
          activeOpacity={0.7}
        >
          <MaterialIcons name="grid-view" size={16} color={THEME.colors.primaryContainer} />
          <Text style={styles.quickNavText}>22 Màn hình</Text>
        </TouchableOpacity>
      </View>

      {/* Center Cinematic Brand Block */}
      <TouchableOpacity
        style={styles.centerBlock}
        activeOpacity={0.9}
        onPress={handleSkip}
      >
        <Animated.View style={[styles.logoAura, { transform: [{ scale: pulseAnim }] }]} />

        <View style={styles.logoCard}>
          <MaterialIcons name="movie-filter" size={54} color={THEME.colors.primaryContainer} />
        </View>

        <View style={styles.titleRow}>
          <View style={styles.hairlineLeft} />
          <Text style={styles.brandTitle}>CINEMA STAR</Text>
          <View style={styles.hairlineRight} />
        </View>

        <Text style={styles.tagline}>Trải nghiệm điện ảnh đỉnh cao</Text>

        <View style={styles.formatsRow}>
          <View style={styles.formatBadge}>
            <Text style={styles.formatBadgeTextCyan}>IMAX LASER</Text>
          </View>
          <View style={styles.dotSeparator} />
          <View style={styles.formatBadge}>
            <Text style={styles.formatBadgeTextOrange}>DOLBY ATMOS</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Bottom Loading Progress & Version Info */}
      <View style={styles.bottomSection}>
        {/* Animated Film Reel Loader */}
        <Animated.View style={[styles.spinnerWrapper, { transform: [{ rotate: spin }] }]}>
          <Ionicons name="film-outline" size={34} color={THEME.colors.primaryContainer} />
        </Animated.View>

        {/* Dynamic Status Text */}
        <Animated.Text style={[styles.statusText, { opacity: fadeAnim }]}>
          {STAGES[stageIndex].text}
        </Animated.Text>

        {/* Custom Progress Bar */}
        <View style={styles.progressBarTrack}>
          <Animated.View style={[styles.progressBarFill, { width: progressBarWidth }]} />
        </View>

        <TouchableOpacity onPress={handleSkip} style={styles.skipPrompt} activeOpacity={0.7}>
          <Text style={styles.skipPromptText}>Chạm để bỏ qua</Text>
          <MaterialIcons name="chevron-right" size={16} color={THEME.colors.primaryContainer} />
        </TouchableOpacity>

        <Text style={styles.versionText}>v3.5.0 • Powered by Dolby Atmos & IMAX</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.marginMobile,
    paddingVertical: THEME.spacing.md,
  },
  ambientGlowPrimary: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
  },
  ambientGlowSecondary: {
    position: 'absolute',
    top: '38%',
    alignSelf: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 86, 37, 0.08)',
  },
  horizontalBeam: {
    position: 'absolute',
    top: '48%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(255, 184, 0, 0.35)',
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  topPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
    backgroundColor: 'rgba(31, 31, 36, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.primaryContainer,
    marginRight: 6,
  },
  topPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primary,
    letterSpacing: 1.2,
  },
  quickNavBtn: {
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
  quickNavText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  centerBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  logoAura: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 184, 0, 0.22)',
  },
  logoCard: {
    width: 96,
    height: 96,
    borderRadius: THEME.borderRadius.xl,
    backgroundColor: 'rgba(41, 42, 46, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hairlineLeft: {
    width: 24,
    height: 1,
    backgroundColor: THEME.colors.primary,
  },
  hairlineRight: {
    width: 24,
    height: 1,
    backgroundColor: THEME.colors.primary,
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: THEME.colors.primary,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 14,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  formatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 10,
  },
  formatBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: 'rgba(52, 52, 57, 0.6)',
  },
  formatBadgeTextCyan: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.tertiary,
    letterSpacing: 0.8,
  },
  formatBadgeTextOrange: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.secondary,
    letterSpacing: 0.8,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME.colors.outlineVariant,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 16,
  },
  spinnerWrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 13,
    color: THEME.colors.onSurface,
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBarTrack: {
    width: width * 0.58,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME.colors.surfaceContainerHighest,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: THEME.colors.primaryContainer,
  },
  skipPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 8,
  },
  skipPromptText: {
    fontSize: 12,
    color: THEME.colors.primaryContainer,
    fontWeight: '600',
  },
  versionText: {
    fontSize: 10,
    color: THEME.colors.outline,
    letterSpacing: 0.6,
  },
});
