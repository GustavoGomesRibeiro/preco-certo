import LottieView from "lottie-react-native";
import { FC, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Card as CardUi, H5, Paragraph } from "tamagui";
import { ConditionalRender } from "../conditional-render/conditional-render";

type CardProps = {
  titulo: string;
  descricao: string;
  tipo: "produto" | "receita";
};

export const Card: FC<CardProps> = ({ titulo, descricao, tipo }) => {
  const animation = useRef<LottieView>(null);
  return (
    <CardUi elevate size="$4" bordered>
      <CardUi.Header padded display="flex" flexDirection="row">
        <View>
          <H5>{titulo}</H5>
          <Paragraph theme="alt2">{descricao}</Paragraph>
        </View>

        <View style={styles.containerLottie}>
          <ConditionalRender conditional={tipo === "produto"}>
            <LottieView
              autoPlay
              ref={animation}
              style={styles.lottie}
              source={require("@/src/assets/lottie/mercado.json")}
            />
          </ConditionalRender>
        </View>

        <View style={styles.containerLottie}>
          <ConditionalRender conditional={tipo === "receita"}>
            <LottieView
              autoPlay
              ref={animation}
              style={styles.lottie}
              source={require("@/src/assets/lottie/receitas.json")}
            />
          </ConditionalRender>
        </View>
      </CardUi.Header>
    </CardUi>
  );
};

const styles = StyleSheet.create({
  containerLottie: {},
  lottie: {
    width: 100,
    height: 100,
  },
});
