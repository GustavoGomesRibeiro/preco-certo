import GastosSvg from "@/src/assets/svgs/bill.svg";
import Gastos02Svg from "@/src/assets/svgs/budget.svg";
import CaixaSvg from "@/src/assets/svgs/pricing.svg";
import PrecoFinalSvg from "@/src/assets/svgs/profits.svg";
import LucroSvg from "@/src/assets/svgs/tax.svg";
import { formatToBRLCustoTotal } from "@/src/shared/utils/format-currency";
import masks from "@/src/shared/utils/masks";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Input, Label, Separator, Text as TextTamagui } from "tamagui";
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
      <View style={styles.containerSteps}>
        <View style={styles.containerCustos}>
          <View style={styles.containerDescricao}>
            <View style={styles.containerIcon}>
              <Gastos02Svg width={32} height={32} />
            </View>
            <Text style={styles.text}>{`Custos\ningredientes`}</Text>
          </View>
          <Text style={styles.text}>{formatToBRLCustoTotal(totalCusto)}</Text>
        </View>

        <View style={styles.containerCustos}>
          <View style={styles.containerDescricao}>
            <View style={styles.containerIcon}>
              <GastosSvg width={32} height={32} />
            </View>
            <Text style={styles.text}>{`Custos\nincalculáveis`}</Text>
          </View>
          <Text style={styles.text}>
            {formatToBRLCustoTotal(custosIncalculaveisTotal)}
          </Text>
        </View>
      </View>

      <Separator marginVertical={15} borderColor={"#E0E0E0"} />

      <Label style={{ fontFamily: "Roboto" }} fontWeight={"bold"} fontSize={20}>
        Lucro
      </Label>

      <View style={styles.containerSteps}>
        <Controller
          name="multiploLucroMaoDeObra"
          control={control}
          rules={{
            required: { value: true, message: "Campo obrigatório" },
          }}
          render={({ field: { value, onChange }, fieldState }) => (
            <View style={{ flex: 1 }}>
              <Label fontWeight="bold" fontSize={16}>
                Margem de lucro
              </Label>
              <Input
                value={String(value ?? "")}
                onChangeText={(e) => onChange(Number(e.replace(",", ".")))}
                placeholder="Multiple sua margem de lucro..."
                marginBottom={10}
                marginRight={4}
                keyboardType="numeric"
                backgroundColor="#fff"
              />
              <TextTamagui color="red">{fieldState.error?.message}</TextTamagui>
            </View>
          )}
        />

        <View style={styles.containerCustos}>
          <View style={styles.containerDescricao}>
            <View style={styles.containerIcon}>
              <LucroSvg width={32} height={32} />
            </View>
            <Text style={styles.text}>{`Lucro\ndesejado`}</Text>
          </View>
          <Text style={styles.text}>
            {formatToBRLCustoTotal(lucroDesejadoCalc)}
          </Text>
        </View>
      </View>

      <Separator marginVertical={15} borderColor={"#E0E0E0"} />

      <Label style={{ fontFamily: "Roboto" }} fontWeight={"bold"} fontSize={20}>
        Informações de Produção
      </Label>

      <View style={styles.containerSteps}>
        <View style={styles.containerInput}>
          <View>
            <Controller
              name="rendimentoProduto"
              control={control}
              rules={{
                required: { value: true, message: "Campo obrigatporio" },
              }}
              render={({ field: { onChange, value }, fieldState }) => (
                <View style={{ flex: 1 }}>
                  <Label
                    style={{ fontFamily: "Roboto" }}
                    fontWeight="bold"
                    fontSize={16}
                  >
                    Rendimento
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
                  <TextTamagui color="red">
                    {fieldState.error?.message}
                  </TextTamagui>
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
                  <Label
                    style={{ fontFamily: "Roboto" }}
                    fontWeight="bold"
                    fontSize={16}
                  >
                    Preço p/ embalagem
                  </Label>
                  <Input
                    value={String(value ?? "")}
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
                  <TextTamagui color="red">
                    {fieldState.error?.message}
                  </TextTamagui>
                </View>
              )}
            />
          </View>
        </View>

        <Label
          style={{ fontFamily: "Roboto" }}
          fontWeight={"bold"}
          fontSize={20}
        >
          Precificação final
        </Label>

        <View style={styles.containerCustos}>
          <View style={styles.containerDescricao}>
            <View style={styles.containerIcon}>
              <CaixaSvg width={32} height={32} />
            </View>
            <Text style={styles.text}>{`Preço por\nunidade`}</Text>
          </View>
          <Text style={styles.text}>
            {formatToBRLCustoTotal(precoUnidadeCalculado)}
          </Text>
        </View>

        <View style={styles.containerCustos}>
          <View style={styles.containerDescricao}>
            <View style={styles.containerIcon}>
              <PrecoFinalSvg width={32} height={32} />
            </View>
            <Text style={styles.text}>{`Preço\nfinal`}</Text>
          </View>
          <Text style={styles.text}>
            {masks.currency.mask(precoUnidadeFinalCalculada)}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    display: "flex",
    flexDirection: "row",
  },
  containerSteps: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  containerCustos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerDescricao: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  containerIcon: {
    marginRight: 10,
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#D5E6F6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 16,
  },
});
