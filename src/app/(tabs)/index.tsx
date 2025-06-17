import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { BotaoAdicionar } from "@/src/components";
import { Card } from "@/src/components/card/card";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { ContainerWrapper } from "@/src/shared/components";

export default function HomeScreen() {
  return (
    <ContainerWrapper>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" darkColor="#000">
          Tela inicial
        </ThemedText>
      </ThemedView>

      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => router.navigate("/(stack)/lista-receitas")}
        >
          <Card
            tipo="receita"
            titulo="Receitas Cadastradas"
            descricao="Receitas cadastradas"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/calculadora")}
        >
          <Card
            tipo="calculadora"
            titulo="Precificação"
            descricao="Calcule o preço de venda do seu produto"
          />
        </TouchableOpacity>
      </View>
      <BotaoAdicionar />
    </ContainerWrapper>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  containerButton: {
    marginTop: 20,
  },
});
