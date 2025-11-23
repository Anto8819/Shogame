import { useState } from 'react';
import { StyleSheet } from 'react-native';

import GameBoard from '@/components/game/game-board';
import GameHeader from '@/components/game/game-header';
import GameModeSelection from '@/components/game/game-mode-selection';
import { ThemedView } from '@/components/themed-view';
import { useGameState } from '@/hooks/use-game-state';
import { useGameTimer } from '@/hooks/use-game-timer';
import type { GameMode } from '@/types/game';

export default function GameScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const [, setGameMode] = useState<GameMode | null>(null);

  const handleGameEnd = () => {
    setGameStarted(false);
    setGameMode(null);
    resetGame();
    resetTimer();
  };

  const { cards, flipped, matched, turns, errors, handleCardClick, resetGame } =
    useGameState(handleGameEnd);
  
  const { time, resetTimer } = useGameTimer(gameStarted);

  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameStarted(true);
    resetGame();
    resetTimer();
  };

  return (
    <ThemedView style={styles.container}>
      {gameStarted ? (
        <>
          <GameHeader errors={errors} turns={turns} time={time} />
          <GameBoard
            cards={cards}
            flipped={flipped}
            matched={matched}
            onCardClick={handleCardClick}
          />
        </>
      ) : (
        <GameModeSelection onSelectMode={handleStartGame} />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
