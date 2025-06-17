import { InputText } from "@/src/components/input-text/input-text";
import { sqlLite } from "@/src/database";
import { adicionarProduto, atualizarProduto } from "@/src/database/produtos";
import {
  adicionarIngredientesParaReceita,
  adicionarReceita,
  listarTodasReceitas,
} from "@/src/database/receitas";
import { ContainerWrapper } from "@/src/shared/components";
import { SaveAll } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, Label, Text } from "tamagui";
import { Select } from "../select";
import useFormStore from "./store/form-store";
type FormValues = {
  nomeProduto: string;
  precoProduto: number;
  quantidadeProduto: number;
  nomeReceita?: string;
  receitaId?: number;
};

export const Forms = () => {
  const [isNovaReceita, setIsNovaReceita] = useState(true);
  const { produtoSelecionado, setProdutoSelecionado, receitas } =
    useFormStore();
  const { control, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      nomeProduto: "",
      precoProduto: undefined,
      quantidadeProduto: undefined,
      nomeReceita: "",
      receitaId: undefined,
    },
  });

  useEffect(() => {
    listarTodasReceitas();
    if (produtoSelecionado) {
      setValue("nomeProduto", produtoSelecionado.nome);
      setValue("precoProduto", produtoSelecionado.preco);
      setValue("quantidadeProduto", produtoSelecionado.gramas);
    }
  }, [produtoSelecionado]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
    reset();
    router.navigate("/(stack)/lista-receitas");
  };
  return (
    <ContainerWrapper>
      {isNovaReceita ? (
        <InputText
          label="Nome da Receita"
          fieldName="nomeReceita"
          control={control}
          placeholder="Ex: Bolo de Morango"
          rules={{
            required: {
              value: true,
              message: "O nome da receita é obrigatório",
            },
          }}
        />
      ) : (
        <View style={{ marginBottom: 20 }}>
          <Label
            style={{ fontFamily: "Roboto" }}
            fontWeight="bold"
            fontSize={16}
          >
            Selecione uma receita
          </Label>
          <Controller
            control={control}
            name="receitaId"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Select
                value={value?.toString() ?? ""}
                onValueChange={(val) => onChange(Number(val))}
                placeholder="Selecione uma receita"
                label="Receitas disponíveis"
                items={receitas.map((r) => ({
                  label: r.nome,
                  value: r.id.toString(),
                }))}
              />
            )}
          />
        </View>
      )}

      <TouchableOpacity onPress={() => setIsNovaReceita((prev) => !prev)}>
        <Text color="blue" fontSize={14} marginBottom={10}>
          {isNovaReceita
            ? "Selecionar receita existente"
            : "Cadastrar nova receita"}
        </Text>
      </TouchableOpacity>

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
          onPress={() => router.navigate("/(stack)/lista-receitas")}
        >
          <Text fontWeight={"bold"} fontSize={16}>
            Ver Receitas Cadastradas
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
