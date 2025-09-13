// src/styles/responsive.ts
import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const baseWidth = 375; // iPhone X como referência

/**
 * Escala horizontal proporcional à largura da tela
 */
export function scale(size: number) {
  return (SCREEN_WIDTH / baseWidth) * size;
}

/**
 * Normaliza mantendo proporção mas arredondando pro pixel mais próximo
 */
export function normalize(size: number) {
  return Math.round(PixelRatio.roundToNearestPixel(scale(size)));
}

/**
 * Escala levando em conta acessibilidade (font scaling do sistema)
 */
export function scaleFont(size: number) {
  return size * PixelRatio.getFontScale();
}
