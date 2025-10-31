import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { useAppStore } from "@/store/useAppStore";
import { Alert, Text, View } from "react-native";
import { BigButton, Card, Screen } from "@/components/UI";

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  const [now, setNow] = useState(new Date());
  const { openShift, clockIn, clockOut, currentSiteId, sites } = useAppStore();
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const site = currentSiteId
    ? sites.find((s: { id: any }) => s.id === currentSiteId) ?? null
    : null;
  const siteName = site ? site.nome : "Seleziona cantiere";

  function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // m
    const toRad = (d: number) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async function handleClockIn() {
    if (!site) {
      Alert.alert(
        "Seleziona cantiere",
        "Devi scegliere un cantiere prima di timbrare."
      );
      return;
    }
    if (site.geo) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permesso richiesto",
          "Serve l'accesso alla posizione per timbrare in questo cantiere."
        );
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const dist = haversine(
        pos.coords.latitude,
        pos.coords.longitude,
        site.geo.lat,
        site.geo.lng
      );
      const limit = site.geo.radius || 150;
      if (dist > limit) {
        Alert.alert(
          "Fuori area cantiere",
          `Distanza ~${Math.round(
            dist
          )} m (limite ${limit} m). Avvicìnati e riprova.`
        );
        return;
      }
    }
    clockIn();
  }

  return (
    <Screen>
      <View style={{ alignItems: "center", marginVertical: 24 }}>
        <Text style={{ color: "white", fontSize: 44, fontWeight: "800" }}>
          {now.toLocaleTimeString()}
        </Text>
        <Text style={{ color: "#9ca3af" }}>{now.toLocaleDateString()}</Text>
      </View>

      <Card>
        <Text style={{ color: "white", fontWeight: "700" }}>Cantiere</Text>
        <Text style={{ color: "#9ca3af", marginTop: 4 }}>{siteName}</Text>
        <BigButton
          label="Cambia cantiere"
          onPress={() => navigation.navigate("Sites")}
          color="#3b82f6"
        />
      </Card>

      {!openShift ? (
        <BigButton label="ENTRO" onPress={handleClockIn} color="#10b981" />
      ) : (
        <BigButton
          label="ESCO"
          onPress={() => {
            clockOut();
            navigation.navigate("Summary");
          }}
          color="#ef4444"
        />
      )}

      <BigButton
        label="Attività"
        onPress={() => navigation.navigate("Activity")}
        color="#2563eb"
      />
      <BigButton
        label="Riepilogo"
        onPress={() => navigation.navigate("Summary")}
        color="#a855f7"
      />

      {openShift && (
        <Card>
          <Text style={{ color: "white", fontWeight: "700" }}>
            Turno attivo
          </Text>
          <Text style={{ color: "#9ca3af" }}>
            Entrata: {new Date(openShift.clockInAt).toLocaleTimeString()}
          </Text>
        </Card>
      )}

      <View style={{ marginTop: "auto", alignItems: "center" }}>
        <Text style={{ color: "#6b7280", fontSize: 12 }}>
          Offline pronto – sincronizza quando c&apos;è rete
        </Text>
      </View>
    </Screen>
  );
}
