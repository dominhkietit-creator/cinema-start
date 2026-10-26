import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MOVIES } from '../../src/data/mockData';

const { width } = Dimensions.get('window');

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];

// Predefined booked seats
const OCCUPIED_SEATS = ['C3', 'C4', 'E4', 'E5', 'F5', 'F6', 'H1', 'H2'];

export default function SeatsSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const movie = MOVIES.find((m) => m.id === params.movieId) || MOVIES[0];

  const [selectedSeats, setSelectedSeats] = useState(['G4', 'G5']);

  const getSeatType = (row) => {
    if (row === 'H') return { type: 'Sweetbox', price: 160000 };
    if (['F', 'G'].includes(row)) return { type: 'VIP Gold', price: 130000 };
    return { type: 'Thường', price: 110000 };
  };

  const toggleSeat = (seatId, row) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) {
        Alert.alert('Giới hạn', 'Bạn chỉ có thể chọn tối đa 6 ghế trong một giao dịch.');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((sum, seatId) => {
      const row = seatId[0];
      return sum + getSeatType(row).price;
    }, 0);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một ghế.');
      return;
    }
    router.push({
      pathname: '/booking/combos',
      params: {
        movieId: movie.id,
        seats: selectedSeats.join(','),
        seatPrice: calculateTotal(),
        time: params.time || '20:15',
        format: params.format || 'IMAX Laser 4K',
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
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Chọn Ghế Ngồi</Text>
          <Text style={styles.headerSub}>{movie.title} • {params.time || '20:15'}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Cinema Curved Projection Screen */}
        <View style={styles.screenArea}>
          <View style={styles.screenCurve} />
          <View style={styles.screenGlow} />
          <Text style={styles.screenLabel}>MÀN HÌNH CHIẾU CONG IMAX</Text>
        </View>

        {/* Seat Matrix Grid */}
        <View style={styles.matrixContainer}>
          {ROWS.map((row) => (
            <View key={row} style={styles.seatRow}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.seatsInRow}>
                {COLS.map((col) => {
                  const seatId = `${row}${col}`;
                  const isOccupied = OCCUPIED_SEATS.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);
                  const isVip = ['F', 'G'].includes(row);
                  const isSweetbox = row === 'H';

                  return (
                    <TouchableOpacity
                      key={col}
                      onPress={() => toggleSeat(seatId, row)}
                      disabled={isOccupied}
                      style={[
                        styles.seatNode,
                        isVip && styles.seatVip,
                        isSweetbox && styles.seatSweetbox,
                        isOccupied && styles.seatOccupied,
                        isSelected && styles.seatSelected,
                      ]}
                      activeOpacity={0.7}
                    >
                      {isSelected ? (
                        <Text style={styles.seatNumber}>{col}</Text>
                      ) : null}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={styles.rowLabel}>{row}</Text>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatAvailable]} />
            <Text style={styles.legendText}>Ghế thường</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatVip]} />
            <Text style={styles.legendText}>Ghế VIP</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatSelected]} />
            <Text style={styles.legendText}>Đang chọn</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.seatOccupied]} />
            <Text style={styles.legendText}>Đã đặt</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.summaryInfo}>
          <Text style={styles.selectedSeatsText}>
            Ghế: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn'}
          </Text>
          <Text style={styles.totalPriceText}>
            {calculateTotal().toLocaleString('vi-VN')} đ
          </Text>
        </View>

        <TouchableOpacity onPress={handleProceed} style={styles.nextBtn} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>Chọn Bắp Nước</Text>
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
  headerTitleWrap: {
    alignItems: 'center',
    maxWidth: 240,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  headerSub: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 1,
  },
  scrollBody: {
    paddingBottom: 90,
    alignItems: 'center',
  },
  screenArea: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
    width: width * 0.85,
  },
  screenCurve: {
    width: '100%',
    height: 12,
    borderTopWidth: 4,
    borderTopColor: THEME.colors.tertiaryContainer,
    borderRadius: 100,
  },
  screenGlow: {
    position: 'absolute',
    top: 0,
    width: '90%',
    height: 20,
    backgroundColor: 'rgba(0, 216, 241, 0.15)',
    borderRadius: 100,
  },
  screenLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.outline,
    letterSpacing: 2,
    marginTop: 4,
  },
  matrixContainer: {
    gap: 8,
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    width: 14,
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.outline,
    textAlign: 'center',
  },
  seatsInRow: {
    flexDirection: 'row',
    gap: 6,
  },
  seatNode: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: THEME.colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  seatAvailable: {
    backgroundColor: THEME.colors.surfaceContainer,
  },
  seatVip: {
    borderColor: 'rgba(255, 184, 0, 0.4)',
    backgroundColor: 'rgba(255, 184, 0, 0.08)',
  },
  seatSweetbox: {
    borderColor: 'rgba(255, 86, 37, 0.4)',
  },
  seatOccupied: {
    backgroundColor: '#16171b',
    borderColor: 'transparent',
    opacity: 0.35,
  },
  seatSelected: {
    backgroundColor: THEME.colors.primaryContainer,
    borderColor: THEME.colors.primaryContainer,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  seatNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 26,
    paddingHorizontal: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  legendText: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
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
  selectedSeatsText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
  },
  totalPriceText: {
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
