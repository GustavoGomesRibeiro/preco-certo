// import { CameraView, useCameraPermissions } from "expo-camera";
// import { useEffect, useState } from "react";
// import { Alert, Button, StyleSheet, Text, View } from "react-native";

// export default function QRCodeScanner() {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const [qrData, setQrData] = useState("");

//   useEffect(() => {
//     if (permission?.status === null) {
//       requestPermission();
//     }
//   }, []);

//   const handleBarCodeScanned = ({
//     data,
//     type,
//   }: {
//     data: string;
//     type: string;
//   }) => {
//     if (!scanned) {
//       setScanned(true);
//       setQrData(data);
//       console.log("QR Code:", data);
//       Alert.alert("QR Code lido!", data);
//     }
//   };

//   if (!permission?.granted) {
//     return (
//       <View style={styles.centered}>
//         <Text>Precisamos da sua permissão para usar a câmera.</Text>
//         <Button title="Permitir Câmera" onPress={requestPermission} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <CameraView
//         barcodeScannerSettings={{
//           barcodeTypes: ["qr"], // Isso é suficiente para NFC-e / SAT
//         }}
//         onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={styles.camera}
//       />

//       {scanned && (
//         <View style={styles.bottomPanel}>
//           <Text style={styles.result}>Resultado: {qrData}</Text>
//           <Button
//             title="Escanear novamente"
//             onPress={() => setScanned(false)}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   camera: {
//     flex: 1,
//   },
//   centered: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   bottomPanel: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   result: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
// });
// NotaFiscalScanner.tsx
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Tesseract from "tesseract.js";

type Produto = {
  quantidade: number;
  nome: string;
  preco: number;
};

export default function NotaFiscalScanner() {
  const [carregando, setCarregando] = useState(false);
  const [textoOCR, setTextoOCR] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const selecionarImagem = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      processarImagem(uri);
    }
  };

  const processarImagem = async (uri: string) => {
    setCarregando(true);
    setTextoOCR("");
    setProdutos([]);

    try {
      const { data } = await Tesseract.recognize(uri, "por", {
        logger: (m) => console.log(m),
      });

      const texto = data.text;
      setTextoOCR(texto);

      const produtosExtraidos = extrairProdutos(texto);
      setProdutos(produtosExtraidos);
    } catch (error) {
      console.error("Erro ao processar OCR:", error);
    }

    setCarregando(false);
  };

  const extrairProdutos = (texto: string): Produto[] => {
    const linhas = texto
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const produtos: Produto[] = [];

    for (const linha of linhas) {
      const match = linha.match(/(\d+)(x|\s)\s*(.+?)\s*R\$?\s*(\d+[.,]\d{2})/i);

      if (match) {
        produtos.push({
          quantidade: parseInt(match[1]),
          nome: match[3].trim(),
          preco: parseFloat(match[4].replace(",", ".")),
        });
      }
    }

    return produtos;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Scanner de Nota Fiscal</Text>

      <Button title="Tirar Foto do Cupom" onPress={selecionarImagem} />

      {carregando && (
        <ActivityIndicator size="large" style={{ marginVertical: 16 }} />
      )}

      {!carregando && produtos.length > 0 && (
        <View style={styles.resultado}>
          <Text style={styles.subtitle}>🧾 Produtos encontrados:</Text>
          {produtos.map((produto, index) => (
            <View key={index} style={styles.produto}>
              <Text>
                {produto.quantidade}x {produto.nome}
              </Text>
              <Text>R$ {produto.preco.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}

      {!carregando && textoOCR && produtos.length === 0 && (
        <View style={styles.resultado}>
          <Text style={styles.subtitle}>Texto bruto:</Text>
          <Text style={{ fontSize: 12, color: "#666" }}>{textoOCR}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  resultado: {
    marginTop: 24,
  },
  produto: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
