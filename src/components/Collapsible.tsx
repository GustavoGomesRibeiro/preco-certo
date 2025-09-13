import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { IconSymbol } from "@/src/components/ui/IconSymbol";
import { TokenColors } from "@/src/shared/constants/token-colors";
import { useColorScheme } from "nativewind";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { colorScheme } = useColorScheme() ?? "light";

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={
            colorScheme === "light"
              ? TokenColors.light.icon
              : TokenColors.dark.icon
          }
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
