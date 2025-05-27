import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import { View } from "react-native";
import { Input, Label } from "tamagui";

type InputTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  label?: string;
  fieldName: TName;
  control: Control<TFieldValues>;
  placeholder?: string;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

export const InputText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  placeholder,
  fieldName,
  control,
  label,
}: InputTextProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={{ flex: 1 }}>
          <Label htmlFor={label} fontWeight="bold">
            {label}
          </Label>
          <Input
            borderWidth={2}
            borderColor="grey"
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            width={300}
            minWidth={300}
            flex={1}
            gap={8}
            marginBottom={10}
          />
        </View>
      )}
    />
  );
};
