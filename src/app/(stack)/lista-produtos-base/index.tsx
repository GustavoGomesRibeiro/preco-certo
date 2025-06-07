import Produtos from "@/src/components/produtos";
import useFormStore from "@/src/containers/forms/store/form-store";
import { listarProdutos } from "@/src/database/produtos";
import { ContainerWrapper } from "@/src/shared/components";
import { Fragment, useEffect } from "react";
import { StyleSheet, View } from "react-native";

const ListaProdutosBase = () => {
  const { produtos } = useFormStore();

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <ContainerWrapper>
      <View style={styles.containerProduto}>
        {produtos.map((produto) => (
          <Fragment key={produto.id}>
            {/* <TouchableOpacity
              onPress={() => {
                useFormStore.getState().setProdutoSelecionado(produto);
                router.navigate("/(stack)/formulario-base");
              }}
            >
              <Text style={{ color: "blue", marginTop: 4 }}>Editar</Text>
            </TouchableOpacity> */}
            <Produtos
              produto={produto}
              nomeProduto={produto.nome}
              qntGramas={produto.gramas}
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
    // flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
