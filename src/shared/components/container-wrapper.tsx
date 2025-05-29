import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { RefObject } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type ContainerWrapperProps = {
  children: React.ReactNode;
  scrollViewRef?: RefObject<ScrollView | null>;
};

export const ContainerWrapper: React.FC<ContainerWrapperProps> = ({
  children,
  scrollViewRef,
}) => {
  const theme = useColorScheme() ?? "light";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboard}
    >
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
        <SafeAreaProvider>
          <SafeAreaView>
            <ScrollView ref={scrollViewRef}>{children}</ScrollView>
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
