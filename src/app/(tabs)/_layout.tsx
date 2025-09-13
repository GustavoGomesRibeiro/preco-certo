import { HapticTab } from "@/src/components/HapticTab";
import TabBarBackground from "@/src/components/ui/TabBarBackground";
import { TokenColors } from "@/src/shared/constants/token-colors";
import { Tabs } from "expo-router";
import { Calculator, CirclePlus } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TokenColors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tela Inicial",
          tabBarIcon: ({ color, size }) => (
            <CirclePlus size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculadora"
        options={{
          title: "Calculadora",
          tabBarIcon: ({ color, size }) => (
            <Calculator size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="lucro"
        options={{
          title: "Lucro",
          tabBarIcon: ({ color, size }) => (
            <ChartLine size={size} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
