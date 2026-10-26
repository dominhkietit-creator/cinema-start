import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';

export default function OTPVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const targetContact = params.phone || params.contact || '(+84) 987 ••• 321';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(58);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const activeIndex = otp.findIndex((val) => val === '');
  const currentIndex = activeIndex === -1 ? 5 : activeIndex;

  const handleKeyPress = (digit) => {
    const nextOtp = [...otp];
    const emptyIndex = nextOtp.findIndex((v) => v === '');
    if (emptyIndex !== -1) {
      nextOtp[emptyIndex] = digit;
      setOtp(nextOtp);

      // If full 6 digits filled
      if (emptyIndex === 5) {
        setTimeout(() => {
          verifyOtp(nextOtp.join(''));
        }, 300);
      }
    }
  };

  const handleDelete = () => {
    const nextOtp = [...otp];
    // Find last filled item
    for (let i = 5; i >= 0; i--) {
      if (nextOtp[i] !== '') {
        nextOtp[i] = '';
        setOtp(nextOtp);
        break;
      }
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setCountdown(60);
    setCanResend(false);
    Alert.alert('Đã gửi lại mã', 'Mã xác thực mới đã được gửi tới số của bạn.');
  };

  const handleBiometric = () => {
    Alert.alert(
      'Xác thực Face ID',
      'Đang xác nhận danh tính với Cinema Star StarClub...',
      [
        {
          text: 'Khớp danh tính',
          onPress: () => {
            setOtp(['8', '8', '8', '8', '8', '8']);
            setTimeout(() => {
              verifyOtp('888888');
            }, 300);
          },
        },
        { text: 'Hủy', style: 'cancel' },
      ]
    );
  };

  const verifyOtp = (code) => {
    Alert.alert(
      'Xác thực thành công!',
      'Chào mừng bạn đến với trải nghiệm điện ảnh Cinema Star.',
      [
        {
          text: 'Vào Trang Chủ',
          onPress: () => router.replace('/(tabs)/home'),
        },
      ]
    );
  };

  const isComplete = otp.every((d) => d !== '');

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const KEYPAD = [
    { num: '1', sub: ' ' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
    { action: 'faceid' },
    { num: '0', sub: ' ' },
    { action: 'delete' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xác Thực OTP</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shield Icon Block */}
        <View style={styles.shieldBlock}>
          <View style={styles.shieldAuraGold} />
          <View style={styles.shieldAuraCyan} />
          <View style={styles.shieldBox}>
            <MaterialIcons name="verified-user" size={32} color={THEME.colors.primaryContainer} />
            <View style={styles.cyanAccentDot} />
          </View>

          <Text style={styles.title}>Xác thực OTP</Text>
          <Text style={styles.subtitle}>
            Mã xác thực gồm 6 chữ số đã được gửi đến
          </Text>
          <Text style={styles.targetContactText}>{targetContact}</Text>
        </View>

        {/* 6-Digit OTP Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, idx) => {
            const isActive = idx === (activeIndex === -1 ? 5 : activeIndex);
            return (
              <View
                key={idx}
                style={[
                  styles.otpSlot,
                  isActive && styles.otpSlotActive,
                  digit !== '' && styles.otpSlotFilled,
                ]}
              >
                {digit !== '' ? (
                  <Text style={styles.otpDigitText}>{digit}</Text>
                ) : isActive ? (
                  <View style={styles.cursorBar} />
                ) : null}
              </View>
            );
          })}
        </View>

        {/* Timer / Resend Section */}
        <View style={styles.timerSection}>
          <View style={styles.countdownRow}>
            <MaterialIcons name="schedule" size={16} color={THEME.colors.tertiary} />
            <Text style={styles.countdownLabel}>Mã hết hạn sau:</Text>
            <Text style={styles.countdownTime}>{formatTime(countdown)}</Text>
          </View>

          <TouchableOpacity
            onPress={handleResend}
            disabled={!canResend}
            style={styles.resendBtn}
            activeOpacity={0.7}
          >
            <Text style={[styles.resendText, canResend && styles.resendTextActive]}>
              Gửi lại mã
            </Text>
            <MaterialIcons
              name="refresh"
              size={15}
              color={canResend ? THEME.colors.primaryContainer : THEME.colors.outline}
            />
          </TouchableOpacity>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          onPress={() => verifyOtp(otp.join(''))}
          disabled={!isComplete}
          style={[styles.confirmBtn, isComplete && styles.confirmBtnActive]}
          activeOpacity={0.88}
        >
          <MaterialIcons
            name="lock-open"
            size={20}
            color={isComplete ? THEME.colors.onPrimary : THEME.colors.outline}
          />
          <Text style={[styles.confirmBtnText, isComplete && styles.confirmBtnTextActive]}>
            Xác nhận & Tiếp tục
          </Text>
        </TouchableOpacity>

        {/* Seat Reservation Protection Card */}
        <View style={styles.seatProtectionCard}>
          <View style={styles.seatProtectionIcon}>
            <MaterialIcons name="local-activity" size={20} color={THEME.colors.primaryContainer} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.protectionTag}>BẢO VỆ GIỮ CHỖ</Text>
            <Text style={styles.protectionDesc}>Ghế VIP Cinema Star của bạn được giữ trong 05:00</Text>
          </View>
        </View>

        {/* Custom Mobile Keypad */}
        <View style={styles.keypadGrid}>
          {KEYPAD.map((item, index) => {
            if (item.action === 'faceid') {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={handleBiometric}
                  style={styles.keypadSpecialBtn}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="face" size={28} color={THEME.colors.tertiaryContainer} />
                </TouchableOpacity>
              );
            }
            if (item.action === 'delete') {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={handleDelete}
                  style={styles.keypadSpecialBtn}
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="backspace" size={24} color={THEME.colors.onSurfaceVariant} />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleKeyPress(item.num)}
                style={styles.keypadBtn}
                activeOpacity={0.7}
              >
                <Text style={styles.keypadNum}>{item.num}</Text>
                {item.sub.trim() !== '' && (
                  <Text style={styles.keypadLetters}>{item.sub}</Text>
                )}
              </TouchableOpacity>
            );
          })}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    alignItems: 'center',
  },
  shieldBlock: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  shieldAuraGold: {
    position: 'absolute',
    top: 0,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 184, 0, 0.16)',
  },
  shieldAuraCyan: {
    position: 'absolute',
    top: 6,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 218, 243, 0.16)',
  },
  shieldBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  cyanAccentDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: THEME.colors.tertiaryContainer,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  targetContactText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primary,
    marginTop: 2,
    letterSpacing: 0.8,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 18,
    width: '100%',
  },
  otpSlot: {
    flex: 1,
    maxWidth: 48,
    height: 54,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  otpSlotActive: {
    backgroundColor: THEME.colors.surfaceContainerHighest,
    borderColor: THEME.colors.tertiaryContainer,
    shadowColor: THEME.colors.tertiaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  otpSlotFilled: {
    borderColor: 'rgba(255, 184, 0, 0.4)',
  },
  otpDigitText: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.primary,
  },
  cursorBar: {
    width: 2,
    height: 22,
    borderRadius: 1,
    backgroundColor: THEME.colors.tertiaryContainer,
  },
  timerSection: {
    alignItems: 'center',
    gap: 6,
    marginBottom: 18,
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countdownLabel: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
  },
  countdownTime: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.tertiary,
    letterSpacing: 0.5,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 2,
  },
  resendText: {
    fontSize: 12,
    color: THEME.colors.outline,
  },
  resendTextActive: {
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  confirmBtnActive: {
    backgroundColor: THEME.colors.primaryContainer,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  confirmBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  confirmBtnTextActive: {
    color: THEME.colors.onPrimary,
  },
  seatProtectionCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    gap: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  seatProtectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: THEME.colors.surfaceContainerHighest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  protectionTag: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primary,
    letterSpacing: 0.8,
  },
  protectionDesc: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  keypadGrid: {
    width: '100%',
    maxWidth: 290,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  keypadBtn: {
    width: 76,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  keypadSpecialBtn: {
    width: 76,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadNum: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    lineHeight: 22,
  },
  keypadLetters: {
    fontSize: 8,
    fontWeight: '600',
    color: THEME.colors.onSurfaceVariant,
    letterSpacing: 0.8,
  },
});
