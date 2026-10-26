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
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('sms'); // 'sms' | 'email'
  const [phone, setPhone] = useState('987654321');
  const [email, setEmail] = useState('cinema.fan@example.com');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    const contactValue = activeTab === 'sms' ? `(+84) ${phone}` : email;
    if (activeTab === 'sms' && !phone.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại.');
      return;
    }
    if (activeTab === 'email' && !email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ email.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: '/auth/otp',
        params: { contact: contactValue, mode: activeTab },
      });
    }, 600);
  };

  const handleCallSupport = () => {
    Linking.openURL('tel:19006868').catch(() => {
      Alert.alert('Tổng đài hỗ trợ', 'Hotline 24/7: 1900 6868');
    });
  };

  const handleLiveChat = () => {
    Alert.alert('Chat hỗ trợ', 'Đang kết nối tới chuyên viên tư vấn Cinema Star...');
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
        <Text style={styles.headerTitle}>Khôi Phục Mật Khẩu</Text>
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
          {/* Radiant Lock Icon */}
          <View style={styles.iconCenterBlock}>
            <View style={styles.lockHalo} />
            <View style={styles.lockBoxOuter}>
              <View style={styles.lockBoxInner}>
                <MaterialIcons name="lock-reset" size={38} color={THEME.colors.primaryContainer} />
              </View>
            </View>

            <Text style={styles.headline}>Khôi phục mật khẩu</Text>
            <Text style={styles.subheadline}>
              Đừng lo lắng! Vui lòng nhập số điện thoại hoặc email liên kết với tài khoản{' '}
              <Text style={styles.boldBrand}>Cinema Star</Text> của bạn để nhận mã xác thực OTP khôi phục.
            </Text>
          </View>

          {/* Mode Selector Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('sms')}
              style={[styles.tabBtn, activeTab === 'sms' && styles.tabBtnActive]}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="sms"
                size={18}
                color={activeTab === 'sms' ? THEME.colors.primaryContainer : THEME.colors.onSurfaceVariant}
              />
              <Text style={[styles.tabText, activeTab === 'sms' && styles.tabTextActive]}>
                Gửi qua SMS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('email')}
              style={[styles.tabBtn, activeTab === 'email' && styles.tabBtnActive]}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name="alternate-email"
                size={18}
                color={activeTab === 'email' ? THEME.colors.primaryContainer : THEME.colors.onSurfaceVariant}
              />
              <Text style={[styles.tabText, activeTab === 'email' && styles.tabTextActive]}>
                Gửi qua Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Input Field */}
          <View style={styles.inputSection}>
            {activeTab === 'sms' ? (
              <View style={styles.fieldGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Số điện thoại đăng ký</Text>
                  <Text style={styles.labelSub}>Đầu số VN (+84)</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="phone-iphone" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
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
            ) : (
              <View style={styles.fieldGroup}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>Địa chỉ Email liên kết</Text>
                  <Text style={styles.labelSub}>Nhận link & OTP</Text>
                </View>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="mail" size={18} color={THEME.colors.outline} style={styles.inputIcon} />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="cinema.fan@example.com"
                    placeholderTextColor="rgba(158, 143, 120, 0.6)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.textInput}
                  />
                </View>
              </View>
            )}

            {/* Helper Hint */}
            <View style={styles.helperRow}>
              <MaterialIcons name="verified-user" size={15} color={THEME.colors.primaryContainer} />
              <Text style={styles.helperText}>Mã xác thực có hiệu lực trong 5 phút.</Text>
            </View>

            {/* CTA Button */}
            <TouchableOpacity
              onPress={handleSendOTP}
              style={styles.submitBtn}
              activeOpacity={0.88}
              disabled={loading}
            >
              <Text style={styles.submitBtnText}>
                {loading ? 'Đang gửi mã...' : 'Gửi mã xác thực OTP'}
              </Text>
              <MaterialIcons name="send" size={18} color={THEME.colors.onPrimary} />
            </TouchableOpacity>
          </View>

          {/* Reassurance Card */}
          <View style={styles.reassuranceCard}>
            <View style={styles.popcornIconBox}>
              <MaterialIcons name="security" size={24} color={THEME.colors.primaryContainer} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.reassuranceTitle}>Bảo mật tài khoản sao?</Text>
              <Text style={styles.reassuranceDesc}>
                Sau khi khôi phục, điểm thưởng StarClub và vé đã đặt của bạn vẫn được bảo lưu an toàn 100%.
              </Text>
            </View>
          </View>

          {/* Support / Help Box */}
          <View style={styles.supportBox}>
            <View style={styles.supportHeader}>
              <MaterialIcons name="support-agent" size={20} color={THEME.colors.secondaryContainer} />
              <Text style={styles.supportTitle}>Cần trợ giúp khẩn cấp?</Text>
            </View>
            <Text style={styles.supportDesc}>
              Nếu bạn đã mất quyền truy cập số điện thoại hoặc email đăng ký, hãy liên hệ ngay với ban quản lý rạp:
            </Text>
            <View style={styles.supportActionsRow}>
              <TouchableOpacity
                onPress={handleCallSupport}
                style={styles.actionCallBtn}
                activeOpacity={0.8}
              >
                <MaterialIcons name="call" size={16} color={THEME.colors.primaryContainer} />
                <Text style={styles.actionCallText}>1900 6868</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLiveChat}
                style={styles.actionChatBtn}
                activeOpacity={0.8}
              >
                <MaterialIcons name="chat-bubble" size={16} color={THEME.colors.tertiary} />
                <Text style={styles.actionChatText}>Chat hỗ trợ</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Back to Login */}
          <TouchableOpacity
            onPress={() => router.push('/auth/login')}
            style={styles.backToLoginBtn}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={16} color={THEME.colors.onSurfaceVariant} />
            <Text style={styles.backToLoginText}>Quay lại Đăng nhập</Text>
          </TouchableOpacity>
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
  iconCenterBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  lockHalo: {
    position: 'absolute',
    top: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
  },
  lockBoxOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  lockBoxInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: THEME.colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 8,
  },
  subheadline: {
    fontSize: 13,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 300,
  },
  boldBrand: {
    color: THEME.colors.primary,
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLowest,
    borderRadius: THEME.borderRadius.lg,
    padding: 4,
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.onSurfaceVariant,
  },
  tabTextActive: {
    color: THEME.colors.primaryContainer,
  },
  inputSection: {
    gap: 12,
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
  labelSub: {
    fontSize: 10,
    color: THEME.colors.tertiary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainer,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  prefixText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.onSurface,
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
  helperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  helperText: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  submitBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
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
  reassuranceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    marginTop: 20,
    gap: 12,
  },
  popcornIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reassuranceTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
    marginBottom: 2,
  },
  reassuranceDesc: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
  },
  supportBox: {
    backgroundColor: 'rgba(41, 42, 46, 0.6)',
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    marginTop: 14,
    gap: 8,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  supportTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  supportDesc: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
  },
  supportActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  actionCallBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainer,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    gap: 6,
  },
  actionCallText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  actionChatBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainer,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    gap: 6,
  },
  actionChatText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.tertiary,
  },
  backToLoginBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 6,
    paddingVertical: 8,
  },
  backToLoginText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
    fontWeight: '600',
  },
});
