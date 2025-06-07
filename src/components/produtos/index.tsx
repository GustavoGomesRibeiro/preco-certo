import useFormStore, { Produto } from "@/src/containers/forms/store/form-store";
import { router } from "expo-router";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Card, Image } from "tamagui";
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
    router.navigate("/(stack)/formulario-base");
  };

  const renderActions = () => (
    <SwipeableActions
      onEditar={() => handleEditar()}
      onExcluir={() => removeProduto(produto.id)}
    />
  );

  return (
    <Swipeable renderRightActions={renderActions}>
      <Card style={styles.card}>
        <Image
          source={{ uri: require("@/src/assets/images/mercado.jpg") }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.nome}>{produto.nome}</Text>
          <View style={styles.row}>
            <Text style={styles.quantidade}>{produto.gramas}</Text>
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
    backgroundColor: "#fff",
    borderRadius: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    width: 350,
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
