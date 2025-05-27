import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { StyleSheet, View } from "react-native";

type ContainerWrapperProps = {
  children: React.ReactNode;
};

export const ContainerWrapper: React.FC<ContainerWrapperProps> = ({
  children,
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "light"
              ? Colors.light.background
              : Colors.dark.background,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
