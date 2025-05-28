import { Stack } from "expo-router";

const LayoutStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="formulario-base/index"
        options={{ title: "Formulario" }}
      />
      <Stack.Screen
        name="lista-produtos-base/index"
        options={{ title: "Lista de Produtos" }}
      />
      <Stack.Screen
        name="lista-receitas/index"
        options={{ title: "Lista de Receitas" }}
      />
    </Stack>
  );
};

export default LayoutStack;
