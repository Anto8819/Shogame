import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import type { GameState } from '@/types/game';
import { CARD_PAIRS, MAX_ERRORS } from '@/types/game';

export function useGameState(onGameEnd: () => void) {
  const [gameState, setGameState] = useState<GameState>(() => ({
    cards: [...CARD_PAIRS].sort(() => Math.random() - 0.5),
    flipped: CARD_PAIRS.map((c) => c.id), // Show all cards initially
    matched: [],
    turns: 0,
    errors: 0,
    isLocked: true,
  }));

  // Hide cards after initial reveal
  useEffect(() => {
    const timer = setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        flipped: [],
        isLocked: false,
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check for game completion
  useEffect(() => {
    if (gameState.matched.length === CARD_PAIRS.length) {
      setTimeout(() => {
        Alert.alert(
          '🧘 Namaste!',
          `Game complete!\nTurns: ${gameState.turns}\nErrors: ${gameState.errors}`,
          [{ text: 'Play Again', onPress: onGameEnd }]
        );
      }, 500);
    }
  }, [gameState.matched.length, gameState.turns, gameState.errors, onGameEnd]);

  // Check for game over (too many errors)
  useEffect(() => {
    if (gameState.errors >= MAX_ERRORS) {
      setTimeout(() => {
        Alert.alert(
          '❌ Game Over',
          `You reached ${MAX_ERRORS} errors.\nTry again to find inner peace.`,
          [{ text: 'Try Again', onPress: onGameEnd }]
        );
      }, 500);
    }
  }, [gameState.errors, onGameEnd]);

  const handleCardClick = useCallback((id: number) => {
    setGameState((prev) => {
      // Prevent interaction if locked, already flipped, matched, or two cards flipped
      if (
        prev.isLocked ||
        prev.flipped.includes(id) ||
        prev.matched.includes(id) ||
        prev.flipped.length === 2
      ) {
        return prev;
      }

      const newFlipped = [...prev.flipped, id];

      // If first card, just flip it
      if (newFlipped.length === 1) {
        return { ...prev, flipped: newFlipped };
      }

      // If second card, check for match
      const [firstId, secondId] = newFlipped;
      const firstCard = prev.cards.find((c) => c.id === firstId);
      const secondCard = prev.cards.find((c) => c.id === secondId);

      if (firstCard?.pair === secondCard?.pair) {
        // Match found!
        if (process.env.EXPO_OS === 'ios') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return {
          ...prev,
          matched: [...prev.matched, firstId, secondId],
          flipped: [],
          turns: prev.turns + 1,
        };
      } else {
        // No match - increment errors and schedule flip back
        const newErrors = prev.errors + 1;
        
        if (process.env.EXPO_OS === 'ios') {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        setTimeout(() => {
          setGameState((current) => ({
            ...current,
            flipped: [],
          }));
        }, 600);

        return {
          ...prev,
          flipped: newFlipped,
          turns: prev.turns + 1,
          errors: newErrors,
        };
      }
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      cards: [...CARD_PAIRS].sort(() => Math.random() - 0.5),
      flipped: CARD_PAIRS.map((c) => c.id),
      matched: [],
      turns: 0,
      errors: 0,
      isLocked: true,
    });

    // Hide cards after initial reveal
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        flipped: [],
        isLocked: false,
      }));
    }, 1000);
  }, []);

  return {
    ...gameState,
    handleCardClick,
    resetGame,
  };
}
