import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MOVIES, CINEMAS, PROMOTIONS, CURRENT_USER } from '../../src/data/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('now_showing'); // 'now_showing' | 'coming_soon'
  const [selectedCinema, setSelectedCinema] = useState(CINEMAS[0]);

  const filteredMovies = MOVIES.filter((m) => m.status === selectedTab);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          <Image source={{ uri: CURRENT_USER.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.greeting}>Xin chào,</Text>
            <Text style={styles.userName}>{CURRENT_USER.name}</Text>
          </View>
        </View>

        <View style={styles.topActions}>
          {/* <TouchableOpacity
            onPress={() => router.push('/screens-overview')}
            style={styles.allScreensBtn}
            activeOpacity={0.7}
          >
            <MaterialIcons name="grid-view" size={16} color={THEME.colors.primaryContainer} />
            <Text style={styles.allScreensText}>22 Màn hình</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => router.push('/notifications')}
            style={styles.iconBtn}
            activeOpacity={0.7}
          >
            <MaterialIcons name="notifications-none" size={22} color={THEME.colors.onSurface} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Cinema Selector Pill */}
        <TouchableOpacity
          onPress={() => router.push('/(tabs)/cinemas')}
          style={styles.cinemaPill}
          activeOpacity={0.8}
        >
          <MaterialIcons name="place" size={18} color={THEME.colors.primaryContainer} />
          <Text style={styles.cinemaName} numberOfLines={1}>
            {selectedCinema.name}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={20} color={THEME.colors.outline} />
        </TouchableOpacity>

        {/* Hero Featured Movie Banner */}
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/movie/[id]', params: { id: MOVIES[0].id } })}
          style={styles.heroCard}
          activeOpacity={0.92}
        >
          <Image source={{ uri: MOVIES[0].banner }} style={styles.heroBanner} />
          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroTagRow}>
              <View style={styles.imaxBadge}>
                <Text style={styles.imaxText}>IMAX LASER 4K</Text>
              </View>
              <View style={styles.ratingBadge}>
                <MaterialIcons name="star" size={14} color={THEME.colors.primaryContainer} />
                <Text style={styles.ratingText}>{MOVIES[0].rating}</Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>{MOVIES[0].title}</Text>
            <Text style={styles.heroGenre}>
              {MOVIES[0].genre.join(' • ')} | {MOVIES[0].duration} phút
            </Text>

            <View style={styles.heroBtnRow}>
              <View style={styles.bookNowBtn}>
                <MaterialIcons name="confirmation-number" size={16} color={THEME.colors.onPrimary} />
                <Text style={styles.bookNowText}>Đặt vé ngay</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Star Club Quick Bar */}
        <TouchableOpacity
          onPress={() => router.push('/star-club')}
          style={styles.loyaltyCard}
          activeOpacity={0.85}
        >
          <View style={styles.loyaltyLeft}>
            <MaterialIcons name="stars" size={24} color={THEME.colors.primaryContainer} />
            <View>
              <Text style={styles.tierName}>{CURRENT_USER.membershipTier}</Text>
              <Text style={styles.pointsBalance}>{CURRENT_USER.starPoints} StarPoints khả dụng</Text>
            </View>
          </View>
          <View style={styles.loyaltyAction}>
            <Text style={styles.redeemText}>Đổi quà</Text>
            <MaterialIcons name="chevron-right" size={18} color={THEME.colors.primaryContainer} />
          </View>
        </TouchableOpacity>

        {/* Movie Tabs Filter */}
        <View style={styles.tabsHeader}>
          <TouchableOpacity
            onPress={() => setSelectedTab('now_showing')}
            style={[styles.tabItem, selectedTab === 'now_showing' && styles.tabItemActive]}
          >
            <Text style={[styles.tabLabel, selectedTab === 'now_showing' && styles.tabLabelActive]}>
              Đang chiếu ({MOVIES.filter((m) => m.status === 'now_showing').length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedTab('coming_soon')}
            style={[styles.tabItem, selectedTab === 'coming_soon' && styles.tabItemActive]}
          >
            <Text style={[styles.tabLabel, selectedTab === 'coming_soon' && styles.tabLabelActive]}>
              Sắp chiếu ({MOVIES.filter((m) => m.status === 'coming_soon').length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Movies List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.moviesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/movie/[id]', params: { id: item.id } })}
              style={styles.movieCard}
              activeOpacity={0.88}
            >
              <View style={styles.posterWrapper}>
                <Image source={{ uri: item.poster }} style={styles.posterImage} />
                <View style={styles.ageBadge}>
                  <Text style={styles.ageText}>{item.ageRating}</Text>
                </View>
                <View style={styles.ratePill}>
                  <MaterialIcons name="star" size={12} color={THEME.colors.primaryContainer} />
                  <Text style={styles.rateText}>{item.rating}</Text>
                </View>
              </View>

              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardGenre} numberOfLines={1}>{item.genre[0]} • {item.duration}p</Text>

              <TouchableOpacity
                onPress={() => router.push({ pathname: '/booking/showtimes', params: { movieId: item.id } })}
                style={styles.cardCta}
                activeOpacity={0.7}
              >
                <Text style={styles.cardCtaText}>Mua vé</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {/* Promotions Banner Carousels */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Ưu đãi rạp hấp dẫn</Text>
          <TouchableOpacity onPress={() => router.push('/promotions')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promoList}>
          {PROMOTIONS.map((promo) => (
            <TouchableOpacity
              key={promo.id}
              onPress={() => router.push('/promotions')}
              style={styles.promoCard}
              activeOpacity={0.85}
            >
              <View style={styles.promoBadge}>
                <Text style={styles.promoBadgeText}>{promo.badge}</Text>
              </View>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoDesc}>{promo.discountDesc}</Text>
              <View style={styles.promoFooter}>
                <Text style={styles.promoCode}>Mã: {promo.code}</Text>
                <Text style={styles.promoValid}>HSD: {promo.validUntil}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: THEME.colors.primaryContainer,
  },
  greeting: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  allScreensBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
    gap: 4,
  },
  allScreensText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: THEME.colors.secondaryContainer,
  },
  scrollBody: {
    paddingBottom: 120,
  },
  cinemaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: THEME.borderRadius.md,
    gap: 8,
  },
  cinemaName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.onSurface,
  },
  heroCard: {
    marginHorizontal: 16,
    height: 200,
    borderRadius: THEME.borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  heroBanner: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 12, 16, 0.65)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
  },
  heroTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  imaxBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 216, 241, 0.2)',
    borderWidth: 1,
    borderColor: THEME.colors.tertiaryContainer,
  },
  imaxText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.tertiaryContainer,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    gap: 3,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.white,
    marginBottom: 2,
  },
  heroGenre: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  heroBtnRow: {
    flexDirection: 'row',
  },
  bookNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.md,
    gap: 6,
  },
  bookNowText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },
  loyaltyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.25)',
    marginBottom: 16,
  },
  loyaltyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tierName: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  pointsBalance: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  loyaltyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  redeemText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  tabsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 14,
  },
  tabItem: {
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: THEME.colors.primaryContainer,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.onSurfaceVariant,
  },
  tabLabelActive: {
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
  },
  moviesList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  movieCard: {
    width: 140,
  },
  posterWrapper: {
    width: 140,
    height: 200,
    borderRadius: THEME.borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    marginBottom: 8,
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  ageBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  ageText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.primary,
  },
  ratePill: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    gap: 3,
  },
  rateText: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.white,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 2,
  },
  cardGenre: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginBottom: 6,
  },
  cardCta: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.4)',
  },
  cardCtaText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  seeAllText: {
    fontSize: 11,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  promoList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  promoCard: {
    width: 240,
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  promoBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 86, 37, 0.2)',
    marginBottom: 6,
  },
  promoBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.secondaryContainer,
  },
  promoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.onSurface,
    marginBottom: 2,
  },
  promoDesc: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginBottom: 8,
    lineHeight: 14,
  },
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingTop: 6,
  },
  promoCode: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  promoValid: {
    fontSize: 9,
    color: THEME.colors.outline,
  },
});
