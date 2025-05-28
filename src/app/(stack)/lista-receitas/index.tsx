import useFormStore from "@/src/containers/forms/store/form-store";
import { ContainerWrapper } from "@/src/shared/components";
import { Text } from "react-native";

const ListaReceitas = () => {
  const { produtos } = useFormStore();
  return (
    <ContainerWrapper>
      {produtos.map((produto) => (
        <Text key={produto.id}>
          {produto.nome} - {produto.preco} - {produto.quantidade}
        </Text>
      ))}
    </ContainerWrapper>
  );
};

export default ListaReceitas;
