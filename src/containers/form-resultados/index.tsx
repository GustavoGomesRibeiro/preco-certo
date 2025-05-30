import { formatToBRLCustoTotal } from "@/src/shared/utils/format-currency";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import masks from "@/src/shared/utils/masks";
import { Input, Label, Text } from "tamagui";
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
  const { totalCusto } = useFormStore();
  const { control, watch } = useForm<FormResultadosProps>();

  const custosIncalculaveisTotal = totalCusto * 1.25;
  const multiploLucroMaoDeObra = watch("multiploLucroMaoDeObra") || 1;
  const rendimentoProduto = watch("rendimentoProduto") || 1;
  const precoPorEmbalagem = watch("precoEmbalagem");
  const lucroDesejadoCalc =
    custosIncalculaveisTotal * Number(multiploLucroMaoDeObra);
  const precoUnidadeCalculado = lucroDesejadoCalc / rendimentoProduto;
  const unmaskedValue = masks.currency.unmask(String(precoPorEmbalagem));
  const unMaskPrecoEmbalagem =
    (typeof unmaskedValue === "number"
      ? unmaskedValue
      : Number(unmaskedValue) || 0) / 100;
  const precoUnidadeFinalCalculada =
    Number(precoUnidadeCalculado) + Number(unMaskPrecoEmbalagem);

  return (
    <>
      <View>
        <Controller
          name="totalCustoIngredientes"
          control={control}
          render={() => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Custos Ingredientes
              </Label>
              <Input
                value={formatToBRLCustoTotal(totalCusto)}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
                disabled
              />
            </View>
          )}
        />
      </View>

      <View>
        <Controller
          name="custosIncalculaveis"
          control={control}
          render={() => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Custos Incalculáveis
              </Label>
              <Input
                value={formatToBRLCustoTotal(custosIncalculaveisTotal)}
                placeholder="Gramas"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
                disabled
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
            required: { value: true, message: "Campo obrigatório" },
          }}
          render={({ field: { value, onChange }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Multiplique o valor:
              </Label>
              <Input
                value={String(value ?? "")}
                onChangeText={(e) => onChange(Number(e.replace(",", ".")))}
                placeholder="Ex: 2"
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
          render={() => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Lucro desejado:
              </Label>
              <Input
                value={formatToBRLCustoTotal(lucroDesejadoCalc)}
                placeholder="Lucro desejado"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
                disabled
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
                value={String(value ?? "")}
                onChangeText={(e) => {
                  onChange(e);
                }}
                placeholder="Rendimento"
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
          render={() => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Preço p/ unidade:
              </Label>
              <Input
                value={formatToBRLCustoTotal(precoUnidadeCalculado)}
                placeholder="Preco unidade"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
                disabled
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
                Preço p/ embalagem:
              </Label>
              <Input
                value={masks.currencyInput.mask(value)}
                onChangeText={(e) => {
                  onChange(masks.currencyInput.mask(e));
                }}
                placeholder="Preço embalagem"
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
          render={() => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Preço final:
              </Label>
              <Input
                value={masks.currency.mask(precoUnidadeFinalCalculada)}
                placeholder="Preço final"
                width={150}
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
                disabled
              />
            </View>
          )}
        />
      </View>
    </>
  );
};
