import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MOVIES } from '../../src/data/mockData';

const GENRES = ['Tất cả', 'Hành Động', 'Khoa Học Viễn Tưởng', 'Hoạt Hình', 'Hài Hước', 'Tâm Lý'];

export default function SearchScreen() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');

  const filteredMovies = MOVIES.filter((m) => {
    const matchKeyword =
      m.title.toLowerCase().includes(keyword.toLowerCase()) ||
      m.originalTitle.toLowerCase().includes(keyword.toLowerCase());
    const matchGenre =
      selectedGenre === 'Tất cả' || m.genre.includes(selectedGenre);
    return matchKeyword && matchGenre;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header Input */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <MaterialIcons name="search" size={20} color={THEME.colors.outline} style={styles.searchIcon} />
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Tìm kiếm phim, diễn viên, đạo diễn..."
            placeholderTextColor="rgba(158, 143, 120, 0.6)"
            style={styles.input}
          />
          {keyword !== '' && (
            <TouchableOpacity onPress={() => setKeyword('')} style={styles.clearBtn}>
              <MaterialIcons name="cancel" size={18} color={THEME.colors.outline} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Genre Filter Horizontal Scroll */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.genreList}>
          {GENRES.map((g, idx) => {
            const isSelected = selectedGenre === g;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedGenre(g)}
                style={[styles.genreChip, isSelected && styles.genreChipActive]}
                activeOpacity={0.7}
              >
                <Text style={[styles.genreText, isSelected && styles.genreTextActive]}>{g}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Movie Results List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.resultsList}>
        <Text style={styles.resultsCount}>Tìm thấy {filteredMovies.length} bộ phim</Text>

        {filteredMovies.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            onPress={() => router.push({ pathname: '/movie/[id]', params: { id: movie.id } })}
            style={styles.movieRowCard}
            activeOpacity={0.85}
          >
            <Image source={{ uri: movie.poster }} style={styles.rowPoster} />

            <View style={styles.rowInfo}>
              <View style={styles.rowTitleRow}>
                <Text style={styles.rowTitle} numberOfLines={1}>{movie.title}</Text>
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{movie.ageRating}</Text>
                </View>
              </View>

              <Text style={styles.rowOrigTitle} numberOfLines={1}>{movie.originalTitle}</Text>
              <Text style={styles.rowMeta}>{movie.genre.slice(0, 2).join(', ')} • {movie.duration} phút</Text>

              <View style={styles.rowRating}>
                <MaterialIcons name="star" size={14} color={THEME.colors.primaryContainer} />
                <Text style={styles.rowScore}>{movie.rating}</Text>
                <Text style={styles.rowVotes}>({movie.voteCount})</Text>
              </View>

              <View style={styles.cardBtnRow}>
                <TouchableOpacity
                  onPress={() => router.push({ pathname: '/booking/showtimes', params: { movieId: movie.id } })}
                  style={styles.bookSmallBtn}
                >
                  <Text style={styles.bookSmallBtnText}>Đặt vé ngay</Text>
                </TouchableOpacity>
              </View>
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
  searchHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: THEME.colors.onSurface,
    fontSize: 13,
  },
  clearBtn: {
    padding: 4,
  },
  filterSection: {
    paddingVertical: 6,
  },
  genreList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  genreChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  genreChipActive: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    borderColor: THEME.colors.primaryContainer,
  },
  genreText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.onSurfaceVariant,
  },
  genreTextActive: {
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
  },
  resultsList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 95,
    gap: 12,
  },
  resultsCount: {
    fontSize: 11,
    color: THEME.colors.outline,
    marginBottom: 4,
  },
  movieRowCard: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.lg,
    padding: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  rowPoster: {
    width: 76,
    height: 110,
    borderRadius: THEME.borderRadius.md,
  },
  rowInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  rowTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  ageBadge: {
    backgroundColor: THEME.colors.secondaryContainer,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  ageBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.white,
  },
  rowOrigTitle: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  rowMeta: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  rowRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  rowScore: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.primaryContainer,
  },
  rowVotes: {
    fontSize: 9,
    color: THEME.colors.outline,
  },
  cardBtnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bookSmallBtn: {
    backgroundColor: THEME.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
  },
  bookSmallBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
  },
});
