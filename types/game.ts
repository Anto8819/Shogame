export type GameMode = 'SOLO' | 'WITH_A_FRIEND' | 'AGAINST_CONSOLE';

export interface Card {
  id: number;
  word: string;
  meaning: string;
  pair: number;
}

export interface GameState {
  cards: Card[];
  flipped: number[];
  matched: number[];
  turns: number;
  errors: number;
  isLocked: boolean;
}

// Sanskrit yoga terms and their English meanings
export const CARD_PAIRS: Card[] = [
  { id: 1, word: 'ॐ', meaning: 'Om', pair: 1 },
  { id: 2, word: 'शांति', meaning: 'Shanti', pair: 2 },
  { id: 3, word: 'चक्र', meaning: 'Chakra', pair: 3 },
  { id: 4, word: 'आसन', meaning: 'Asana', pair: 4 },
  { id: 5, word: 'प्राणायाम', meaning: 'Pranayama', pair: 5 },
  { id: 6, word: 'नमस्ते', meaning: 'Namaste', pair: 6 },
  { id: 7, word: 'ॐ', meaning: 'Om', pair: 1 },
  { id: 8, word: 'शांति', meaning: 'Shanti', pair: 2 },
  { id: 9, word: 'चक्र', meaning: 'Chakra', pair: 3 },
  { id: 10, word: 'आसन', meaning: 'Asana', pair: 4 },
  { id: 11, word: 'प्राणायाम', meaning: 'Pranayama', pair: 5 },
  { id: 12, word: 'नमस्ते', meaning: 'Namaste', pair: 6 },
];

export const MAX_ERRORS = 3;
export const TOTAL_PAIRS = 6;
