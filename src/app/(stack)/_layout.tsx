import { Stack } from "expo-router";

const LayoutStack = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="formulario-base/index"
        options={{ title: "Formulario" }}
      />
    </Stack>
  );
};

export default LayoutStack;
