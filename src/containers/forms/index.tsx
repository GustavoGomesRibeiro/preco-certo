import { InputText } from "@/src/components/input-text/input-text";
import { adicionarProduto, atualizarProduto } from "@/src/database/produtos";
import { ContainerWrapper } from "@/src/shared/components";
import { SaveAll } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Text } from "tamagui";
import useFormStore from "./store/form-store";
type FormValues = {
  nomeProduto: string;
  precoProduto: number;
  quantidadeProduto: number;
  // nomeReceita: string;
};

export const Forms = () => {
  const { produtoSelecionado, setProdutoSelecionado } = useFormStore();
  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      nomeProduto: "",
      precoProduto: undefined,
      quantidadeProduto: undefined,
    },
  });

  useEffect(() => {
    if (produtoSelecionado) {
      setValue("nomeProduto", produtoSelecionado.nome);
      setValue("precoProduto", produtoSelecionado.preco);
      setValue("quantidadeProduto", produtoSelecionado.gramas);
    }
  }, [produtoSelecionado]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (produtoSelecionado) {
      await atualizarProduto(
        data.nomeProduto,
        data.precoProduto,
        data.quantidadeProduto,
        produtoSelecionado.id
      );
    } else {
      await adicionarProduto(
        data.nomeProduto,
        data.precoProduto,
        data.quantidadeProduto
      );
    }

    setProdutoSelecionado(null);
    reset();
    router.navigate("/(stack)/lista-produtos-base");
  };

  return (
    <ContainerWrapper>
      {/* <InputText
        label="Nome da Receita"
        fieldName="nomeReceita"
        control={control}
        placeholder="Nome da Receita"
      /> */}
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

      <View style={styles.containerBotaoLista}>
        <TouchableOpacity
          onPress={() => router.navigate("/(stack)/lista-produtos-base")}
        >
          <Text fontWeight={"bold"} fontSize={16}>
            Ver produtos cadastrados
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerWrapper>
  );
};

const styles = StyleSheet.create({
  containerBotaoLista: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
