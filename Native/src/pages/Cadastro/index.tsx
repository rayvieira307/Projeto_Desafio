import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import { styles } from "./style"; // Importando os estilos que você criou
import Image2 from "../../../assets/cadastro.png"
import { useNavigation } from "@react-navigation/native";
import Modal from "../../components/Modal";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmasenha: string;
}
export const Cadastro = () => {

  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

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
      setIsModalVisible(true);
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
      setIsModalVisible(true); 
      console.log("Cadastro realizado:", response.data);
      navigation.navigate('Login');
    } catch (error) {
      
      console.error("Erro ao realizar o cadastro:", error);
      setMessage("Erro ao realizar o cadastro. Tente novamente.");
      setIsModalVisible(true); 
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
       
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={formData.nome}
          onChangeText={(text) => handleChange("nome", text)}
        />

       
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />

       
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(text) => handleChange("senha", text)}
        />

        
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={formData.confirmasenha}
          onChangeText={(text) => handleChange("confirmasenha", text)}
        />

        
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <Modal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <Text style={styles.modalMessage} >{message}</Text>
      </Modal>
      
    </View>
    </>
  );
};