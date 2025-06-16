import BackButton from "@/src/components/back-button";
import { Forms } from "@/src/containers";
import { ContainerWrapper } from "@/src/shared/components";
import { router } from "expo-router";
const FormularioBase = () => {
  return (
    <ContainerWrapper>
      <BackButton navigate={() => router.back()} title="Cadastro de Produtos" />
      <Forms />
    </ContainerWrapper>
  );
};

export default FormularioBase;
