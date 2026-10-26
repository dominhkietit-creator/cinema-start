import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { CINEMAS, MOVIES } from '../../src/data/mockData';

export default function CinemaDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const cinema = CINEMAS.find((c) => c.id === id) || CINEMAS[0];

  const AMENITIES = [
    { icon: 'videocam', title: 'IMAX Laser 4K', sub: 'Màn hình cong khổng lồ' },
    { icon: 'surround-sound', title: 'Dolby Atmos', sub: 'Âm vòm 64 kênh' },
    { icon: 'weekend', title: 'Ghế Sweetbox', sub: 'Không gian riêng tư' },
    { icon: 'local-parking', title: 'Bãi đỗ xe', sub: 'Tầng hầm rộng rãi' },
    { icon: 'wifi', title: 'Wi-Fi miễn phí', sub: 'Tốc độ cao 5G' },
    { icon: 'fastfood', title: 'Star Bar Cafe', sub: 'Bắp rang nướng bơ' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <MaterialIcons name="arrow-back" size={22} color={THEME.colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{cinema.name}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${cinema.phone}`)} style={styles.callIconBtn}>
          <MaterialIcons name="call" size={20} color={THEME.colors.primaryContainer} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Cinema Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.ratingBadge}>
              <MaterialIcons name="star" size={14} color={THEME.colors.primaryContainer} />
              <Text style={styles.ratingText}>{cinema.rating}</Text>
            </View>
            <View style={styles.hallsBadge}>
              <Text style={styles.hallsText}>{cinema.halls} Phòng chiếu</Text>
            </View>
          </View>

          <Text style={styles.cinemaName}>{cinema.name}</Text>
          <Text style={styles.addressText}>{cinema.address}</Text>

          <View style={styles.contactRow}>
            <MaterialIcons name="phone" size={16} color={THEME.colors.primary} />
            <Text style={styles.phoneText}>{cinema.phone}</Text>
          </View>
        </View>

        {/* Amenities Grid */}
        <Text style={styles.sectionHeading}>Tiện ích rạp cao cấp</Text>
        <View style={styles.amenitiesGrid}>
          {AMENITIES.map((am, idx) => (
            <View key={idx} style={styles.amenityCard}>
              <MaterialIcons name={am.icon} size={22} color={THEME.colors.primaryContainer} />
              <Text style={styles.amenityTitle}>{am.title}</Text>
              <Text style={styles.amenitySub}>{am.sub}</Text>
            </View>
          ))}
        </View>

        {/* Movies playing today at this cinema */}
        <Text style={styles.sectionHeading}>Phim đang chiếu hôm nay</Text>
        <View style={styles.moviesList}>
          {MOVIES.slice(0, 3).map((movie) => (
            <View key={movie.id} style={styles.movieRow}>
              <Image source={{ uri: movie.poster }} style={styles.movieThumb} />
              <View style={styles.movieRowInfo}>
                <Text style={styles.movieRowTitle} numberOfLines={1}>{movie.title}</Text>
                <Text style={styles.movieRowMeta}>{movie.duration}p • {movie.ageRating}</Text>

                <View style={styles.showtimePillsRow}>
                  {['10:15', '14:30', '18:00', '20:15'].map((time, tIdx) => (
                    <TouchableOpacity
                      key={tIdx}
                      onPress={() =>
                        router.push({
                          pathname: '/booking/seats',
                          params: { movieId: movie.id, cinemaId: cinema.id, time },
                        })
                      }
                      style={styles.timePill}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.timePillText}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
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
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    maxWidth: 240,
  },
  callIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.25)',
    marginBottom: 16,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  hallsBadge: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  hallsText: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    fontWeight: '700',
  },
  cinemaName: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phoneText: {
    fontSize: 11,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 10,
    marginTop: 6,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  amenityCard: {
    width: '48%',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.md,
    padding: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  amenityTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginTop: 2,
  },
  amenitySub: {
    fontSize: 9,
    color: THEME.colors.outline,
  },
  moviesList: {
    gap: 12,
  },
  movieRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  movieThumb: {
    width: 64,
    height: 90,
    borderRadius: THEME.borderRadius.md,
  },
  movieRowInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  movieRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  movieRowMeta: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  showtimePillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  timePill: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  timePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
});
