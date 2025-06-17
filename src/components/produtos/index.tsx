import useFormStore, { Produto } from "@/src/containers/forms/store/form-store";
import { removerProduto } from "@/src/database/produtos";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Card } from "tamagui";
import SwipeableActions from "../swipeable";

type ProdutosProps = {
  nomeProduto: string;
  qntGramas: number;
  valorProduto: number;
  produto: Produto;
};

const Produtos: FC<ProdutosProps> = ({
  nomeProduto,
  qntGramas,
  valorProduto,
  produto,
}) => {
  const { removeProduto } = useFormStore();

  const handleEditar = () => {
    useFormStore.getState().setProdutoSelecionado(produto);
    router.push("/(stack)/formulario-base");
  };

  const renderActions = () => (
    <SwipeableActions
      onEditar={() => handleEditar()}
      onExcluir={async () => {
        await removerProduto(produto.id);
        removeProduto(produto.id);
      }}
    />
  );

  return (
    <Swipeable renderRightActions={renderActions}>
      <Card style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.nome}>{produto.nome}</Text>
          <View style={styles.row}>
            <Text style={styles.quantidade}>{produto.gramas} (g)</Text>
            <Text style={styles.preco}>{produto.preco}</Text>
          </View>
        </View>
      </Card>
    </Swipeable>
  );
};

export default Produtos;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
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
    // alignItems: "center",
  },
  image: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 16,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  quantidade: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  preco: {
    fontSize: 18,
    fontWeight: "600",
    color: "#388353",
  },
});
