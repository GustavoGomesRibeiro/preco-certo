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
        shadowColor="#000"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.25}
        shadowRadius={3.84}
        elevation={5}
        onPress={() => {
          router.navigate("/(stack)/formulario-base");
          // fetchAlimentos("abacaxi");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
