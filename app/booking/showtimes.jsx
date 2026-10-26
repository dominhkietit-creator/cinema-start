import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MOVIES, CINEMAS, SHOWTIMES_DATES } from '../../src/data/mockData';

export default function ShowtimesScreen() {
  const router = useRouter();
  const { movieId } = useLocalSearchParams();
  const movie = MOVIES.find((m) => m.id === movieId) || MOVIES[0];

  const [selectedDate, setSelectedDate] = useState(SHOWTIMES_DATES[0]);
  const [selectedCinema, setSelectedCinema] = useState(CINEMAS[0]);
  const [selectedTime, setSelectedTime] = useState('20:15');
  const [selectedFormat, setSelectedFormat] = useState('IMAX Laser 4K');

  const SHOW_SLOTS = [
    { time: '10:15', hall: 'Phòng 01 (IMAX)', price: '190.000đ', format: 'IMAX Laser 4K' },
    { time: '13:45', hall: 'Phòng 02 (Dolby)', price: '140.000đ', format: 'Dolby Atmos' },
    { time: '17:30', hall: 'Phòng 01 (IMAX)', price: '210.000đ', format: 'IMAX Laser 4K' },
    { time: '20:15', hall: 'Phòng 01 (IMAX)', price: '210.000đ', format: 'IMAX Laser 4K' },
    { time: '22:45', hall: 'Phòng 03 (2D)', price: '120.000đ', format: '2D Phụ Đề' },
  ];

  const handleProceed = () => {
    router.push({
      pathname: '/booking/seats',
      params: {
        movieId: movie.id,
        cinemaId: selectedCinema.id,
        date: selectedDate.fullDate,
        time: selectedTime,
        format: selectedFormat,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle} numberOfLines={1}>{movie.title}</Text>
          <Text style={styles.headerSub}>{movie.duration} phút • {movie.ageRating}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Horizontal Dates Strip */}
        <Text style={styles.sectionHeading}>Chọn ngày chiếu</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesList}>
          {SHOWTIMES_DATES.map((d, index) => {
            const isSelected = selectedDate.dateStr === d.dateStr;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(d)}
                style={[styles.dateCard, isSelected && styles.dateCardActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayName, isSelected && styles.dayNameActive]}>{d.dayName}</Text>
                <Text style={[styles.dateStr, isSelected && styles.dateStrActive]}>{d.dateStr}</Text>
                {d.isSpecialPrice && (
                  <View style={styles.tag99k}>
                    <Text style={styles.tag99kText}>99K</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Selected Cinema Card & Switcher */}
        <Text style={styles.sectionHeading}>Chọn rạp</Text>
        <View style={styles.cinemasList}>
          {CINEMAS.map((cinema) => {
            const isCinemaActive = selectedCinema.id === cinema.id;
            return (
              <TouchableOpacity
                key={cinema.id}
                onPress={() => setSelectedCinema(cinema)}
                style={[styles.cinemaCard, isCinemaActive && styles.cinemaCardActive]}
                activeOpacity={0.8}
              >
                <View style={styles.cinemaCardTop}>
                  <View style={styles.cinemaNameRow}>
                    <MaterialIcons
                      name="place"
                      size={18}
                      color={isCinemaActive ? THEME.colors.primaryContainer : THEME.colors.outline}
                    />
                    <Text style={[styles.cinemaTitle, isCinemaActive && styles.cinemaTitleActive]}>
                      {cinema.name}
                    </Text>
                  </View>
                  <Text style={styles.cinemaDist}>{cinema.distance}</Text>
                </View>
                <Text style={styles.cinemaAddr} numberOfLines={1}>{cinema.address}</Text>

                {/* Showtimes slots when cinema is active */}
                {isCinemaActive && (
                  <View style={styles.slotsArea}>
                    <Text style={styles.slotsLabel}>Suất chiếu hôm nay ({selectedDate.dateStr}):</Text>
                    <View style={styles.slotsGrid}>
                      {SHOW_SLOTS.map((slot, sIdx) => {
                        const isSlotSelected = selectedTime === slot.time;
                        return (
                          <TouchableOpacity
                            key={sIdx}
                            onPress={() => {
                              setSelectedTime(slot.time);
                              setSelectedFormat(slot.format);
                            }}
                            style={[styles.slotChip, isSlotSelected && styles.slotChipActive]}
                            activeOpacity={0.8}
                          >
                            <Text style={[styles.slotTime, isSlotSelected && styles.slotTimeActive]}>
                              {slot.time}
                            </Text>
                            <Text style={styles.slotFormat}>{slot.format.split(' ')[0]}</Text>
                            <Text style={styles.slotPrice}>{slot.price}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Sticky Action */}
      <View style={styles.bottomBar}>
        <View style={styles.summaryLeft}>
          <Text style={styles.summaryTimeText}>{selectedDate.dateStr} • {selectedTime}</Text>
          <Text style={styles.summaryFormatText}>{selectedFormat} • {selectedCinema.name.split('Landmark')[0] || selectedCinema.name}</Text>
        </View>

        <TouchableOpacity onPress={handleProceed} style={styles.nextBtn} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>Chọn Ghế</Text>
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
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
  },
  datesList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  dateCard: {
    width: 64,
    height: 70,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    position: 'relative',
  },
  dateCardActive: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderColor: THEME.colors.primaryContainer,
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  dayName: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  dayNameActive: {
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
  },
  dateStr: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  dateStrActive: {
    color: THEME.colors.primary,
  },
  tag99k: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: THEME.colors.secondaryContainer,
    borderRadius: 3,
    paddingHorizontal: 3,
  },
  tag99kText: {
    fontSize: 7,
    fontWeight: '800',
    color: THEME.colors.white,
  },
  cinemasList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cinemaCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  cinemaCardActive: {
    borderColor: 'rgba(255, 184, 0, 0.35)',
  },
  cinemaCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cinemaNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  cinemaTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  cinemaTitleActive: {
    color: THEME.colors.primary,
  },
  cinemaDist: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  cinemaAddr: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 4,
    paddingLeft: 24,
  },
  slotsArea: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  slotsLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  slotChip: {
    width: '30%',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  slotChipActive: {
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    borderColor: THEME.colors.primaryContainer,
  },
  slotTime: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  slotTimeActive: {
    color: THEME.colors.primaryContainer,
  },
  slotFormat: {
    fontSize: 8,
    color: THEME.colors.tertiary,
    fontWeight: '700',
    marginTop: 2,
  },
  slotPrice: {
    fontSize: 9,
    color: THEME.colors.outline,
    marginTop: 2,
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
  summaryLeft: {
    flex: 1,
  },
  summaryTimeText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  summaryFormatText: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
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
