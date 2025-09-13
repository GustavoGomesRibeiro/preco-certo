import { ButtonProps } from "@/src/shared/components/button/button-types";
import { FC } from "react";
import { TouchableOpacity } from "react-native";

export const Button: FC<ButtonProps> = ({ handleSubmit, children }) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      className="flex-row items-center justify-center rounded-lg p-3 w-btn min-w-btn bg-btn shadow-custom"
    >
      {children}
    </TouchableOpacity>
  );
};
