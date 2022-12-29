import { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from "react-native";
import api from "./src/services/api";

export default function App() {
  const [cep, setCep] = useState("");
  const [cepUser, setCepUser] = useState(null);
  const inputRef = useRef(null);

  async function buscarCep() {
    if (cep == "") {
      alert("Digite um CEP válido.");
      setCep("");
      return;
    }
    try {
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
    } catch (error) {
      console.log("Error " + error);
    }
  }

  function limparCep() {
    setCep("");
    setCepUser(null);
    inputRef.current.focus();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.text}>Digite o CEP desejado.</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 13733-558"
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType="numeric"
          ref={inputRef}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: "#1d75cd" }]}
          onPress={buscarCep}
        >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={limparCep}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {cepUser && (
        <View style={styles.resultado}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: { marginTop: 25, marginBottom: 15, fontSize: 25, fontWeight: "bold" },
  input: {
    backgroundColor: "#EEE",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    width: "90%",
    padding: 10,
    fontSize: 18,
  },
  areaBtn: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-around",
  },
  botao: {
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#cd3e1d",
  },
  botaoText: {
    fontSize: 20,
    color: "#FFF",
  },
  resultado: { flex: 1, justifyContent: "center", alignItems: "center" },
  itemText: { fontSize: 22 },
});
