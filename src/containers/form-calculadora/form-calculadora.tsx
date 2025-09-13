import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { Select } from "@/src/containers/select";
import {
  formatToBRLCustoTotal,
  parseBRL,
} from "@/src/shared/utils/format-currency";
import { Image } from "expo-image";
import { Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { useFormStore } from "@/src/app/(stack)/formulario-base/store/form-store";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { listarReceitasComIngredientes } from "@/src/database/receitas";
import { Button, Input, Label, Text } from "tamagui";
import { FormResultados } from "../form-resultados";

const tabs = ["Ingredientes", "Resultados"];

type FormValues = {
  id: number;
  nomeProduto: string;
  precoProduto: number;
  [key: `quantidadeProduto_${number}`]: string | number | undefined;
};
export const FormCalculadora = () => {
  const [activeTab, setActiveTab] = useState("Ingredientes");

  const {
    inputs,
    custos,
    addInput,
    removeInput,
    setInput,
    setCusto,
    setTotalCusto,
    receitas,
    receitaSelecionada,
    setReceitaSelecionada,
    setProdutosDaReceita,
    setSelectedProducts,
    setInputs,
  } = useFormStore();
  const { control, setValue } = useForm<FormValues>({
    defaultValues: {
      precoProduto: undefined,
      quantidadeProduto_0: "",
    },
  });

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const handleAddInput = () => {
    addInput();
    setValue(`quantidadeProduto_${inputs.length}`, "");
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleChangeInput = (
    field: "nome" | "preco" | "gramas",
    text: string,
    idx: number
  ) => {
    setInput(idx, field, text);
  };

  const handleRemoveInput = (idx: number) => {
    removeInput(idx);
  };

  const handleQuantidadeChange = (e: string, idx: number) => {
    const valor = Number(e.replace(",", "."));
    const preco = parseBRL(inputs[idx].preco);
    const gramas = Number(inputs[idx].gramas);
    const custo = preco && gramas && valor ? (preco / gramas) * valor : 0;
    setCusto(idx, custo);
  };

  useEffect(() => {
    const total = custos.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    setTotalCusto(total);
  }, [custos, setTotalCusto]);

  useEffect(() => {
    const carregarIngredientes = async () => {
      if (!receitaSelecionada) return;

      const dados = await listarReceitasComIngredientes();
      const ingredientesDaReceita = dados.filter(
        (d) => d.receitaId === receitaSelecionada.id
      );

      setInputs(
        ingredientesDaReceita.map((ing) => ({
          nome: ing.produtoNome,
          preco: ing.preco.toString(),
          gramas: ing.gramas.toString(),
        }))
      );

      setSelectedProducts(ingredientesDaReceita.map((ing) => ing.produtoId));

      const produtosUnicos = ingredientesDaReceita.map((ing) => ({
        id: ing.produtoId,
        nome: ing.produtoNome,
        preco: ing.preco.toString(),
        gramas: ing.gramas.toString(),
      }));

      setProdutosDaReceita(produtosUnicos);
    };

    carregarIngredientes();
  }, [receitaSelecionada]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ParallaxScrollView
        scrollViewRef={scrollViewRef}
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Image
            source={require("@/src/assets/images/bg-calculadora.png")}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
          />
        }
      >
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                borderBottomWidth: 2,
                borderColor: activeTab === tab ? "#000" : "#ADD8E6",
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginRight: 10,
              }}
            >
              <Text
                fontSize={16}
                fontWeight={activeTab === tab ? "bold" : "normal"}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "Ingredientes" && (
          <View style={{ width: "100%", alignItems: "center" }}>
            <View style={styles.containerTextoHeader}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" darkColor="#000">
                  Custo por ingredientes
                </ThemedText>
              </ThemedView>
              <ThemedText darkColor="#000">
                Selecione a receita desejado e informe a quantidade utilizada.
              </ThemedText>

              <View style={{ marginTop: 10 }}>
                <Select
                  placeholder="Selecione uma receita"
                  items={receitas.map((r) => ({
                    label: r.nome,
                    value: r.id.toString(),
                  }))}
                  value={receitaSelecionada?.id.toString() ?? ""}
                  onValueChange={(idStr) => {
                    const receita = receitas.find(
                      (r) => r.id === Number(idStr)
                    );
                    if (receita) setReceitaSelecionada(receita);
                  }}
                />
              </View>
            </View>

            {inputs.map((item, idx) => (
              <View key={idx}>
                <View style={styles.containerLabel}>
                  <Label fontWeight="bold" fontSize={16}>
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
                <Label fontWeight="bold" fontSize={14}>
                  {item.nome}
                </Label>

                <View style={styles.containerInput}>
                  <View>
                    <Label fontWeight="bold" fontSize={16}>
                      Preço (R$)
                    </Label>
                    <Input
                      value={String(item.preco)}
                      onChangeText={(text) =>
                        handleChangeInput("preco", text, idx)
                      }
                      placeholder="Preço"
                      width={150}
                      marginBottom={10}
                      marginRight={4}
                      disabled
                    />
                  </View>
                  <View>
                    <Label fontWeight="bold" fontSize={16}>
                      Gramas (g)
                    </Label>
                    <Input
                      value={String(item.gramas)}
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
                      name={`quantidadeProduto_${idx}`}
                      control={control}
                      rules={{
                        required: { value: true, message: "Campo obrigatório" },
                      }}
                      defaultValue=""
                      render={({ field: { onChange, value }, fieldState }) => (
                        <View style={{ flex: 1 }}>
                          <Label fontWeight="bold" fontSize={16}>
                            (g) utilizadas
                          </Label>
                          <Input
                            value={String(value) ?? ""}
                            onChangeText={(e) => {
                              onChange(e);
                              handleQuantidadeChange(e, idx);
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
                      name="precoProduto"
                      control={control}
                      render={() => (
                        <View style={{ flex: 1 }}>
                          <Label fontWeight="bold" fontSize={16}>
                            Custo (R$)
                          </Label>
                          <Input
                            value={formatToBRLCustoTotal(custos[idx] ?? 0)}
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
        )}

        {activeTab === "Resultados" && <FormResultados />}
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerTabs: {},
  containerTextoHeader: {
    margin: 10,
  },
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
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
