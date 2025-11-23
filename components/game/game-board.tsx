import { ScrollView as RNScrollView, StyleSheet } from 'react-native';

import MemoryCard from '@/components/game/memory-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { TOTAL_PAIRS, type Card } from '@/types/game';

interface GameBoardProps {
  cards: Card[];
  flipped: number[];
  matched: number[];
  onCardClick: (id: number) => void;
}

export default function GameBoard({ cards, flipped, matched, onCardClick }: GameBoardProps) {
  return (
    <RNScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ThemedView style={styles.container}>
        {/* Game title */}
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>Memory Card Game</ThemedText>
          <ThemedText style={styles.subtitle}>
            Find matching pairs • 3 Opportunities
          </ThemedText>
        </ThemedView>

        {/* Cards Grid (2x6 or 3x4 depending on screen size) */}
        <ThemedView style={styles.gridContainer}>
          {cards.map((card) => (
            <ThemedView key={card.id} style={styles.cardWrapper}>
              <MemoryCard
                card={card}
                isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
                isMatched={matched.includes(card.id)}
                onPress={() => onCardClick(card.id)}
              />
            </ThemedView>
          ))}
        </ThemedView>

        {/* Progress */}
        <ThemedView style={styles.progressContainer}>
          <ThemedView
            style={styles.progressBox}
            lightColor={Colors.light.primary + '20'}
            darkColor={Colors.dark.primary + '30'}
          >
            <ThemedText style={styles.progressLabel}>Pairs found</ThemedText>
            <ThemedText
              style={styles.progressValue}
              lightColor={Colors.light.accent}
              darkColor={Colors.dark.accent}
            >
              {matched.length / 2} / {TOTAL_PAIRS}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </RNScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 600,
    gap: 16,
    marginBottom: 32,
  },
  cardWrapper: {
    width: '28%',
    minWidth: 100,
    maxWidth: 150,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBox: {
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
