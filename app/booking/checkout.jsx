import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MOVIES, CINEMAS } from '../../src/data/mockData';

const { width } = Dimensions.get('window');

export default function CheckoutScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const movie = MOVIES.find((m) => m.id === params.movieId) || MOVIES[0];

  const seatPrice = parseInt(params.seatPrice || '220000', 10);
  const combosPrice = parseInt(params.combosPrice || '89000', 10);

  const [promoCode, setPromoCode] = useState('STARPASS50');
  const [discount, setDiscount] = useState(50000);
  const [selectedMethod, setSelectedMethod] = useState('vnpay'); // Default QR

  // QR Payment Simulation States
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(300); // 5 minutes
  const [qrPaymentStatus, setQrPaymentStatus] = useState('waiting'); // 'waiting' | 'processing' | 'success'

  // Scanner beam animation
  const scanBeamAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  const PAYMENT_METHODS = [
    {
      id: 'vnpay',
      name: 'VNPAY-QR / VietQR',
      sub: 'Quét mã từ mọi ứng dụng ngân hàng & ví',
      icon: 'qr-code-scanner',
      badge: 'Khuyên dùng',
      isQR: true,
    },
    {
      id: 'momo',
      name: 'Ví MoMo (Mã QR MoMo)',
      sub: 'Hoàn tiền 20% tối đa 40.000đ',
      icon: 'account-balance-wallet',
      badge: 'Hoàn 20%',
      isQR: true,
    },
    {
      id: 'zalopay',
      name: 'Ví ZaloPay (QR)',
      sub: 'Giảm ngay 15.000đ cho đơn từ 200.000đ',
      icon: 'credit-card',
      badge: 'Ưu đãi',
      isQR: true,
    },
    {
      id: 'card',
      name: 'Thẻ Quốc Tế (Visa / Mastercard / JCB)',
      sub: 'Bảo mật 3D Secure rạp quốc tế',
      icon: 'payment',
      isQR: false,
    },
  ];

  // Scanner Laser Beam Loop Animation
  useEffect(() => {
    if (showQRModal && qrPaymentStatus === 'waiting') {
      const scanLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(scanBeamAnim, {
            toValue: 180,
            duration: 1600,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scanBeamAnim, {
            toValue: 0,
            duration: 1600,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      );
      scanLoop.start();
      return () => scanLoop.stop();
    }
  }, [showQRModal, qrPaymentStatus]);

  // Pulse animation for waiting status
  useEffect(() => {
    if (showQRModal) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 800, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1.0, duration: 800, useNativeDriver: true }),
        ])
      );
      pulseLoop.start();
      return () => pulseLoop.stop();
    }
  }, [showQRModal]);

  // Countdown Timer for QR Code
  useEffect(() => {
    if (showQRModal && qrPaymentStatus === 'waiting' && qrCountdown > 0) {
      timerRef.current = setInterval(() => {
        setQrCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            Alert.alert('Mã QR hết hạn', 'Phiên giao dịch đã hết hạn. Vui lòng tạo mã thanh toán mới.');
            setShowQRModal(false);
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [showQRModal, qrPaymentStatus, qrCountdown]);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'STARPASS50') {
      setDiscount(50000);
      Alert.alert('Thành công', 'Đã áp dụng mã STARPASS50: Giảm 50.000đ');
    } else if (promoCode.trim().toUpperCase() === 'WEDNESDAY99K') {
      setDiscount(40000);
      Alert.alert('Thành công', 'Đã áp dụng mã WEDNESDAY99K: Giảm 40.000đ');
    } else {
      Alert.alert('Thông báo', 'Mã ưu đãi không hợp lệ hoặc đã hết hạn.');
    }
  };

  const finalTotal = Math.max(0, seatPrice + combosPrice - discount);

  const handleInitiatePayment = () => {
    const currentMethodObj = PAYMENT_METHODS.find((p) => p.id === selectedMethod);

    if (currentMethodObj?.isQR) {
      // Open Simulated QR Payment Modal
      setQrPaymentStatus('waiting');
      setQrCountdown(300);
      scanBeamAnim.setValue(0);
      setShowQRModal(true);
    } else {
      // Standard Card Payment Confirmation
      Alert.alert(
        'Xác nhận thanh toán',
        `Thanh toán ${finalTotal.toLocaleString('vi-VN')} đ qua ${currentMethodObj?.name}?`,
        [
          {
            text: 'Thanh toán ngay',
            onPress: () => completePaymentAndRedirect(),
          },
          { text: 'Hủy', style: 'cancel' },
        ]
      );
    }
  };

  // Simulate Successful QR Payment
  const handleSimulatePaymentSuccess = () => {
    setQrPaymentStatus('processing');

    setTimeout(() => {
      setQrPaymentStatus('success');

      setTimeout(() => {
        setShowQRModal(false);
        completePaymentAndRedirect();
      }, 1400);
    }, 1000);
  };

  const completePaymentAndRedirect = () => {
    const ticketId = 'TK-' + Math.floor(10000 + Math.random() * 90000);
    router.replace({
      pathname: '/booking/ticket/[id]',
      params: {
        id: ticketId,
        movieId: movie.id,
        seats: params.seats || 'G4, G5',
        totalPrice: finalTotal,
        time: params.time || '20:15',
        format: params.format || 'IMAX Laser 4K',
      },
    });
  };

  const formatCountdown = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const selectedMethodObj = PAYMENT_METHODS.find((p) => p.id === selectedMethod);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh Toán Đơn Vé</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Order Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.screeningInfo}>
            {params.format || 'IMAX Laser 4K'} • Suất {params.time || '20:15'}
          </Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Cụm rạp:</Text>
            <Text style={styles.detailValue}>Cinema Star Landmark 81</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Ghế đã chọn:</Text>
            <Text style={styles.detailValueHighlight}>{params.seats || 'G4, G5'}</Text>
          </View>
        </View>

        {/* Promo Voucher Input */}
        <Text style={styles.sectionHeading}>Mã giảm giá & Quà tặng</Text>
        <View style={styles.promoWrapper}>
          <MaterialIcons name="local-offer" size={18} color={THEME.colors.primaryContainer} style={styles.promoIcon} />
          <TextInput
            value={promoCode}
            onChangeText={setPromoCode}
            placeholder="Nhập mã ưu đãi..."
            placeholderTextColor="rgba(158, 143, 120, 0.6)"
            autoCapitalize="characters"
            style={styles.promoInput}
          />
          <TouchableOpacity onPress={handleApplyPromo} style={styles.applyBtn} activeOpacity={0.8}>
            <Text style={styles.applyBtnText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodHeadingRow}>
          <Text style={styles.sectionHeading}>Phương thức thanh toán</Text>
          <View style={styles.qrFeatureBadge}>
            <MaterialIcons name="qr-code-scanner" size={12} color={THEME.colors.tertiaryContainer} />
            <Text style={styles.qrFeatureText}>Hỗ trợ quét QR tức thì</Text>
          </View>
        </View>

        <View style={styles.methodsList}>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedMethod(method.id)}
                style={[styles.methodCard, isSelected && styles.methodCardActive]}
                activeOpacity={0.8}
              >
                <View style={styles.methodLeft}>
                  <View style={[styles.methodIconBox, isSelected && styles.methodIconBoxActive]}>
                    <MaterialIcons
                      name={method.icon}
                      size={20}
                      color={isSelected ? THEME.colors.primaryContainer : THEME.colors.outline}
                    />
                  </View>
                  <View>
                    <View style={styles.methodNameRow}>
                      <Text style={[styles.methodName, isSelected && styles.methodNameActive]}>
                        {method.name}
                      </Text>
                      {method.badge && (
                        <View style={styles.methodBadge}>
                          <Text style={styles.methodBadgeText}>{method.badge}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.methodSub}>{method.sub}</Text>
                  </View>
                </View>

                <MaterialIcons
                  name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={20}
                  color={isSelected ? THEME.colors.primaryContainer : THEME.colors.outline}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Price Breakdown */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Giá vé ({params.seats || '2 ghế'}):</Text>
            <Text style={styles.breakdownVal}>{seatPrice.toLocaleString('vi-VN')} đ</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Combo bắp nước:</Text>
            <Text style={styles.breakdownVal}>{combosPrice.toLocaleString('vi-VN')} đ</Text>
          </View>
          {discount > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabelDiscount}>Ưu đãi Voucher:</Text>
              <Text style={styles.breakdownValDiscount}>-{discount.toLocaleString('vi-VN')} đ</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
            <Text style={styles.totalValue}>{finalTotal.toLocaleString('vi-VN')} đ</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalSummary}>
          <Text style={styles.bottomTotalLabel}>Tổng thanh toán</Text>
          <Text style={styles.bottomTotalVal}>{finalTotal.toLocaleString('vi-VN')} đ</Text>
        </View>

        <TouchableOpacity onPress={handleInitiatePayment} style={styles.payBtn} activeOpacity={0.88}>
          <Text style={styles.payBtnText}>
            {selectedMethodObj?.isQR ? 'Thanh Toán Qua Mã QR' : 'Thanh Toán Ngay'}
          </Text>
          <MaterialIcons
            name={selectedMethodObj?.isQR ? 'qr-code-scanner' : 'lock'}
            size={18}
            color={THEME.colors.onPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* SIMULATED QR CODE PAYMENT MODAL */}
      <Modal
        visible={showQRModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowQRModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.qrSheetContainer}>
            {/* Sheet Header */}
            <View style={styles.qrSheetHeader}>
              <View style={styles.qrSheetHeaderLeft}>
                <View style={styles.qrGatewayBadge}>
                  <Text style={styles.qrGatewayText}>{selectedMethodObj?.name || 'VNPAY-QR'}</Text>
                </View>
                <Text style={styles.qrSheetTitle}>Quét Mã QR Thanh Toán</Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowQRModal(false)}
                style={styles.qrCloseBtn}
                activeOpacity={0.7}
              >
                <MaterialIcons name="close" size={20} color={THEME.colors.onSurface} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.qrModalBody}>
              {/* Countdown Warning Row */}
              <View style={styles.countdownRow}>
                <MaterialIcons name="timer" size={16} color={THEME.colors.secondaryContainer} />
                <Text style={styles.countdownPrompt}>Mã QR hết hạn trong:</Text>
                <Text style={styles.countdownNumber}>{formatCountdown(qrCountdown)}</Text>
              </View>

              {/* Dynamic QR Code Box with Laser Scanner Beam */}
              <View style={styles.qrBoxWrapper}>
                <View style={styles.qrBoxInner}>
                  {/* Central QR Code Icon Graphic */}
                  <Ionicons name="qr-code" size={190} color="#0d0e12" />

                  {/* Centered Cinema Star Hologram Badge */}
                  <View style={styles.qrCenterLogo}>
                    <MaterialIcons name="movie-filter" size={24} color={THEME.colors.primaryContainer} />
                  </View>

                  {/* Laser Scanning Beam (Only moves while waiting) */}
                  {qrPaymentStatus === 'waiting' && (
                    <Animated.View
                      style={[
                        styles.laserBeam,
                        { transform: [{ translateY: scanBeamAnim }] },
                      ]}
                    />
                  )}

                  {/* Success Overlay on QR */}
                  {qrPaymentStatus === 'success' && (
                    <View style={styles.qrSuccessOverlay}>
                      <MaterialIcons name="check-circle" size={64} color="#4CAF50" />
                      <Text style={styles.qrSuccessOverlayText}>ĐÃ THANH TOÁN</Text>
                    </View>
                  )}
                </View>

                {/* Corner Accents */}
                <View style={[styles.cornerBracket, styles.bracketTopLeft]} />
                <View style={[styles.cornerBracket, styles.bracketTopRight]} />
                <View style={[styles.cornerBracket, styles.bracketBottomLeft]} />
                <View style={[styles.cornerBracket, styles.bracketBottomRight]} />
              </View>

              {/* Payment Details Bill Card */}
              <View style={styles.qrBillCard}>
                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Số tiền cần chuyển:</Text>
                  <Text style={styles.billAmount}>{finalTotal.toLocaleString('vi-VN')} đ</Text>
                </View>

                <View style={styles.billDivider} />

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Đơn vị thụ hưởng:</Text>
                  <Text style={styles.billValue}>CINEMA STAR VIETNAM JSC</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Nội dung thanh toán:</Text>
                  <Text style={styles.billCodeHighlight}>CS-TK-LANDMARK81</Text>
                </View>

                <View style={styles.billRow}>
                  <Text style={styles.billLabel}>Cụm rạp & Ghế:</Text>
                  <Text style={styles.billValue}>Landmark 81 • {params.seats || 'G4, G5'}</Text>
                </View>
              </View>

              {/* Live Status Indicator Box */}
              <View style={styles.statusBox}>
                {qrPaymentStatus === 'waiting' && (
                  <View style={styles.statusStateRow}>
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                      <MaterialIcons name="sync" size={18} color={THEME.colors.tertiaryContainer} />
                    </Animated.View>
                    <Text style={styles.statusStateWaiting}>
                      Đang chờ bạn mở ứng dụng ngân hàng và quét mã...
                    </Text>
                  </View>
                )}

                {qrPaymentStatus === 'processing' && (
                  <View style={styles.statusStateRow}>
                    <MaterialIcons name="hourglass-top" size={18} color={THEME.colors.primaryContainer} />
                    <Text style={styles.statusStateProcessing}>
                      Đã nhận tín hiệu chuyển tiền! Đang kích hoạt vé xem phim...
                    </Text>
                  </View>
                )}

                {qrPaymentStatus === 'success' && (
                  <View style={styles.statusStateRow}>
                    <MaterialIcons name="verified" size={20} color="#4CAF50" />
                    <Text style={styles.statusStateSuccess}>
                      Giao dịch hoàn tất! Đang chuyển đến vé điện tử...
                    </Text>
                  </View>
                )}
              </View>

              {/* Interactive Simulation Action Buttons */}
              <View style={styles.simulationSection}>
                <TouchableOpacity
                  onPress={handleSimulatePaymentSuccess}
                  style={styles.simulateSuccessBtn}
                  activeOpacity={0.88}
                  disabled={qrPaymentStatus !== 'waiting'}
                >
                  <MaterialIcons name="bolt" size={20} color={THEME.colors.onPrimary} />
                  <Text style={styles.simulateSuccessBtnText}>
                    Mô Phỏng Quét & Chuyển Tiền Thành Công
                  </Text>
                </TouchableOpacity>

                <View style={styles.qrSecondaryActions}>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Đã lưu mã QR', 'Ảnh mã QR đã được lưu vào bộ sưu tập để quét sau.')}
                    style={styles.saveQrBtn}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="file-download" size={16} color={THEME.colors.primary} />
                    <Text style={styles.saveQrText}>Lưu ảnh QR</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setShowQRModal(false)}
                    style={styles.cancelQrBtn}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.cancelQrText}>Đổi phương thức</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 90,
  },
  summaryCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    marginBottom: 16,
  },
  movieTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  screeningInfo: {
    fontSize: 11,
    color: THEME.colors.primary,
    marginTop: 2,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  detailLabel: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  detailValue: {
    fontSize: 11,
    color: THEME.colors.onSurface,
    fontWeight: '600',
  },
  detailValueHighlight: {
    fontSize: 12,
    color: THEME.colors.primaryContainer,
    fontWeight: '800',
  },
  paymentMethodHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 6,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  qrFeatureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 216, 241, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: THEME.borderRadius.full,
    gap: 4,
  },
  qrFeatureText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.tertiary,
  },
  promoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
    marginBottom: 16,
  },
  promoIcon: {
    marginRight: 8,
  },
  promoInput: {
    flex: 1,
    paddingVertical: 10,
    color: THEME.colors.onSurface,
    fontSize: 12,
    fontWeight: '700',
  },
  applyBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  applyBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
  },
  methodsList: {
    gap: 8,
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  methodCardActive: {
    borderColor: 'rgba(255, 184, 0, 0.4)',
    backgroundColor: THEME.colors.surfaceContainerHigh,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodIconBoxActive: {
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
  },
  methodNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  methodName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  methodNameActive: {
    color: THEME.colors.primary,
  },
  methodBadge: {
    backgroundColor: 'rgba(0, 216, 241, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  methodBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.tertiary,
  },
  methodSub: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
  },
  breakdownCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    gap: 6,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  breakdownVal: {
    fontSize: 11,
    color: THEME.colors.onSurface,
    fontWeight: '600',
  },
  breakdownLabelDiscount: {
    fontSize: 11,
    color: THEME.colors.secondaryContainer,
    fontWeight: '600',
  },
  breakdownValDiscount: {
    fontSize: 11,
    color: THEME.colors.secondaryContainer,
    fontWeight: '700',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
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
  totalSummary: {
    flex: 1,
  },
  bottomTotalLabel: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  bottomTotalVal: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  payBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  payBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },

  /* SIMULATED QR PAYMENT MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  qrSheetContainer: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '92%',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.25)',
    paddingBottom: 20,
  },
  qrSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  qrSheetHeaderLeft: {
    gap: 2,
  },
  qrGatewayBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  qrGatewayText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    letterSpacing: 0.8,
  },
  qrSheetTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  qrCloseBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrModalBody: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
  },
  countdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 86, 37, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
    gap: 6,
    marginBottom: 14,
  },
  countdownPrompt: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  countdownNumber: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.secondaryContainer,
    letterSpacing: 0.6,
  },
  qrBoxWrapper: {
    width: 220,
    height: 220,
    backgroundColor: '#ffffff',
    borderRadius: THEME.borderRadius.xl,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 16,
  },
  qrBoxInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  qrCenterLogo: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.surfaceContainerLowest,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  laserBeam: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    height: 3,
    backgroundColor: THEME.colors.tertiaryContainer,
    shadowColor: THEME.colors.tertiaryContainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  },
  qrSuccessOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  qrSuccessOverlayText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4CAF50',
    letterSpacing: 1,
  },
  cornerBracket: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderColor: THEME.colors.primaryContainer,
  },
  bracketTopLeft: {
    top: 6,
    left: 6,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  bracketTopRight: {
    top: 6,
    right: 6,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bracketBottomLeft: {
    bottom: 6,
    left: 6,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bracketBottomRight: {
    bottom: 6,
    right: 6,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  qrBillCard: {
    width: '100%',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    gap: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billLabel: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
  },
  billAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  billDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 4,
  },
  billValue: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.onSurface,
  },
  billCodeHighlight: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.tertiary,
    letterSpacing: 0.5,
  },
  statusBox: {
    width: '100%',
    backgroundColor: THEME.colors.surfaceContainerLowest,
    borderRadius: THEME.borderRadius.md,
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  statusStateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusStateWaiting: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    flex: 1,
  },
  statusStateProcessing: {
    fontSize: 11,
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
    flex: 1,
  },
  statusStateSuccess: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '700',
    flex: 1,
  },
  simulationSection: {
    width: '100%',
    gap: 10,
  },
  simulateSuccessBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  simulateSuccessBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },
  qrSecondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  saveQrBtn: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.25)',
  },
  saveQrText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  cancelQrBtn: {
    flex: 1,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingVertical: 10,
    borderRadius: THEME.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelQrText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.onSurfaceVariant,
  },
});
