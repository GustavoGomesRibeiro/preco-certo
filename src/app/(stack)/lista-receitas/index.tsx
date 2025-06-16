import BackButton from "@/src/components/back-button";
import useFormStore from "@/src/containers/forms/store/form-store";
import { ContainerWrapper } from "@/src/shared/components";
import { router } from "expo-router";
import { Text } from "react-native";

const ListaReceitas = () => {
  const { produtos } = useFormStore();
  return (
    <ContainerWrapper>
      <BackButton navigate={() => router.back()} title="Cadastro de Produtos" />
      {produtos.map((produto) => (
        <Text key={produto.id}>
          {produto.nome} - {produto.preco} - {produto.gramas}
        </Text>
      ))}
    </ContainerWrapper>
  );
};

export default ListaReceitas;
