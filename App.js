import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { firebase } from "./src/firebaseConnection";

console.disableYellowBox = true; //para retirar o aviso de warning

export default function App() {
  const [nome, setNome] = useState("");
  // const [idade, setIdade] = useState("");
  const [cargo, setCargo] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function dados() {
      //     //Olheiro da nossa database
      //     await firebase
      //       .database()
      //       .ref("usuarios/2")
      //       .on("value", (snapshot) => {
      //         setNome(snapshot.val().nome);
      //         setIdade(snapshot.val().idade);
      //       });
      //     // await firebase.database().ref('nome').once('value', (snapshot)=> {
      //     //   setNome(snapshot.val());
      //     // });
      //CRIAR UM NÓ
      // async function dados() {
      //   await firebase.database().ref("tipo").set("Cliente");
      // }
      // REMOVE UM NÓ
      // await firebase.database().ref("tipo").remove();
      //INSERIR MAIS DADOS
      // await firebase.database().ref("usuarios").child(3).set({
      //   nome: "Júnior",
      //   cargo: "Desenvolvedor Backend",
      // });
      //EDITAR INFORMAÇÃO
      // await firebase.database().ref("usuarios").child(3).update({
      //   nome: "Jose Augusto",
      // });

      //LISTAR AS INFORMAÇÕES
      await firebase
        .database()
        .ref("usuarios")
        .on("value", (snapshot) => {
          snapshot.forEach((chilItem) => {
            let data = {
              key: chilItem.key,
              nome: chilItem.val().nome,
              cargo: chilItem.val().cargo,
            };
            setUsuarios([...usuarios, data]);
          });
        });
    }

    dados();
  }, []);

  async function cadastrar() {
    if ((nome !== "") & (cargo !== "")) {
      let usuarios = await firebase.database().ref("usuarios");
      let chave = usuarios.push().key; //gera uma chave aleatória

      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo,
      });

      alert("cadastrado com sucesso");
      setCargo("");
      setNome("");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => {
          setNome = texto;
        }}
        value={nome}
      />

      <Text style={styles.texto}>Cargo</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => {
          setCargo = texto;
        }}
        value={cargo}
      />

      <Button title="Novo Funcinário" onPress={cadastrar} />
      <FlatList
        keyExtractor={(item) => item.key}
        data={usuarios}
        renderItem={({ item }) => <Listagem data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },

  texto: {
    fontsize: 20,
  },

  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#121212",
    height: 45,
    fontsize: 17,
  },
});
