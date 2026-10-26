import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState('Nguyễn Văn A');
  const [phone, setPhone] = useState('912345678');
  const [email, setEmail] = useState('cinema.star@domain.com');
  const [password, setPassword] = useState('StarPass2026!');
  const [confirmPassword, setConfirmPassword] = useState('StarPass2026!');
  const [birthday, setBirthday] = useState('15/05/1998');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Dynamic strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  const getStrengthLabel = () => {
    if (strength === 0) return 'Tối thiểu 8 ký tự';
    if (strength === 1) return 'Mật khẩu yếu';
    if (strength === 2) return 'Mật khẩu vừa';
    return 'Mật khẩu rất mạnh';
  };

  const handleRegister = () => {
    if (!fullName.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Thông báo', 'Vui lòng đồng ý với Điều khoản dịch vụ & Chính sách bảo mật.');
      return;
    }
    // Navigate to OTP verification screen
    router.push({
      pathname: '/auth/otp',
      params: { phone: `(+84) ${phone}` },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đăng Ký Tài Khoản</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Incentive Delight Banner (Ticket Cutout) */}
          <View style={styles.incentiveBanner}>
            <View style={styles.notchLeft} />
            <View style={styles.notchRight} />

            <View style={styles.bannerContent}>
              <View style={styles.starIconBox}>
                <MaterialIcons name="stars" size={26} color={THEME.colors.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.bannerTagRow}>
                  <Text style={styles.bannerTag}>ĐẶC QUYỀN MỚI</Text>
                  <View style={styles.pulseDot} />
                </View>
                <Text style={styles.bannerTitle}>Quà chào mừng Star Pass</Text>
                <Text style={styles.bannerSub}>
                  Tặng 50 StarPoints + Voucher Bắp rang phô mai miễn phí
                </Text>
              </View>
            </View>
          </View>

          {/* Form Container */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Họ và tên</Text>
                <Text style={styles.labelRequired}>Bắt buộc</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="person" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Nguyễn Văn A"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Số điện thoại</Text>
                <Text style={styles.labelInfo}>Tích điểm rạp</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="call" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <Text style={styles.prefixText}>+84</Text>
                <View style={styles.prefixDivider} />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="912 345 678"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  keyboardType="phone-pad"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Địa chỉ Email</Text>
                <Text style={styles.labelInfo}>Nhận vé & hóa đơn</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="mail" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="cinema.star@domain.com"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Mật khẩu bảo mật</Text>
                <Text style={[
                  styles.strengthLabel,
                  strength === 3 && { color: '#4CAF50' },
                  strength === 2 && { color: THEME.colors.primaryContainer },
                  strength === 1 && { color: THEME.colors.secondaryContainer },
                ]}>
                  {getStrengthLabel()}
                </Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="lock" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••••••"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  secureTextEntry={!showPassword}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  <MaterialIcons name={showPassword ? 'visibility' : 'visibility-off'} size={20} color={THEME.colors.outline} />
                </TouchableOpacity>
              </View>

              {/* Strength Bar */}
              <View style={styles.strengthBarRow}>
                <View style={[styles.strengthBar, strength >= 1 && styles.strengthBarActive]} />
                <View style={[styles.strengthBar, strength >= 2 && styles.strengthBarActive]} />
                <View style={[styles.strengthBar, strength >= 3 && styles.strengthBarActive]} />
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Xác nhận mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="verified-user" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••••••"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  secureTextEntry={!showConfirm}
                  style={styles.textInput}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                  <MaterialIcons name={showConfirm ? 'visibility' : 'visibility-off'} size={20} color={THEME.colors.outline} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Birthday */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={styles.label}>Ngày sinh</Text>
                  <MaterialIcons name="cake" size={14} color={THEME.colors.secondaryContainer} />
                </View>
                <Text style={styles.birthdayPerk}>Vé xem phim 0đ sinh nhật</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="calendar-month" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={birthday}
                  onChangeText={setBirthday}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  style={styles.textInput}
                />
              </View>
            </View>

            {/* Terms and Conditions Checkbox */}
            <TouchableOpacity
              onPress={() => setAgreeTerms(!agreeTerms)}
              style={styles.termsRow}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name={agreeTerms ? 'check-box' : 'check-box-outline-blank'}
                size={22}
                color={agreeTerms ? THEME.colors.primaryContainer : THEME.colors.outline}
              />
              <Text style={styles.termsText}>
                Tôi đã đọc và đồng ý với{' '}
                <Text style={styles.termsLink}>Điều khoản dịch vụ</Text> &{' '}
                <Text style={styles.termsLink}>Chính sách bảo mật</Text> của Cinema Star.
              </Text>
            </TouchableOpacity>

            {/* Visual Perk Micro-Cards */}
            <View style={styles.perkGrid}>
              <View style={styles.perkCard}>
                <MaterialIcons name="movie" size={18} color={THEME.colors.tertiary} />
                <View>
                  <Text style={styles.perkTitle}>Ghế VIP</Text>
                  <Text style={styles.perkSub}>Giữ chỗ trước 15p</Text>
                </View>
              </View>
              <View style={styles.perkCard}>
                <MaterialIcons name="local-activity" size={18} color={THEME.colors.primaryContainer} />
                <View>
                  <Text style={styles.perkTitle}>Tích StarPoints</Text>
                  <Text style={styles.perkSub}>Đổi vé & combo bắp</Text>
                </View>
              </View>
            </View>

            {/* Primary Submit Button */}
            <TouchableOpacity
              onPress={handleRegister}
              style={styles.submitBtn}
              activeOpacity={0.88}
            >
              <Text style={styles.submitBtnText}>Đăng Ký & Nhận Quà Ngay</Text>
              <MaterialIcons name="arrow-forward" size={18} color={THEME.colors.onPrimary} />
            </TouchableOpacity>

            {/* Footer Back to Login */}
            <View style={styles.footerRow}>
              <Text style={styles.footerMuted}>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.footerLink}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: 16,
    paddingBottom: 40,
  },
  incentiveBanner: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    position: 'relative',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.2)',
  },
  notchLeft: {
    position: 'absolute',
    left: -10,
    top: '50%',
    marginTop: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.colors.background,
  },
  notchRight: {
    position: 'absolute',
    right: -10,
    top: '50%',
    marginTop: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: THEME.colors.background,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  starIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bannerTag: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    letterSpacing: 0.8,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.secondaryContainer,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginTop: 2,
  },
  bannerSub: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
  },
  form: {
    gap: 14,
  },
  fieldGroup: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.onSurface,
  },
  labelRequired: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  labelInfo: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  strengthLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.outline,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  prefixText: {
    color: THEME.colors.onSurface,
    fontSize: 13,
    fontWeight: '600',
  },
  prefixDivider: {
    width: 1,
    height: 14,
    backgroundColor: THEME.colors.outlineVariant,
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    color: THEME.colors.onSurface,
    fontSize: 13,
  },
  eyeBtn: {
    padding: 6,
  },
  strengthBarRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 2,
  },
  strengthBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: THEME.colors.surfaceContainerHighest,
  },
  strengthBarActive: {
    backgroundColor: THEME.colors.primaryContainer,
  },
  birthdayPerk: {
    fontSize: 10,
    color: THEME.colors.secondaryContainer,
    fontWeight: '600',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  termsText: {
    flex: 1,
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
  },
  termsLink: {
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  perkGrid: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  perkCard: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  perkSub: {
    fontSize: 9,
    color: THEME.colors.outline,
  },
  submitBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  submitBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerMuted: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
  },
  footerLink: {
    fontSize: 12,
    color: THEME.colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
