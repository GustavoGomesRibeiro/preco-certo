/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { TokenColors } from "@/src/shared/constants/token-colors";
import { useColorScheme } from "nativewind";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof TokenColors.light & keyof typeof TokenColors.dark
) {
  const { colorScheme = "light" } = useColorScheme() ?? {};
  const colorFromProps = props[colorScheme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return TokenColors[colorScheme][colorName];
  }
}
