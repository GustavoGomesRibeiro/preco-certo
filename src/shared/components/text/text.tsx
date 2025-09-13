import { fontSizes, TextProps } from "@/src/shared/components/text/text-types";
import { scaleFont } from "@/src/shared/utils/responsive";
import { FC } from "react";
import { Text as RnText } from "react-native";

export const Text: FC<TextProps> = ({
  children,
  style,
  variant = "base",
  ...props
}) => {
  return (
    <RnText
      {...props}
      style={[{ fontSize: scaleFont(fontSizes[variant]) }, style]}
    >
      {children}
    </RnText>
  );
};
