import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MAX_ERRORS } from '@/types/game';
import { StyleSheet } from 'react-native';

interface GameHeaderProps {
  errors: number;
  turns: number;
  time: number;
}

export default function GameHeader({ errors, turns, time }: GameHeaderProps) {
  const colorScheme = useColorScheme() ?? 'light';

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const errorColor = errors >= MAX_ERRORS 
    ? Colors[colorScheme].error 
    : Colors[colorScheme].text;

  return (
    <ThemedView 
      lightColor={Colors.light.primary + '20'} 
      darkColor={Colors.dark.primary + '30'}
      style={styles.container}
    >
      <ThemedView style={styles.content}>
        {/* Left: Stats */}
        <ThemedView style={styles.statsContainer}>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statLabel}>ERRORS</ThemedText>
            <ThemedText style={[styles.statValue, { color: errorColor }]}>
              {errors} / {MAX_ERRORS}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statLabel}>TURNS</ThemedText>
            <ThemedText style={styles.statValue}>{turns}</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Center: Timer */}
        <ThemedView style={styles.timerContainer}>
          <ThemedText 
            style={styles.timerText}
            lightColor={Colors.light.accent}
            darkColor={Colors.dark.accent}
          >
            {formatTime(time)}
          </ThemedText>
          <ThemedText style={styles.timerLabel}>TIME</ThemedText>
        </ThemedView>

        {/* Right: Spacer for balance */}
        <ThemedView style={styles.statsContainer} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
    flex: 1,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
    marginTop: 4,
  },
});
