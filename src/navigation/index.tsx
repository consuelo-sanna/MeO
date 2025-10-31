import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import HomeScreen from "./screens/HomeScreen";
import SitesScreen from "./screens/SitesScreen";
import SummaryScreen from "./screens/SummaryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#0b1220" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Cantiere" }}
      />
      <Stack.Screen
        name="Sites"
        component={SitesScreen}
        options={{ title: "Seleziona cantiere" }}
      />
      {/* <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{ title: "Attività" }}
      /> */}
      <Stack.Screen
        name="Summary"
        component={SummaryScreen}
        options={{ title: "Riepilogo" }}
      />
    </Stack.Navigator>
  );
}
