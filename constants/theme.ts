/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Yoga-themed color palette adapted from Next.js design
const tintColorLight = '#e89747'; // accent color - warm orange
const tintColorDark = '#e89747';

export const Colors = {
  light: {
    text: '#1a1427', // Deep indigo foreground
    background: '#f5f3f7', // Light warm background
    tint: tintColorLight,
    icon: '#6b5b7a', // Muted purple-grey
    tabIconDefault: '#9b8fa8',
    tabIconSelected: tintColorLight,
    // Game-specific colors
    card: '#e8e5ec', // Card background
    cardForeground: '#1a1427',
    primary: '#3d2d54', // Deep purple
    primaryForeground: '#f5f3f7',
    secondary: '#c4b8d3', // Light lavender
    secondaryForeground: '#1a1427',
    accent: '#e89747', // Warm orange
    accentForeground: '#1a1427',
    muted: '#a89bb5',
    mutedForeground: '#5d4d6b',
    border: '#3d2d54',
    error: '#dc5545',
  },
  dark: {
    text: '#ede9f1', // Light foreground
    background: '#1a1427', // Deep indigo background
    tint: tintColorDark,
    icon: '#b3a8c0',
    tabIconDefault: '#8a7d98',
    tabIconSelected: tintColorDark,
    // Game-specific colors
    card: '#2b2138', // Dark card
    cardForeground: '#ede9f1',
    primary: '#5b4677', // Medium purple
    primaryForeground: '#1a1427',
    secondary: '#8b75a3', // Purple-blue
    secondaryForeground: '#1a1427',
    accent: '#e89747', // Warm orange
    accentForeground: '#1a1427',
    muted: '#5d4d6b',
    mutedForeground: '#b3a8c0',
    border: '#3d2d54',
    error: '#c44536',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
