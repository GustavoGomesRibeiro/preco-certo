import { useFormStore } from "@/src/app/(stack)/formulario-base/store/form-store";
import BackButton from "@/src/components/back-button";
import Produtos from "@/src/components/produtos";
import { listarProdutos } from "@/src/database/produtos";
import { ContainerWrapper } from "@/src/shared/components";
import { router } from "expo-router";
import { Fragment, useEffect } from "react";
import { StyleSheet, View } from "react-native";

const ListaProdutosBase = () => {
  const { produtos } = useFormStore();

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <ContainerWrapper>
      <BackButton navigate={() => router.back()} title="Produtos Cadastrados" />
      {/* <QRCodeScanner /> */}
      <View style={styles.containerProduto}>
        {produtos.map((produto) => (
          <Fragment key={produto.id}>
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
    flexWrap: "wrap",
    gap: 10,
  },
});
