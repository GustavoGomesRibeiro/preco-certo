import BackButton from "@/src/components/back-button";
import { ContainerWrapper } from "@/src/shared/components";
import { router } from "expo-router";
import { Forms } from "./containers/forms";
const FormularioBase = () => {
  return (
    <ContainerWrapper>
      <BackButton
        navigate={() => router.replace("/(tabs)")}
        title="Cadastro de Produtos"
      />
      <Forms />
    </ContainerWrapper>
  );
};

export default FormularioBase;
