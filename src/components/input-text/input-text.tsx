import { ConditionalRender } from "@/src/components/conditional-render/conditional-render";
import masks from "@/src/shared/utils/masks";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import {
  KeyboardType,
  KeyboardTypeAndroid,
  KeyboardTypeIOS,
  View,
} from "react-native";
import { Input, Label, Text } from "tamagui";

type InputTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  formatarToBRL?: boolean;
  label?: string;
  type?: KeyboardType | KeyboardTypeAndroid | KeyboardTypeIOS;
  fieldName: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  width?: number;
  minWidth?: number;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export const InputText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  placeholder,
  fieldName,
  control,
  label,
  type,
  formatarToBRL,
  rules,
  width,
  minWidth,
}: InputTextProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => (
        <View style={{ flex: 1 }}>
          <ConditionalRender conditional={Boolean(label)}>
            <Label
              style={{ fontFamily: "Roboto" }}
              htmlFor={label}
              fontWeight="bold"
              fontSize={16}
            >
              {label}
            </Label>
          </ConditionalRender>

          <Input
            borderColor="grey"
            backgroundColor="#f6f6fa"
            value={value}
            onChangeText={
              formatarToBRL
                ? (e) => onChange(masks.currencyInput.mask(e))
                : (e) => onChange(e)
            }
            placeholder={placeholder}
            width={width}
            minWidth={minWidth}
            flex={1}
            gap={8}
            marginBottom={10}
            borderRadius={10}
            paddingVertical={0}
            paddingHorizontal={10}
            borderWidth={1}
            keyboardType={type}
          />
          <Text color={"red"}>{fieldState.error?.message}</Text>
        </View>
      )}
    />
  );
};
