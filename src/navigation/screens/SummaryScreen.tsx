import { Card, Screen } from "@/components/UI";
import { useAppStore } from "@/store/useAppStore";
import { RootStackParamList } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Alert, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export default function SummaryScreen(
  _props: NativeStackScreenProps<RootStackParamList, "Summary">
) {
  const { shifts, workLogs } = useAppStore();
  const today = new Date();
  const start = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  const dayShifts = shifts.filter(
    (s: { clockInAt: string | number | Date }) =>
      new Date(s.clockInAt) >= start && new Date(s.clockInAt) < end
  );
  const shiftIds = new Set(dayShifts.map((s: { id: any }) => s.id));
  const dayLogs = workLogs.filter((w: { shiftId: unknown }) =>
    shiftIds.has(w.shiftId)
  );

  const totalMinutes = dayShifts.reduce(
    (
      acc: number,
      s: {
        clockOutAt: string | number | Date;
        clockInAt: string | number | Date;
      }
    ) => {
      const out = s.clockOutAt ? new Date(s.clockOutAt) : new Date();
      return (
        acc +
        Math.max(
          0,
          Math.round((out.getTime() - new Date(s.clockInAt).getTime()) / 60000)
        )
      );
    },
    0
  );

  function toCSV() {
    const esc = (v: any) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
    const header = [
      "data",
      "shiftId",
      "clockIn",
      "clockOut",
      "activity",
      "qty",
      "unit",
      "note",
    ];
    const rows = dayLogs.map(
      (l: {
        shiftId: any;
        activity: any;
        quantity: any;
        unit: any;
        note: any;
      }) => [
        start.toISOString().slice(0, 10),
        l.shiftId,
        dayShifts.find((s: { id: any }) => s.id === l.shiftId)?.clockInAt ?? "",
        dayShifts.find((s: { id: any }) => s.id === l.shiftId)?.clockOutAt ??
          "",
        l.activity,
        l.quantity ?? "",
        l.unit ?? "",
        l.note ?? "",
      ]
    );
    const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("");
    return csv;
  }

  async function exportCSV() {
    try {
      const csv = toCSV();
      const path =
        FileSystem.cacheDirectory +
        `riepilogo_${start.toISOString().slice(0, 10)}.csv`;
      await FileSystem.writeAsStringAsync(path, csv, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path);
      } else {
        Alert.alert("CSV creato", path);
      }
    } catch (e) {
      Alert.alert("Errore export", String(e));
    }
  }

  const grouped: Record<string, { qty: number; unit: string }> = {};
  dayLogs.forEach((l) => {
    const key = `${l.activity}_${l.unit}`;
    if (!grouped[key]) grouped[key] = { qty: 0, unit: l.unit || "" };
    grouped[key].qty += l.quantity || 0;
  });

  return (
    <Screen>
      <Card>
        <Text style={{ color: "white", fontWeight: "800", fontSize: 18 }}>
          Riepilogo di oggi
        </Text>
        <Text style={{ color: "#9ca3af", marginTop: 6 }}>
          {today.toLocaleDateString()}
        </Text>
        <Text style={{ color: "white", marginTop: 8 }}>
          Ore totali: {(totalMinutes / 60).toFixed(2)}
        </Text>
      </Card>

      <Text style={{ color: "#9ca3af", marginVertical: 8 }}>
        Quantità per attività
      </Text>
      {Object.entries(grouped).map(([key, v]) => (
        <Card key={key}>
          <Text style={{ color: "white" }}>
            {key.split("_")[0]} — {v.qty} {v.unit}
          </Text>
        </Card>
      ))}

      <TouchableOpacity
        onPress={exportCSV}
        style={{
          backgroundColor: "#a855f7",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Esporta CSV</Text>
      </TouchableOpacity>
    </Screen>
  );
}
