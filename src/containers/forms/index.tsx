import { InputText } from "@/src/components/input-text/input-text";
import { ContainerWrapper } from "@/src/shared/components";
import { SaveAll } from "@tamagui/lucide-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Text } from "tamagui";
import useFormStore from "./store/form-store";

type FormValues = {
  id: number;
  nomeProduto: string;
  precoProduto: number;
  quantidadeProduto: number;
};

export const Forms = () => {
  const { addProduto, produtos } = useFormStore();
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      nomeProduto: "",
      precoProduto: undefined,
      quantidadeProduto: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    addProduto({
      id: Date.now(),
      nome: data.nomeProduto,
      preco: data.precoProduto,
      quantidade: data.quantidadeProduto,
    });
  };

  return (
    <ContainerWrapper>
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
      <InputText
        fieldName="quantidadeProduto"
        control={control}
        placeholder="Quantidade em gramas"
        label="Quantidade do Produto (g)"
        type="numeric"
        rules={{
          required: {
            value: true,
            message: "O campo quantidade é obrigatório.",
          },
        }}
      />
      <InputText
        fieldName="precoProduto"
        control={control}
        placeholder="Preço do Produto"
        label="Custo do Produto (R$)"
        type="numeric"
        formatarToBRL
        rules={{
          required: { value: true, message: "O campo preço é obrigatório." },
        }}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        theme="primary"
        iconAfter={<SaveAll size={24} color={"white"} />}
        backgroundColor="#ea1d2c"
        width={300}
        minWidth={300}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
        elevation={5}
      >
        <Text fontWeight={"bold"} color="white" fontSize={18}>
          Salvar
        </Text>
      </Button>
    </ContainerWrapper>
  );
};
