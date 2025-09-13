import { DetalheProduto } from "@/src/app/(stack)/formulario-base/components/detalhe-produto/detalhe-produto";
import { FormValuesProps } from "@/src/app/(stack)/formulario-base/containers/forms/forms-types";
import { Receita } from "@/src/app/(stack)/formulario-base/containers/receita/receita";
import { sqlLite } from "@/src/database";
import { adicionarProduto, atualizarProduto } from "@/src/database/produtos";
import {
  adicionarIngredientesParaReceita,
  adicionarReceita,
  listarTodasReceitas,
} from "@/src/database/receitas";
import { ContainerWrapper } from "@/src/shared/components";
import { Button } from "@/src/shared/components/button/button";
import { Text } from "@/src/shared/components/text/text";
import { SaveAll } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { useFormStore } from "../../store/form-store";

export const Forms = () => {
  const [isNovaReceita, setIsNovaReceita] = useState(true);
  const { produtoSelecionado, setProdutoSelecionado, receitas } =
    useFormStore();
  const form = useForm<FormValuesProps>({
    defaultValues: {
      nomeProduto: "",
      precoProduto: undefined,
      quantidadeProduto: undefined,
      nomeReceita: "",
      receitaId: undefined,
    },
  });
  // const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
  //   defaultValues: {
  //     nomeProduto: "",
  //     precoProduto: undefined,
  //     quantidadeProduto: undefined,
  //     nomeReceita: "",
  //     receitaId: undefined,
  //   },
  // });

  useEffect(() => {
    listarTodasReceitas();
    if (produtoSelecionado) {
      form.setValue("nomeProduto", produtoSelecionado.nome);
      form.setValue("precoProduto", produtoSelecionado.preco);
      form.setValue("quantidadeProduto", produtoSelecionado.gramas);
    }
  }, [produtoSelecionado]);

  const onSubmit: SubmitHandler<FormValuesProps> = async (data) => {
    let receitaId = data.receitaId ? Number(data.receitaId) : undefined;

    if (isNovaReceita && data.nomeReceita) {
      const dataCriacao = new Date().toISOString();
      receitaId = await adicionarReceita(data.nomeReceita, "", dataCriacao);
    }

    let produtoId: number;
    if (produtoSelecionado) {
      await atualizarProduto(
        data.nomeProduto,
        data.precoProduto,
        data.quantidadeProduto,
        produtoSelecionado.id
      );
      produtoId = produtoSelecionado.id;
    } else {
      await adicionarProduto(
        data.nomeProduto,
        data.precoProduto,
        data.quantidadeProduto
      );

      const [last] = await sqlLite.getAllAsync<{ id: number }>(
        "SELECT id FROM produtos ORDER BY id DESC LIMIT 1"
      );
      produtoId = last.id;
    }

    if (receitaId && produtoId) {
      await adicionarIngredientesParaReceita(receitaId, [
        { produtoId, quantidade_g: data.quantidadeProduto },
      ]);
    }

    setProdutoSelecionado(null);
    form.reset();
    router.navigate("/(stack)/lista-receitas");
  };
  return (
    <FormProvider {...form}>
      <ContainerWrapper>
        <Receita
          novaReceita={isNovaReceita}
          setIsNovaReceita={() => setIsNovaReceita((prev) => !prev)}
        />

        <DetalheProduto />

        <Button handleSubmit={form.handleSubmit(onSubmit)}>
          <Text className="font-bold color-white">Salvar</Text>
          <SaveAll size={24} color={"white"} marginLeft={10} />
        </Button>

        <View className="flex items-center justify-center mt-5">
          <TouchableOpacity
            onPress={() => router.navigate("/(stack)/lista-receitas")}
          >
            <Text className="font-bold">Ver receitas cadastradas</Text>
          </TouchableOpacity>
        </View>
      </ContainerWrapper>
    </FormProvider>
  );
};
