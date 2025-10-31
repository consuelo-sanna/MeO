import React, { useMemo, useState } from "react";
import { Screen, Input } from "@/components/UI";
// import { BarCodeScanner } from "expo-barcode-scanner";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { TouchableOpacity, Text, Modal, View, FlatList } from "react-native";
import { useAppStore } from "@/store/useAppStore";

export default function SitesScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Sites">) {
  const { sites, currentSiteId, setSite } = useAppStore();
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      sites.filter((s: { nome: string }) =>
        s.nome.toLowerCase().includes(q.toLowerCase())
      ),
    [q, sites]
  );

  const [scannerOpen, setScannerOpen] = useState(false);

  // useEffect(() => {
  //   if (!scannerOpen) return;
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   })();
  // }, [scannerOpen]);

  // function onScanned({ data }: { data: string }) {
  //   const found = sites.find((s: { qr: string }) => s.qr && s.qr === data);
  //   if (found) {
  //     setSite(found.id);
  //     setScannerOpen(false);
  //     navigation.goBack();
  //   } else {
  //     alert("QR non riconosciuto");
  //   }
  // }

  return (
    <Screen>
      <Input value={q} onChangeText={setQ} placeholder="Cerca cantiere…" />
      <FlatList
        style={{ marginTop: 12 }}
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSite(item.id);
              navigation.goBack();
            }}
            style={{
              padding: 16,
              backgroundColor:
                item.id === currentSiteId ? "#374151" : "#111827",
              borderRadius: 12,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              {item.nome}
            </Text>
            {!!item.indirizzo && (
              <Text style={{ color: "#9ca3af" }}>{item.indirizzo}</Text>
            )}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        onPress={() => setScannerOpen(true)}
        style={{
          padding: 14,
          backgroundColor: "#3b82f6",
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>Scansiona QR</Text>
      </TouchableOpacity>

      <Modal visible={scannerOpen} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <TouchableOpacity
            onPress={() => setScannerOpen(false)}
            style={{
              position: "absolute",
              bottom: 40,
              alignSelf: "center",
              backgroundColor: "#3b82f6",
              padding: 14,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Chiudi</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Screen>
  );
}
