import { Select } from "@/src/containers/select";
import { ContainerWrapper } from "@/src/shared/components";
import { formatToBRLCustoTotal } from "@/src/shared/utils/format-currency";
import { CheckCheck } from "@tamagui/lucide-icons";
import { Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Input, Label, Text } from "tamagui";
import useFormStore from "../forms/store/form-store";

type FormValues = {
  id: number;
  nomeProduto: string;
  precoProduto: number;
  quantidadeProduto: number;
};

export const FormCalculadora = () => {
  const { produtos } = useFormStore();
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      precoProduto: undefined,
      quantidadeProduto: undefined,
    },
  });
  const [custos, setCustos] = useState<number[]>([0]);
  const [teste, setTeste] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<(number | null)[]>([
    null,
  ]);
  const [inputs, setInputs] = useState<{ preco: string; gramas: string }[]>([
    { preco: "", gramas: "" },
  ]);

  console.log(inputs, ">><<");
  const handleAddInput = () => {
    setInputs((prev) => [...prev, { preco: "", gramas: "" }]);
    setSelectedProducts((prev) => [...prev, null]);
    setCustos((prev) => [...prev, 0]);
  };

  const handleChangeInput = (
    field: "preco" | "gramas",
    text: string,
    idx: number
  ) => {
    setInputs((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: text } : item))
    );
  };

  const handleRemoveInput = (idx: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== idx));
    setSelectedProducts((prev) => prev.filter((_, i) => i !== idx));
    setCustos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSelectProduct = (produtoIdStr: string, idx: number) => {
    const produtoId = Number(produtoIdStr);
    setSelectedProducts((prev) =>
      prev.map((v, i) => (i === idx ? produtoId : v))
    );
    const produto = produtos.find((p) => p.id === produtoId);
    if (produto) {
      setInputs((prev) =>
        prev.map((item, i) =>
          i === idx
            ? {
                preco: produto.preco.toString(),
                gramas: produto.quantidade.toString(),
              }
            : item
        )
      );
    }
  };

  function parseBRL(value: string): number {
    if (!value) return 0;
    // Remove "R$", pontos e troca vírgula por ponto
    return Number(
      value.replace("R$", "").replace(/\./g, "").replace(",", ".").trim()
    );
  }

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleAddInput();
    // reset();
  };

  console.log(teste, "><<");
  const handlePrice = (
    preco: number,
    gramasTotal: number,
    gramasUtilizada: number
  ) => {
    console.log(preco, ">>preco<<");
    console.log(gramasTotal, ">><<");
    console.log(gramasUtilizada, ">>gramasUtilizada<<");
    if (!preco || !gramasTotal || !gramasUtilizada) return 0;
    return setTeste((preco / gramasTotal) * gramasUtilizada);
  };

  return (
    <ContainerWrapper>
      <View style={{ width: "100%", alignItems: "center" }}>
        {inputs.map((item, idx) => (
          <View key={idx}>
            <View style={styles.containerLabel}>
              <Label fontWeight={"bold"} fontSize={16}>
                Produto
              </Label>
              {inputs.length > 1 && (
                <Button
                  onPress={() => handleRemoveInput(idx)}
                  size="$2"
                  backgroundColor="#fff"
                  marginLeft={8}
                  icon={<Trash2 color="#ea1d2c" size={18} />}
                  circular
                />
              )}
            </View>

            <Select
              value={selectedProducts[idx]?.toString() ?? ""}
              onValueChange={(val) => handleSelectProduct(val, idx)}
            />
            <View style={styles.containerInput}>
              <View>
                <Label fontWeight={"bold"} fontSize={16}>
                  Preço (R$)
                </Label>
                <Input
                  value={item.preco}
                  onChangeText={(text) => handleChangeInput("preco", text, idx)}
                  placeholder="Preço"
                  width={150}
                  marginBottom={10}
                  marginRight={4}
                  disabled
                />
              </View>

              <View>
                <Label fontWeight={"bold"} fontSize={16}>
                  Gramas (g)
                </Label>
                <Input
                  value={item.gramas}
                  onChangeText={(text) =>
                    handleChangeInput("gramas", text, idx)
                  }
                  placeholder="Gramas"
                  width={150}
                  marginBottom={10}
                  marginLeft={4}
                  disabled
                />
              </View>
            </View>
            <View style={styles.containerInput}>
              <View>
                <Controller
                  name="quantidadeProduto"
                  control={control}
                  rules={{
                    required: { value: true, message: "Campo obrigatório" },
                  }}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <View style={{ flex: 1 }}>
                      <Label fontWeight={"bold"} fontSize={16}>
                        (g) utilizadas
                      </Label>
                      <Input
                        value={String(value)}
                        onChangeText={(e) => {
                          const valor = Number(e.replace(",", "."));
                          onChange(e);
                          handlePrice(
                            parseBRL(item.preco),
                            Number(item.gramas),
                            valor
                          );
                        }}
                        placeholder="Gramas"
                        width={150}
                        marginBottom={10}
                        marginRight={4}
                        keyboardType="numeric"
                      />
                      <Text color={"red"}>{fieldState.error?.message}</Text>
                    </View>
                  )}
                />
              </View>

              <View>
                <Controller
                  name="precoProduto"
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <View style={{ flex: 1 }}>
                      <Label fontWeight={"bold"} fontSize={16}>
                        Custo (R$)
                      </Label>
                      <Input
                        value={formatToBRLCustoTotal(teste)}
                        placeholder="Preço"
                        width={150}
                        marginBottom={10}
                        marginLeft={4}
                        keyboardType="numeric"
                        disabled
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        theme="primary"
        iconAfter={<CheckCheck size={24} color={"white"} />}
        backgroundColor="#ea1d2c"
        width={300}
        minWidth={300}
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
        elevation={5}
        marginTop={20}
        marginBottom={20}
      >
        <Text fontWeight={"bold"} fontSize={16} color={"white"}>
          Adicionar produtos
        </Text>
      </Button>
    </ContainerWrapper>
  );
};

const styles = StyleSheet.create({
  containerLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});
