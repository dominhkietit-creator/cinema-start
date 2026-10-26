import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MOVIES } from '../../src/data/mockData';

const { width, height } = Dimensions.get('window');
const TRAILER_DURATION = 5; // 5 seconds simulated trailer

export default function MovieDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const movie = MOVIES.find((m) => m.id === id) || MOVIES[0];
  const [isLiked, setIsLiked] = useState(false);

  // Trailer Simulation States
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [trailerFinished, setTrailerFinished] = useState(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);

  // Animations
  const progressAnim = useRef(new Animated.Value(0)).current;
  const zoomAnim = useRef(new Animated.Value(1)).current;
  const soundWaveAnim1 = useRef(new Animated.Value(0.3)).current;
  const soundWaveAnim2 = useRef(new Animated.Value(0.7)).current;
  const soundWaveAnim3 = useRef(new Animated.Value(0.4)).current;
  const intervalRef = useRef(null);

  // Trailer Scenes (3 dramatic cuts over 5 seconds)
  const trailerScenes = [
    {
      caption: 'CINEMA STAR STUDIO PRESENTATION',
      sub: 'Trải nghiệm chuẩn định dạng IMAX Laser 4K',
      image: movie.banner,
      soundIntensity: 'Âm thanh vòm Dolby Atmos kích hoạt',
    },
    {
      caption: 'HÀNH TRÌNH ĐIỆN ẢNH ĐỈNH CAO',
      sub: `${movie.title} - Siêu phẩm kịch tính`,
      image: movie.poster,
      soundIntensity: 'Cao trào hành động 120 FPS',
    },
    {
      caption: 'KHỞI CHIẾU TẠI CỤM RẠP CINEMA STAR',
      sub: 'ĐẶT VÉ NGAY ĐỂ GIỮ CHỖ VIP TRUNG TÂM',
      image: movie.banner,
      soundIntensity: 'Chính thức mở bán vé sớm',
    },
  ];

  // Sound wave animation loop
  useEffect(() => {
    if (showTrailerModal && isPlaying && !isMuted) {
      const waveAnimation = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(soundWaveAnim1, { toValue: 1, duration: 250, useNativeDriver: true }),
            Animated.timing(soundWaveAnim1, { toValue: 0.3, duration: 250, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(soundWaveAnim2, { toValue: 0.2, duration: 200, useNativeDriver: true }),
            Animated.timing(soundWaveAnim2, { toValue: 0.9, duration: 300, useNativeDriver: true }),
          ]),
          Animated.sequence([
            Animated.timing(soundWaveAnim3, { toValue: 0.8, duration: 350, useNativeDriver: true }),
            Animated.timing(soundWaveAnim3, { toValue: 0.2, duration: 250, useNativeDriver: true }),
          ]),
        ])
      );
      waveAnimation.start();
      return () => waveAnimation.stop();
    }
  }, [showTrailerModal, isPlaying, isMuted]);

  // Handle Trailer Timer & Progress
  useEffect(() => {
    if (showTrailerModal && isPlaying && !trailerFinished) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= TRAILER_DURATION) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            setTrailerFinished(true);
            return TRAILER_DURATION;
          }
          // Change scenes across 5 seconds (0-1: scene 0, 2-3: scene 1, 4: scene 2)
          if (next < 2) setCurrentSceneIndex(0);
          else if (next < 4) setCurrentSceneIndex(1);
          else setCurrentSceneIndex(2);

          return next;
        });
      }, 1000);

      // Animate progress bar across 5 seconds
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: (TRAILER_DURATION - currentTime) * 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      // Slow cinematic camera zoom
      Animated.sequence([
        Animated.timing(zoomAnim, {
          toValue: 1.15,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(zoomAnim, {
          toValue: 1.05,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      progressAnim.stopAnimation();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showTrailerModal, isPlaying, trailerFinished]);

  const handleOpenTrailer = () => {
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    setTrailerFinished(false);
    progressAnim.setValue(0);
    zoomAnim.setValue(1);
    setIsPlaying(true);
    setShowTrailerModal(true);
  };

  const handleCloseTrailer = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setShowTrailerModal(false);
  };

  const handleTogglePlayPause = () => {
    if (trailerFinished) {
      handleReplayTrailer();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReplayTrailer = () => {
    setCurrentTime(0);
    setCurrentSceneIndex(0);
    setTrailerFinished(false);
    progressAnim.setValue(0);
    zoomAnim.setValue(1);
    setIsPlaying(true);
  };

  const progressInterpolate = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {/* Banner with Back and Action Buttons */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: movie.banner }} style={styles.bannerImage} />
          <View style={styles.bannerGradient} />

          {/* Navigation Bar Header */}
          <SafeAreaView style={styles.navBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.roundBtn} activeOpacity={0.7}>
              <MaterialIcons name="arrow-back" size={20} color={THEME.colors.white} />
            </TouchableOpacity>

            <View style={styles.rightNavGroup}>
              <TouchableOpacity
                onPress={() => setIsLiked(!isLiked)}
                style={styles.roundBtn}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={isLiked ? 'favorite' : 'favorite-border'}
                  size={20}
                  color={isLiked ? THEME.colors.secondaryContainer : THEME.colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Alert.alert('Chia sẻ', `Đã sao chép liên kết phim "${movie.title}"`)}
                style={styles.roundBtn}
                activeOpacity={0.7}
              >
                <MaterialIcons name="share" size={20} color={THEME.colors.white} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Play Trailer Floating Button with Pulse Label */}
          <View style={styles.playCenterWrapper}>
            <TouchableOpacity
              onPress={handleOpenTrailer}
              style={styles.playTrailerBtn}
              activeOpacity={0.85}
            >
              <MaterialIcons name="play-arrow" size={34} color={THEME.colors.onPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenTrailer} activeOpacity={0.8} style={styles.trailerLabelPill}>
              <MaterialIcons name="videocam" size={14} color={THEME.colors.primaryContainer} />
              <Text style={styles.trailerLabelText}>Xem Trailer Mô Phỏng (5s)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Movie Info Block */}
        <View style={styles.infoContent}>
          <View style={styles.topInfoRow}>
            <View style={styles.posterBox}>
              <Image source={{ uri: movie.poster }} style={styles.posterImg} />
            </View>

            <View style={styles.mainMeta}>
              <View style={styles.agePill}>
                <Text style={styles.agePillText}>{movie.ageRating}</Text>
              </View>
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <Text style={styles.origTitle}>{movie.originalTitle}</Text>

              <View style={styles.ratingRow}>
                <MaterialIcons name="star" size={16} color={THEME.colors.primaryContainer} />
                <Text style={styles.scoreText}>{movie.rating}</Text>
                <Text style={styles.votesText}>({movie.voteCount} đánh giá)</Text>
              </View>

              <Text style={styles.durationText}>
                {movie.duration} phút • Khởi chiếu {movie.releaseDate}
              </Text>
            </View>
          </View>

          {/* Formats Pills */}
          <View style={styles.formatsRow}>
            {movie.formats.map((fmt, idx) => (
              <View key={idx} style={styles.formatChip}>
                <Text style={styles.formatChipText}>{fmt}</Text>
              </View>
            ))}
          </View>

          {/* Genre Badges */}
          <View style={styles.genresRow}>
            {movie.genre.map((g, idx) => (
              <View key={idx} style={styles.genreBadge}>
                <Text style={styles.genreBadgeText}>{g}</Text>
              </View>
            ))}
          </View>

          {/* Synopsis */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Nội dung phim</Text>
            <Text style={styles.descText}>{movie.description}</Text>
          </View>

          {/* Director & Cast */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>Đạo diễn & Diễn viên</Text>
            <Text style={styles.directorText}>
              Đạo diễn: <Text style={styles.boldText}>{movie.director}</Text>
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castList}>
              {movie.cast.map((actor, idx) => (
                <View key={idx} style={styles.castCard}>
                  <View style={styles.castAvatar}>
                    <MaterialIcons name="person" size={24} color={THEME.colors.primary} />
                  </View>
                  <Text style={styles.castName} numberOfLines={2}>{actor}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Booking Button */}
      <SafeAreaView edges={['bottom']} style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/booking/showtimes', params: { movieId: movie.id } })}
          style={styles.bookCtaBtn}
          activeOpacity={0.88}
        >
          <MaterialIcons name="confirmation-number" size={18} color={THEME.colors.onPrimary} />
          <Text style={styles.bookCtaText}>Chọn Suất Chiếu & Mua Vé</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* 5-SECOND SIMULATED TRAILER MODAL */}
      <Modal
        visible={showTrailerModal}
        transparent={false}
        animationType="fade"
        onRequestClose={handleCloseTrailer}
      >
        <View style={styles.trailerModalContainer}>
          {/* Cinema Screen Frame */}
          <View style={styles.trailerVideoFrame}>
            {/* Animated Cinematic Scene Background */}
            <Animated.Image
              source={{ uri: trailerScenes[currentSceneIndex]?.image }}
              style={[
                styles.trailerSceneImage,
                { transform: [{ scale: zoomAnim }] },
              ]}
              resizeMode="cover"
            />
            <View style={styles.trailerDarkVignette} />

            {/* Top Video Header */}
            <SafeAreaView style={styles.trailerTopControls}>
              <View style={styles.trailerHeaderLeft}>
                <View style={styles.liveImaxBadge}>
                  <View style={styles.liveRedDot} />
                  <Text style={styles.liveImaxText}>TRAILER 5S • IMAX 4K</Text>
                </View>
                <Text style={styles.trailerMovieTitle} numberOfLines={1}>
                  {movie.title}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleCloseTrailer}
                style={styles.trailerCloseBtn}
                activeOpacity={0.8}
              >
                <MaterialIcons name="close" size={22} color={THEME.colors.white} />
              </TouchableOpacity>
            </SafeAreaView>

            {/* Middle Cinematic Subtitle & Dramatic Scene Cuts */}
            {!trailerFinished ? (
              <View style={styles.trailerCenterOverlay}>
                <View style={styles.trailerScenePill}>
                  <Text style={styles.trailerSceneCaption}>
                    {trailerScenes[currentSceneIndex]?.caption}
                  </Text>
                </View>
                <Text style={styles.trailerSceneSub}>
                  {trailerScenes[currentSceneIndex]?.sub}
                </Text>

                {/* Animated Equalizer Sound Bars */}
                <View style={styles.equalizerRow}>
                  <Animated.View
                    style={[
                      styles.eqBar,
                      { transform: [{ scaleY: isMuted ? 0.2 : soundWaveAnim1 }] },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.eqBar,
                      styles.eqBarAmber,
                      { transform: [{ scaleY: isMuted ? 0.2 : soundWaveAnim2 }] },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.eqBar,
                      { transform: [{ scaleY: isMuted ? 0.2 : soundWaveAnim3 }] },
                    ]}
                  />
                  <Text style={styles.eqLabel}>
                    {isMuted ? 'Đã tắt tiếng' : trailerScenes[currentSceneIndex]?.soundIntensity}
                  </Text>
                </View>
              </View>
            ) : (
              /* End Card after 5s trailer finishes */
              <View style={styles.trailerEndCard}>
                <View style={styles.endCardIconBox}>
                  <MaterialIcons name="stars" size={36} color={THEME.colors.primaryContainer} />
                </View>
                <Text style={styles.endCardTitle}>Khởi Chiếu Tại Rạp Cinema Star</Text>
                <Text style={styles.endCardDesc}>
                  Đặt vé sớm để nhận ưu đãi 50 StarPoints + chọn hàng ghế VIP trung tâm!
                </Text>

                <View style={styles.endCardActionsRow}>
                  <TouchableOpacity
                    onPress={handleReplayTrailer}
                    style={styles.replayBtn}
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="replay" size={18} color={THEME.colors.primary} />
                    <Text style={styles.replayBtnText}>Xem lại (5s)</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      handleCloseTrailer();
                      router.push({ pathname: '/booking/showtimes', params: { movieId: movie.id } });
                    }}
                    style={styles.endCardBookBtn}
                    activeOpacity={0.88}
                  >
                    <MaterialIcons name="confirmation-number" size={18} color={THEME.colors.onPrimary} />
                    <Text style={styles.endCardBookText}>Đặt Vé Ngay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Bottom Playback HUD Bar */}
            <View style={styles.trailerBottomHud}>
              {/* Progress Line */}
              <View style={styles.progressBarBg}>
                <Animated.View style={[styles.progressBarActive, { width: progressInterpolate }]} />
              </View>

              <View style={styles.hudControlsRow}>
                {/* Play / Pause Toggle */}
                <TouchableOpacity
                  onPress={handleTogglePlayPause}
                  style={styles.hudPlayBtn}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name={trailerFinished ? 'replay' : isPlaying ? 'pause' : 'play-arrow'}
                    size={24}
                    color={THEME.colors.white}
                  />
                </TouchableOpacity>

                {/* Time Indicator */}
                <Text style={styles.hudTimeText}>
                  00:0{currentTime} / 00:0{TRAILER_DURATION}
                </Text>

                {/* Sound Mute Toggle */}
                <TouchableOpacity
                  onPress={() => setIsMuted(!isMuted)}
                  style={styles.hudMuteBtn}
                  activeOpacity={0.7}
                >
                  <MaterialIcons
                    name={isMuted ? 'volume-off' : 'volume-up'}
                    size={20}
                    color={isMuted ? THEME.colors.outline : THEME.colors.primaryContainer}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollBody: {
    paddingBottom: 90,
  },
  bannerContainer: {
    width: '100%',
    height: 260,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 19, 23, 0.55)',
  },
  navBar: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    zIndex: 10,
  },
  rightNavGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  roundBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(18, 19, 23, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  playCenterWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    top: '36%',
    alignItems: 'center',
    gap: 8,
  },
  playTrailerBtn: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: THEME.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 8,
  },
  trailerLabelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 19, 23, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.4)',
    gap: 5,
  },
  trailerLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  infoContent: {
    paddingHorizontal: 16,
    marginTop: -26,
  },
  topInfoRow: {
    flexDirection: 'row',
    gap: 14,
  },
  posterBox: {
    width: 100,
    height: 145,
    borderRadius: THEME.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  posterImg: {
    width: '100%',
    height: '100%',
  },
  mainMeta: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  agePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: THEME.colors.secondaryContainer,
    marginBottom: 4,
  },
  agePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.white,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    lineHeight: 20,
  },
  origTitle: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  votesText: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  durationText: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  formatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  formatChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.full,
    backgroundColor: 'rgba(0, 216, 241, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 216, 241, 0.4)',
  },
  formatChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: THEME.colors.tertiary,
  },
  genresRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },
  genreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: THEME.colors.surfaceContainerHigh,
  },
  genreBadgeText: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  sectionBlock: {
    marginTop: 18,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  descText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
    lineHeight: 18,
  },
  directorText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
  },
  boldText: {
    color: THEME.colors.onSurface,
    fontWeight: '700',
  },
  castList: {
    gap: 12,
    paddingTop: 8,
  },
  castCard: {
    width: 70,
    alignItems: 'center',
  },
  castAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: THEME.colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  castName: {
    fontSize: 10,
    color: THEME.colors.onSurface,
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18, 19, 23, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  bookCtaBtn: {
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
  bookCtaText: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  /* SIMULATED TRAILER MODAL STYLES */
  trailerModalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trailerVideoFrame: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  trailerSceneImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  trailerDarkVignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  trailerTopControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 12,
    zIndex: 10,
  },
  trailerHeaderLeft: {
    gap: 4,
    maxWidth: width * 0.75,
  },
  liveImaxBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 216, 241, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    gap: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: THEME.colors.tertiaryContainer,
  },
  liveRedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ff3b30',
  },
  liveImaxText: {
    fontSize: 9,
    fontWeight: '800',
    color: THEME.colors.tertiary,
    letterSpacing: 0.8,
  },
  trailerMovieTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.white,
  },
  trailerCloseBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  trailerCenterOverlay: {
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 8,
  },
  trailerScenePill: {
    backgroundColor: 'rgba(255, 184, 0, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
    borderWidth: 1,
    borderColor: THEME.colors.primaryContainer,
  },
  trailerSceneCaption: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  trailerSceneSub: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  equalizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.borderRadius.full,
  },
  eqBar: {
    width: 3,
    height: 16,
    backgroundColor: THEME.colors.tertiaryContainer,
    borderRadius: 1.5,
  },
  eqBarAmber: {
    backgroundColor: THEME.colors.primaryContainer,
  },
  eqLabel: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
    marginLeft: 6,
  },
  trailerEndCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(18, 19, 23, 0.92)',
    marginHorizontal: 20,
    padding: 24,
    borderRadius: THEME.borderRadius.xl,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 184, 0, 0.4)',
    shadowColor: THEME.colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  endCardIconBox: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255, 184, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  endCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  endCardDesc: {
    fontSize: 11,
    color: THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 18,
  },
  endCardActionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  replayBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.surfaceContainerHigh,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 184, 0, 0.3)',
  },
  replayBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
  },
  endCardBookBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colors.primaryContainer,
    paddingVertical: 12,
    borderRadius: THEME.borderRadius.md,
    gap: 6,
  },
  endCardBookText: {
    fontSize: 12,
    fontWeight: '800',
    color: THEME.colors.onPrimary,
    textTransform: 'uppercase',
  },
  trailerBottomHud: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingTop: 10,
  },
  progressBarBg: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarActive: {
    height: '100%',
    backgroundColor: THEME.colors.primaryContainer,
  },
  hudControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hudPlayBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hudTimeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.white,
    letterSpacing: 0.8,
  },
  hudMuteBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
