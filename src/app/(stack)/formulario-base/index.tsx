import { Forms } from "@/src/containers";
import { ContainerWrapper } from "@/src/shared/components";
import { ScrollView } from "react-native";
const FormularioBase = () => {
  return (
    <ContainerWrapper>
      <ScrollView>
        <Forms />
      </ScrollView>
    </ContainerWrapper>
  );
};

export default FormularioBase;
