import { FormValuesProps } from "@/src/app/(stack)/formulario-base/containers/forms/forms-types";
import { InputText } from "@/src/components/input-text/input-text";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";

export const DetalheProduto = () => {
  const { control } = useFormContext<FormValuesProps>();
  return (
    <View className="flex-1">
      <InputText
        label="Nome do Produto"
        fieldName="nomeProduto"
        control={control}
        placeholder="Nome do Produto"
        rules={{
          required: {
            value: true,
            message: "O campo nome do produto é obrigatório.",
          },
        }}
      />

      <View className="flex-row ">
        <InputText
          fieldName="quantidadeProduto"
          control={control}
          placeholder="Gramas (g)"
          type="numeric"
          rules={{
            required: {
              value: true,
              message: "Gramas é obrigatório.",
            },
          }}
        />
        <InputText
          fieldName="precoProduto"
          control={control}
          placeholder="Preço (R$)"
          type="numeric"
          formatarToBRL
          rules={{
            required: {
              value: true,
              message: "Preço é obrigatório.",
            },
          }}
        />
      </View>
    </View>
  );
};
