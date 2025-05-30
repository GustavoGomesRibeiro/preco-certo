import { formatToBRLCustoTotal } from "@/src/shared/utils/format-currency";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";

import { Button, Input, Label, Text } from "tamagui";
import useFormStore from "../forms/store/form-store";

type FormResultadosProps = {
  totalCustoIngredientes: number;
  custosIncalculaveis: number;
  multiploLucroMaoDeObra: number;
  lucroDesejado: number;
  rendimentoProduto: number;
  precoUnidade: number;
  precoEmbalagem: number;
  precoFinal: number;
};
export const FormResultados = () => {
  const {
    totalCusto,
    lucroDesejado,
    unidades,
    precoEmbalagem,
    setPrecoEmbalagem,
    setUnidades,
    setLucroDesejado,
  } = useFormStore();
  const { control, handleSubmit } = useForm<FormResultadosProps>();

  const onSubmit: SubmitHandler<FormResultadosProps> = (data) => {
    setLucroDesejado(data.custosIncalculaveis * data.multiploLucroMaoDeObra);
    setUnidades(data.rendimentoProduto);
    setPrecoEmbalagem(data.precoEmbalagem);
    console.log(data, ">><");
  };
  return (
    <>
      <View>
        <Controller
          name="totalCustoIngredientes"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Custo Ingredientes
              </Label>
              <Input
                value={formatToBRLCustoTotal(totalCusto)}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="custosIncalculaveis"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Custo Incalculáveis
              </Label>
              <Input
                value={formatToBRLCustoTotal(totalCusto * 1.25)}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="multiploLucroMaoDeObra"
          control={control}
          rules={{
            required: { value: true, message: "Campo obrigatporio" },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Multiplique o valor:
              </Label>
              <Input
                value={String(value) ?? ""}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
              <Text color="red">{fieldState.error?.message}</Text>
            </View>
          )}
        />
      </View>
      <View>
        <Controller
          name="lucroDesejado"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Lucro desejado:
              </Label>
              <Input
                value={formatToBRLCustoTotal(lucroDesejado)}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="rendimentoProduto"
          control={control}
          rules={{
            required: { value: true, message: "Campo obrigatporio" },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Quantas unidades rendeu:
              </Label>
              <Input
                value={String(value)}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
              <Text color="red">{fieldState.error?.message}</Text>
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="precoUnidade"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Preço p/ unidade:
              </Label>
              <Input
                value={formatToBRLCustoTotal(lucroDesejado / unidades)}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="precoEmbalagem"
          control={control}
          rules={{
            required: { value: true, message: "Campo obrigatporio" },
          }}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Preço p/ balagem:
              </Label>
              <Input
                value={String(value) ?? ""}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
              <Text color="red">{fieldState.error?.message}</Text>
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="precoFinal"
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Preço final:
              </Label>
              <Input
                value={formatToBRLCustoTotal(precoEmbalagem)}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
            </View>
          )}
        />
      </View>
      <Button onPress={handleSubmit(onSubmit)}> Calcular </Button>
    </>
  );
};
