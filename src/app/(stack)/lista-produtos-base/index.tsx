import Produtos from "@/src/components/produtos";
import useFormStore from "@/src/containers/forms/store/form-store";
import { ContainerWrapper } from "@/src/shared/components";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";

const ListaProdutosBase = () => {
  const { produtos } = useFormStore();
  return (
    <ContainerWrapper>
      <View style={styles.containerProduto}>
        {produtos.map((produto) => (
          <Fragment key={produto.id}>
            <Produtos
              nomeProduto={produto.nome}
              qntGramas={produto.quantidade}
              valorProduto={produto.preco}
            />
          </Fragment>
        ))}
      </View>
    </ContainerWrapper>
  );
};

export default ListaProdutosBase;

const styles = StyleSheet.create({
  containerProduto: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
