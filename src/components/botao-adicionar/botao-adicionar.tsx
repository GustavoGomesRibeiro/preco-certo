import { CircleFadingPlus } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button } from "tamagui";
export const BotaoAdicionar = () => {
  return (
    <Button
      icon={<CircleFadingPlus size={24} color="#fff" />}
      width={70}
      height={70}
      borderRadius={40}
      backgroundColor={"#ea1d2c"}
      onPress={() => router.navigate("/(stack)/formulario-base")}
    />
  );
};
