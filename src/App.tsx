import "react-native-gesture-handler";
import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigator } from "./navigation";

const DarkTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0f172a",
    card: "#0b1220",
    text: "#ffffff",
    border: "#1f2937",
    primary: "#3b82f6",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
