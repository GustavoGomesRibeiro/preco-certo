import { FormValuesProps } from "@/src/app/(stack)/formulario-base/containers/forms/forms-types";
import { ConditionalRender } from "@/src/components/conditional-render/conditional-render";
import { InputText } from "@/src/components/input-text/input-text";
import { Controller, useFormContext } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

import { Select } from "@/src/containers/select";

import { ReceitaProps } from "@/src/app/(stack)/formulario-base/containers/receita/receita-types";
import { useFormStore } from "@/src/app/(stack)/formulario-base/store/form-store";
import { Text } from "@/src/shared/components/text/text";
import { FC } from "react";
import { Label } from "tamagui";

export const Receita: FC<ReceitaProps> = ({
  novaReceita,
  setIsNovaReceita,
}) => {
  const { control } = useFormContext<FormValuesProps>();
  const { receitas } = useFormStore();

  return (
    <>
      <ConditionalRender conditional={novaReceita}>
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
      </ConditionalRender>

      <ConditionalRender conditional={!novaReceita}>
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
      </ConditionalRender>

      <TouchableOpacity onPress={setIsNovaReceita}>
        <Text variant="sm" className="mb-3 color-blue-600">
          {novaReceita
            ? "Selecionar receita existente"
            : "Cadastrar nova receita"}
        </Text>
      </TouchableOpacity>
    </>
  );
};
