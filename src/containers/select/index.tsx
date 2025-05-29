import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import React from "react";
import type { SelectProps } from "tamagui";
import { Adapt, Select as SelectUi, Sheet, YStack } from "tamagui";
import useFormStore from "../forms/store/form-store";

type ProdutoSelectProps = SelectProps & {
  value: string;
  onValueChange: (val: string) => void;
};

export function Select({ value, onValueChange, ...props }: ProdutoSelectProps) {
  const { produtos } = useFormStore();

  return (
    <SelectUi
      value={value}
      onValueChange={onValueChange}
      disablePreventBodyScroll
      {...props}
    >
      <SelectUi.Trigger maxWidth={220} iconAfter={ChevronDown}>
        <SelectUi.Value placeholder="Selecione um produto" />
      </SelectUi.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <SelectUi.Content zIndex={200000}>
        <SelectUi.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </SelectUi.ScrollUpButton>

        <SelectUi.Viewport minWidth={200}>
          <SelectUi.Group>
            <SelectUi.Label>Produtos base</SelectUi.Label>
            {produtos.map((item, i) => (
              <SelectUi.Item index={i} key={item.id} value={item.id.toString()}>
                <SelectUi.ItemText>{item.nome}</SelectUi.ItemText>
                <SelectUi.ItemIndicator marginLeft="auto">
                  <Check size={16} />
                </SelectUi.ItemIndicator>
              </SelectUi.Item>
            ))}
          </SelectUi.Group>
        </SelectUi.Viewport>
      </SelectUi.Content>
    </SelectUi>
  );
}
