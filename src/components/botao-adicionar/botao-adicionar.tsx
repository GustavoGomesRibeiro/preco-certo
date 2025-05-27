import { CircleFadingPlus } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "tamagui";
export const BotaoAdicionar = () => {
  return (
    <View style={[styles.container]}>
      <Button
        icon={<CircleFadingPlus size={32} color="#fff" />}
        width={70}
        height={70}
        borderRadius={40}
        backgroundColor={"#ea1d2c"}
        onPress={() => router.navigate("/(stack)/formulario-base")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 600,
    left: 270,
    zIndex: 1000,
  },
});
