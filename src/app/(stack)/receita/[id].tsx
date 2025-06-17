import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import BackButton from "@/src/components/back-button";
import Produtos from "@/src/components/produtos";
import { listarReceitasComIngredientes } from "@/src/database/receitas";
import { ContainerWrapper } from "@/src/shared/components";

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
    </ContainerWrapper>
  );
};

export default DetalhesReceita;
