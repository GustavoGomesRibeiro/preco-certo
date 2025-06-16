import { ArrowLeft } from "lucide-react-native";
import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "tamagui";

type BackButtonProps = {
  navigate: () => void;
  title: string;
};
const BackButton: FC<BackButtonProps> = ({ title, navigate }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate()}>
        <ArrowLeft size={32} color={"#000"} />
      </TouchableOpacity>
      <Text fontSize={22} fontWeight={"bold"}>
        {title}
      </Text>
      <Text></Text>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingBottom: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
