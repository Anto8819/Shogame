import * as Haptics from 'expo-haptics';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { GameMode } from '@/types/game';

interface GameModeSelectionProps {
  onSelectMode: (mode: GameMode) => void;
}

interface ModeButton {
  mode: GameMode;
  emoji: string;
  title: string;
  description: string;
  gradient: 'accent' | 'secondary' | 'primary';
}

const GAME_MODES: ModeButton[] = [
  {
    mode: 'SOLO',
    emoji: '🧘',
    title: 'SOLO',
    description: 'Play at your own pace',
    gradient: 'accent',
  },
  {
    mode: 'WITH_A_FRIEND',
    emoji: '🤝',
    title: 'WITH A FRIEND',
    description: 'Cooperative gameplay',
    gradient: 'secondary',
  },
  {
    mode: 'AGAINST_CONSOLE',
    emoji: '🤖',
    title: 'AGAINST THE CONSOLE',
    description: 'Challenge the AI',
    gradient: 'primary',
  },
];

export default function GameModeSelection({ onSelectMode }: GameModeSelectionProps) {
  const colorScheme = useColorScheme() ?? 'light';

  const handlePress = (mode: GameMode) => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onSelectMode(mode);
  };

  const getGradientColor = (gradient: string): string => {
    const colors = Colors[colorScheme];
    switch (gradient) {
      case 'accent':
        return colors.accent;
      case 'secondary':
        return colors.secondary;
      case 'primary':
        return colors.primary;
      default:
        return colors.primary;
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Title Section */}
      <ThemedView style={styles.titleSection}>
        <ThemedText style={styles.title}>Yoga Memory</ThemedText>
        <ThemedText style={styles.subtitle}>
          Find your inner peace through mindful memory
        </ThemedText>
      </ThemedView>

      {/* Mode Selection */}
      <ThemedView style={styles.modesContainer}>
        <ThemedView style={styles.modesHeader}>
          <ThemedText style={styles.modesTitle}>Choose Your Game Mode</ThemedText>
          <ThemedText style={styles.modesSubtitle}>
            Select how you&apos;d like to play
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonsGrid}>
          {GAME_MODES.map((gameMode) => (
            <TouchableOpacity
              key={gameMode.mode}
              onPress={() => handlePress(gameMode.mode)}
              activeOpacity={0.8}
              style={[
                styles.modeButton,
                { backgroundColor: getGradientColor(gameMode.gradient) },
              ]}
            >
              <ThemedText style={styles.emoji}>{gameMode.emoji}</ThemedText>
              <ThemedText
                style={styles.modeTitle}
                lightColor="#fff"
                darkColor="#fff"
              >
                {gameMode.title}
              </ThemedText>
              <ThemedText
                style={styles.modeDescription}
                lightColor="rgba(255,255,255,0.8)"
                darkColor="rgba(255,255,255,0.8)"
              >
                {gameMode.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          🙏 Find matching Sanskrit pairs to complete your meditation journey
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  modesContainer: {
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  modesHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  modesTitle: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 8,
  },
  modesSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  modeButton: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 200,
    flex: 1,
    maxWidth: 250,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  emoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  modeDescription: {
    fontSize: 13,
    textAlign: 'center',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
  },
});
