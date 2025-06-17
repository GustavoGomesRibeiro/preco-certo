import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import BackButton from "@/src/components/back-button";
import Produtos from "@/src/components/produtos";
import { listarReceitasComIngredientes } from "@/src/database/receitas";
import { ContainerWrapper } from "@/src/shared/components";
import { Text } from "tamagui";

const DetalhesReceita = () => {
  const { id } = useLocalSearchParams();
  const [dados, setDados] = useState<{
    receitaNome: string;
    produtos: any[];
  } | null>(null);

  useEffect(() => {
    const carregarProdutos = async () => {
      const receitas = await listarReceitasComIngredientes();

      const receitaSelecionada = receitas.filter((r) => r.receitaId == id);

      if (receitaSelecionada.length > 0) {
        const nome = receitaSelecionada[0].receitaNome;
        const produtos = receitaSelecionada.map((r) => ({
          id: r.produtoId,
          nome: r.produtoNome,
          gramas: r.gramas,
          preco: r.preco,
          quantidadeUsada: r.quantidade_g,
        }));

        setDados({ receitaNome: nome, produtos });
      }
    };

    carregarProdutos();
  }, [id]);

  if (!dados) return null;

  return (
    <ContainerWrapper>
      <BackButton
        title={`Receita: ${dados.receitaNome}`}
        navigate={() => router.back()}
      />

      {dados.produtos.map((produto) => (
        <Produtos
          key={produto.id}
          produto={produto}
          nomeProduto={produto.nome}
          qntGramas={produto.gramas}
          valorProduto={produto.preco}
        />
      ))}

      <TouchableOpacity
        style={styles.addIngredientes}
        onPress={() => router.push("/(stack)/formulario-base")}
      >
        <Text
          style={{ fontFamily: "Roboto" }}
          fontSize={16}
          fontWeight={"bold"}
          color={"#fff"}
        >
          Adicionar Ingrediente
        </Text>
      </TouchableOpacity>
    </ContainerWrapper>
  );
};

export default DetalhesReceita;

const styles = StyleSheet.create({
  addIngredientes: {
    backgroundColor: "#ea1d2c",
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
    height: 50,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
