import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: "#0f172a", padding: 16 }}>
      {children}
    </View>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: "#111827",
        padding: 16,
        borderRadius: 14,
        marginBottom: 12,
      }}
    >
      {children}
    </View>
  );
}

export function BigButton({
  label,
  onPress,
  color,
}: {
  label: string;
  onPress: () => void;
  color: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <Text style={{ color: "white", fontSize: 20, fontWeight: "800" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function Input({ value, onChangeText, placeholder, keyboardType }: any) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#9ca3af"
      keyboardType={keyboardType}
      style={{
        color: "white",
        backgroundColor: "#1f2937",
        padding: 12,
        borderRadius: 10,
      }}
    />
  );
}
