import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const TABS = ["Home", "Profile", "Settings"];

type SlidingTabsProps = {
  children: React.ReactNode;
};
export const SlidingTabs: React.FC<SlidingTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    translateX.value = withTiming(-index * width, { duration: 300 });
  };

  const tabStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.tabBar}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(index)}
            style={[
              styles.tabButton,
              activeTab === index && styles.activeTabButton,
            ]}
          >
            <Text
              style={{
                color: activeTab === index ? "#fff" : "#000",
                fontWeight: "bold",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View style={[styles.tabsContainer, tabStyle]}>
        {children}
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#0077cc",
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  activeTabButton: {
    backgroundColor: "#005fa3",
  },
  tabsContainer: {
    flexDirection: "row",
    width: width * TABS.length,
  },
  tabPage: {
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
