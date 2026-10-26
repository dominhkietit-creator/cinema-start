import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { CINEMAS } from '../../src/data/mockData';

export default function CinemasScreen() {
  const router = useRouter();
  const [searchCinema, setSearchCinema] = useState('');

  const filteredCinemas = CINEMAS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCinema.toLowerCase()) ||
      c.address.toLowerCase().includes(searchCinema.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Hệ Thống Rạp Cinema Star</Text>
        <Text style={styles.headerSub}>4 cụm rạp cao cấp tại TP.HCM</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={20} color={THEME.colors.outline} style={{ marginRight: 8 }} />
        <TextInput
          value={searchCinema}
          onChangeText={setSearchCinema}
          placeholder="Tìm cụm rạp theo tên, quận..."
          placeholderTextColor="rgba(158, 143, 120, 0.6)"
          style={styles.searchInput}
        />
      </View>

      {/* Cinemas List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {filteredCinemas.map((cinema) => (
          <TouchableOpacity
            key={cinema.id}
            onPress={() => router.push({ pathname: '/cinema/[id]', params: { id: cinema.id } })}
            style={styles.cinemaCard}
            activeOpacity={0.88}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="theaters" size={20} color={THEME.colors.primaryContainer} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cinemaTitle}>{cinema.name}</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" size={13} color={THEME.colors.primaryContainer} />
                  <Text style={styles.ratingScore}>{cinema.rating}</Text>
                  <Text style={styles.reviewsCount}>({cinema.reviewsCount} đánh giá)</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.distance}>{cinema.distance}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.addressText}>{cinema.address}</Text>

            {/* Feature Tags */}
            <View style={styles.featuresRow}>
              {cinema.features.map((feat, fIdx) => (
                <View key={fIdx} style={styles.featurePill}>
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>

            {/* Bottom Actions */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${cinema.phone}`)}
                style={styles.callBtn}
              >
                <MaterialIcons name="call" size={14} color={THEME.colors.primary} />
                <Text style={styles.callText}>{cinema.phone.split(' - ')[0]}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push({ pathname: '/cinema/[id]', params: { id: cinema.id } })}
                style={styles.detailBtn}
              >
                <Text style={styles.detailText}>Lịch chiếu rạp</Text>
                <MaterialIcons name="arrow-forward" size={14} color={THEME.colors.onPrimary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  topHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  headerSub: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginTop: 2,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    marginHorizontal: 16,
    marginVertical: 10,
    paddingHorizontal: 12,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: THEME.colors.onSurface,
    fontSize: 12,
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingBottom: 95,
    gap: 14,
  },
  cinemaCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cinemaTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.onSurface,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingScore: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  reviewsCount: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  dot: {
    color: THEME.colors.outline,
    fontSize: 10,
  },
  distance: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.tertiary,
  },
  addressText: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: 10,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  featurePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.25)',
  },
  featureText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 10,
  },
  callBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  callText: {
    fontSize: 11,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  detailBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },
});
