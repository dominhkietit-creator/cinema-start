import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { THEME } from '../../src/constants/theme';
import { MY_TICKETS } from '../../src/data/mockData';

export default function MyTicketsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'

  const filteredTickets = MY_TICKETS.filter((t) =>
    activeTab === 'upcoming' ? t.status === 'CONFIRMED' : t.status === 'COMPLETED'
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Vé Của Tôi</Text>
        <Text style={styles.headerSub}>Quản lý mã QR vào rạp và lịch sử xem phim</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          onPress={() => setActiveTab('upcoming')}
          style={[styles.tabBtn, activeTab === 'upcoming' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'upcoming' && styles.tabBtnTextActive]}>
            Vé sắp xem (1)
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab('past')}
          style={[styles.tabBtn, activeTab === 'past' && styles.tabBtnActive]}
          activeOpacity={0.8}
        >
          <Text style={[styles.tabBtnText, activeTab === 'past' && styles.tabBtnTextActive]}>
            Lịch sử xem (1)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ticket Cards List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
        {filteredTickets.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            onPress={() =>
              router.push({
                pathname: '/booking/ticket/[id]',
                params: {
                  id: ticket.id,
                  movieTitle: ticket.movieTitle,
                  seats: ticket.seats.join(', '),
                  time: ticket.time.split(' - ')[0],
                  format: ticket.format,
                },
              })
            }
            style={styles.ticketCard}
            activeOpacity={0.9}
          >
            <View style={styles.cardTop}>
              <Image source={{ uri: ticket.poster }} style={styles.posterImg} />
              <View style={styles.ticketMeta}>
                <View style={styles.badgeRow}>
                  <View style={styles.formatBadge}>
                    <Text style={styles.formatBadgeText}>{ticket.format}</Text>
                  </View>
                  <View style={ticket.status === 'CONFIRMED' ? styles.statusBadgeActive : styles.statusBadgePast}>
                    <Text style={ticket.status === 'CONFIRMED' ? styles.statusTextActive : styles.statusTextPast}>
                      {ticket.status === 'CONFIRMED' ? 'SẴN SÀNG VÀO RẠP' : 'ĐÃ XEM'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.movieTitle} numberOfLines={1}>{ticket.movieTitle}</Text>
                <Text style={styles.cinemaName}>{ticket.cinemaName}</Text>
                <Text style={styles.timeInfo}>{ticket.date} • {ticket.time}</Text>

                <View style={styles.seatsRow}>
                  <Text style={styles.seatLabel}>Ghế:</Text>
                  <Text style={styles.seatCodes}>{ticket.seats.join(', ')} ({ticket.seatType})</Text>
                </View>
              </View>
            </View>

            {/* Perforated Divider */}
            <View style={styles.perforatedLine}>
              <View style={styles.notchLeft} />
              <View style={styles.dashedBar} />
              <View style={styles.notchRight} />
            </View>

            {/* Ticket Bottom QR Prompt */}
            <View style={styles.cardBottom}>
              <View style={styles.codeRow}>
                <Ionicons name="qr-code-outline" size={20} color={THEME.colors.primaryContainer} />
                <Text style={styles.codeText}>Mã vé: {ticket.id}</Text>
              </View>

              <View style={styles.viewQrBtn}>
                <Text style={styles.viewQrText}>Chạm để xem QR</Text>
                <MaterialIcons name="chevron-right" size={16} color={THEME.colors.primaryContainer} />
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
  topHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
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
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.surfaceContainerLow,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: THEME.borderRadius.md,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabBtnActive: {
    backgroundColor: THEME.colors.surfaceContainerHigh,
  },
  tabBtnText: {
    fontSize: 12,
    color: THEME.colors.onSurfaceVariant,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    gap: 14,
  },
  ticketCard: {
    backgroundColor: THEME.colors.surfaceContainerLow,
    borderRadius: THEME.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  cardTop: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  posterImg: {
    width: 80,
    height: 115,
    borderRadius: THEME.borderRadius.md,
  },
  ticketMeta: {
    flex: 1,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formatBadge: {
    backgroundColor: 'rgba(0, 216, 241, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  formatBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.tertiary,
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusTextActive: {
    fontSize: 8,
    fontWeight: '800',
    color: '#4CAF50',
  },
  statusBadgePast: {
    backgroundColor: THEME.colors.surfaceContainerHighest,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusTextPast: {
    fontSize: 8,
    fontWeight: '800',
    color: THEME.colors.outline,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.onSurface,
    marginTop: 4,
  },
  cinemaName: {
    fontSize: 11,
    color: THEME.colors.primary,
    fontWeight: '600',
  },
  timeInfo: {
    fontSize: 10,
    color: THEME.colors.onSurfaceVariant,
  },
  seatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seatLabel: {
    fontSize: 10,
    color: THEME.colors.outline,
  },
  seatCodes: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primaryContainer,
  },
  perforatedLine: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    position: 'relative',
  },
  notchLeft: {
    position: 'absolute',
    left: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: THEME.colors.background,
  },
  notchRight: {
    position: 'absolute',
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: THEME.colors.background,
  },
  dashedBar: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: 'rgba(158, 143, 120, 0.3)',
    borderStyle: 'dashed',
    marginHorizontal: 16,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(31, 31, 36, 0.5)',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.onSurface,
  },
  viewQrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewQrText: {
    fontSize: 11,
    color: THEME.colors.primaryContainer,
    fontWeight: '700',
  },
});
