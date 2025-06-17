import { Edit3, Trash2 } from "@tamagui/lucide-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
type Props = {
  onEditar: () => void;
  onExcluir: () => void;
};

const SwipeableActions: React.FC<Props> = ({ onEditar, onExcluir }) => {
  return (
    <View style={styles.actionsContainer}>
      <Pressable
        onPress={() => onEditar()}
        style={[styles.actionButton, { backgroundColor: "#016adf" }]}
      >
        <Edit3 size={24} color={"white"} />
        <Text style={styles.actionText}>Editar</Text>
      </Pressable>
      <Pressable
        onPress={() => onExcluir()}
        style={[styles.actionButton, { backgroundColor: "#ff3b30" }]}
      >
        <Trash2 size={24} color={"white"} />
        <Text style={styles.actionText}>Excluir</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height: 100,
  },
  actionButton: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editarButton: {
    backgroundColor: "#016adf",
  },
  excluirButton: {
    backgroundColor: "#ff3b30",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});

export default SwipeableActions;
