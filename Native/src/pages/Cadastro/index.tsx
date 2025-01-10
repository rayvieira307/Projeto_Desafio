import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import { styles } from "./style"; // Importando os estilos que você criou
import Image2 from "../../../assets/cadastro.png"

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmasenha: string;
}
export const Cadastro = () => {
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmasenha: "",
  });


  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.senha !== formData.confirmasenha) {
      setMessage("Senha e Confirma Senha não são iguais.");
      return;
    }

    const dataToSend = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
    };

    try {
      const response = await axios.post("http://localhost:8080/admin", dataToSend);
      setMessage("Cadastro realizado com sucesso!");
      console.log("Cadastro realizado:", response.data);
    } catch (error) {
      console.error("Erro ao realizar o cadastro:", error);
      setMessage("Erro ao realizar o cadastro. Tente novamente.");
    }
  };

  return (
    <>
    <View style={styles.container}>
   <Text style={styles.text}>Preencha os Campos</Text>
   <Text style={styles.text}> Cadastre-se</Text>
      <Image
        style={styles.logo}
        source={Image2} 
        alt="Icone de cadastrar"
      />
      <View style={styles.boxMid}>
        {/* Nome */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={formData.nome}
          onChangeText={(text) => handleChange("nome", text)}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />

        {/* Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(text) => handleChange("senha", text)}
        />

        {/* Confirmar Senha */}
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={formData.confirmasenha}
          onChangeText={(text) => handleChange("confirmasenha", text)}
        />

        {/* Mensagem de erro ou sucesso */}
      </View>

      {/* Botão de Enviar */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
        {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
    </>
  );
};