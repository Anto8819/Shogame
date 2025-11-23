import * as Haptics from 'expo-haptics';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Card } from '@/types/game';

interface MemoryCardProps {
  card: Card;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
}

export default function MemoryCard({ card, isFlipped, isMatched, onPress }: MemoryCardProps) {
  const colorScheme = useColorScheme() ?? 'light';

  const handlePress = () => {
    if (!isMatched && process.env.EXPO_OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  // Animated flip rotation
  const animatedStyle = useAnimatedStyle(() => {
    const rotation = withTiming(isFlipped ? 180 : 0, { duration: 300 });
    return {
      transform: [{ rotateY: `${rotation}deg` }],
    };
  });

  // Front face opacity (visible when flipped)
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotation = isFlipped ? 180 : 0;
    const opacity = interpolate(rotation, [90, 180], [1, 1]);
    return { opacity };
  });

  // Back face opacity (visible when not flipped)
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotation = isFlipped ? 180 : 0;
    const opacity = interpolate(rotation, [0, 90], [1, 0]);
    return { opacity };
  });

  const cardBackgroundColor = colorScheme === 'light' 
    ? Colors.light.secondary 
    : Colors.dark.secondary;
  
  const cardFrontColor = colorScheme === 'light'
    ? Colors.light.card
    : Colors.dark.card;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={isMatched}
      activeOpacity={0.8}
      style={[styles.container, isMatched && styles.matched]}
    >
      <Animated.View style={[styles.cardInner, animatedStyle]}>
        {/* Card Back (shows when not flipped) */}
        <Animated.View
          style={[
            styles.cardFace,
            styles.cardBack,
            { backgroundColor: cardBackgroundColor },
            backAnimatedStyle,
          ]}
        >
          <ThemedText style={styles.omSymbol}>ॐ</ThemedText>
        </Animated.View>

        {/* Card Front (shows when flipped) */}
        <Animated.View
          style={[
            styles.cardFace,
            styles.cardFront,
            { backgroundColor: cardFrontColor },
            frontAnimatedStyle,
          ]}
        >
          <ThemedText style={styles.word}>{card.word}</ThemedText>
          <ThemedText style={styles.meaning}>{card.meaning}</ThemedText>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  matched: {
    opacity: 0.5,
  },
  cardInner: {
    flex: 1,
    position: 'relative',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    transform: [{ rotateY: '0deg' }],
  },
  cardFront: {
    transform: [{ rotateY: '180deg' }],
  },
  omSymbol: {
    fontSize: 48,
    opacity: 0.4,
  },
  word: {
    fontSize: 32,
    fontWeight: '300',
    marginBottom: 8,
  },
  meaning: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.7,
  },
});
