import { StyleProp, TextStyle } from "react-native";

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 22,
  "2xl": 28,
  "3xl": 34,
};

export type TextProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof fontSizes;
  style?: StyleProp<TextStyle>;
};
