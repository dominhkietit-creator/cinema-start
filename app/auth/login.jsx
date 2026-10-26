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
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [account, setAccount] = useState('0912345678');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = () => {
    if (!account.trim() || !password.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại/email và mật khẩu.');
      return;
    }
    // Navigate into main app
    router.replace('/(tabs)/home');
  };

  const handleBiometric = () => {
    Alert.alert(
      'Xác thực sinh trắc học',
      'Đang quét Face ID / Vân tay...',
      [
        {
          text: 'Thành công',
          onPress: () => router.replace('/(tabs)/home'),
        },
        { text: 'Hủy', style: 'cancel' },
      ]
    );
  };

  const handleSocialLogin = (platform) => {
    Alert.alert('Đăng nhập', `Đăng nhập qua ${platform} thành công!`, [
      { text: 'OK', onPress: () => router.replace('/(tabs)/home') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Subtle Glows */}
          <View style={styles.glowTopLeft} />
          <View style={styles.glowTopRight} />

          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <View style={styles.logoBox}>
                <MaterialIcons name="local-movies" size={38} color={THEME.colors.primaryContainer} />
              </View>
            </View>

            <View style={styles.memberBadge}>
              <MaterialIcons name="stars" size={14} color={THEME.colors.primaryContainer} />
              <Text style={styles.memberBadgeText}>STAR CLUB MEMBER</Text>
            </View>

            <Text style={styles.title}>Chào mừng trở lại!</Text>
            <Text style={styles.subtitle}>
              Đăng nhập để nhận ưu đãi vé xem phim độc quyền và tích điểm{' '}
              <Text style={styles.highlightText}>Star Club</Text>.
            </Text>
          </View>

          {/* Login Card */}
          <View style={styles.card}>
            {/* Account Input */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Số điện thoại hoặc Email</Text>
                <Text style={styles.labelHint}>Chính xác</Text>
              </View>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="alternate-email" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={account}
                  onChangeText={setAccount}
                  placeholder="vidu@cinemastar.vn"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  style={styles.textInput}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Mật khẩu</Text>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="vpn-key" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="rgba(158, 143, 120, 0.6)"
                  style={styles.textInput}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={THEME.colors.outline}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsRow}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.rememberRow}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={rememberMe ? 'check-box' : 'check-box-outline-blank'}
                  size={20}
                  color={rememberMe ? THEME.colors.primaryContainer : THEME.colors.outline}
                />
                <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/auth/forgot-password')}
                activeOpacity={0.7}
              >
                <Text style={styles.forgotText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            {/* Submit & Biometric Cluster */}
            <View style={styles.ctaRow}>
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.loginBtn}
                activeOpacity={0.88}
              >
                <Text style={styles.loginBtnText}>Đăng nhập</Text>
                <MaterialIcons name="arrow-forward" size={18} color={THEME.colors.onPrimary} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleBiometric}
                style={styles.biometricBtn}
                activeOpacity={0.8}
              >
                <Ionicons name="finger-print-outline" size={24} color={THEME.colors.tertiaryContainer} />
                <View style={styles.bioDot} />
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>HOẶC ĐĂNG NHẬP BẰNG</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Grid */}
            <View style={styles.socialGrid}>
              <TouchableOpacity
                onPress={() => handleSocialLogin('Google')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <FontAwesome name="google" size={18} color="#EA4335" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin('Apple')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <FontAwesome name="apple" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin('Zalo')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <Text style={styles.zaloText}>Zalo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin('Facebook')}
                style={styles.socialBtn}
                activeOpacity={0.75}
              >
                <FontAwesome name="facebook" size={18} color="#1877F2" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Star Club Perk Teaser */}
          <View style={styles.perkTeaser}>
            <View style={styles.perkIconBox}>
              <MaterialIcons name="confirmation-number" size={22} color={THEME.colors.primaryContainer} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.perkTeaserTitle}>Đặc quyền hội viên Star</Text>
              <Text style={styles.perkTeaserDesc}>Giảm 20% combo bỏng nước thứ Tư hàng tuần</Text>
            </View>
          </View>

          {/* Footer Register Link */}
          <View style={styles.footer}>
            <Text style={styles.footerMuted}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')}>
              <Text style={styles.footerLink}>Đăng ký ngay</Text>
            </TouchableOpacity>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  glowTopLeft: {
    position: 'absolute',
    top: -50,
    left: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 86, 37, 0.08)',
  },
  glowTopRight: {
    position: 'absolute',
    top: 50,
    right: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  logoWrapper: {
    marginBottom: 12,
  },
  logoBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: THEME.colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 184, 0, 0.4)',
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
    gap: 6,
    marginBottom: 10,
  },
  memberBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primary,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 290,
  },
  highlightText: {
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(31, 31, 36, 0.88)',
    borderRadius: THEME.borderRadius.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
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
    color: THEME.colors.onSurfaceVariant,
  },
  labelHint: {
    fontSize: 10,
    color: THEME.colors.tertiary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLowest,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    color: THEME.colors.onSurface,
    fontSize: 14,
  },
  eyeBtn: {
    padding: 6,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
  },
  forgotText: {
    fontSize: 12,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  loginBtn: {
    flex: 1,
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  loginBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  biometricBtn: {
    width: 48,
    height: 48,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bioDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.tertiaryContainer,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: THEME.colors.surfaceContainerHighest,
  },
  dividerText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.outline,
    paddingHorizontal: 10,
    letterSpacing: 0.8,
  },
  socialGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  socialBtn: {
    flex: 1,
    height: 42,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  zaloText: {
    color: '#0068FF',
    fontWeight: '800',
    fontSize: 13,
  },
  perkTeaser: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    marginTop: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  perkIconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  perkTeaserTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 2,
  },
  perkTeaserDesc: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  footerMuted: {
    fontSize: 13,
    color: THEME.colors.onSurfaceVariant,
  },
  footerLink: {
    fontSize: 13,
    color: THEME.colors.primary,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
