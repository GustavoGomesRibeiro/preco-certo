import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Text } from "tamagui";

import { BotaoAdicionar } from "@/src/components";
import BackButton from "@/src/components/back-button";
import SwipeableActions from "@/src/components/swipeable";
import { listarTodasReceitas, removerReceita } from "@/src/database/receitas";
import { ContainerWrapper } from "@/src/shared/components";

const ListaReceitas = () => {
  const [receitas, setReceitas] = useState<any[]>([]);

  const carregarReceitas = async () => {
    const data = await listarTodasReceitas();
    setReceitas(data);
  };

  useEffect(() => {
    const carregarReceitas = async () => {
      const data = await listarTodasReceitas();
      setReceitas(data);
    };

    carregarReceitas();
  }, []);

  const handleExcluir = async (id: number) => {
    await removerReceita(id);
    await carregarReceitas();
  };

  return (
    <ContainerWrapper>
      <BackButton
        title="Receitas Cadastradas"
        navigate={() => router.replace("/(tabs)")}
      />

      {receitas.map((receita) => (
        <Swipeable
          key={receita.id}
          renderRightActions={() => (
            <SwipeableActions
              onEditar={() =>
                router.push({
                  pathname: "/(stack)/receita/[id]",
                  params: { id: receita.id.toString() },
                })
              }
              onExcluir={() => handleExcluir(receita.id)}
            />
          )}
        >
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() =>
              router.push({
                pathname: "/(stack)/receita/[id]",
                params: { id: receita.id.toString() },
              })
            }
          >
            <Text style={styles.recipeTitle}>{receita.nome}</Text>
            <Text style={styles.recipeDate}>
              Criada em: {new Date(receita.data_criacao).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </Swipeable>
      ))}
      <BotaoAdicionar />
    </ContainerWrapper>
  );
};

export default ListaReceitas;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  data: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  recipeCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "column",
    gap: 4,
    height: 100,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  recipeDate: {
    fontSize: 14,
    color: "#8E8E93",
  },
});
