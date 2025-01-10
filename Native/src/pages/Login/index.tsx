import React, { useState } from "react";
import {Alert,Keyboard,Text,TouchableOpacity,TouchableWithoutFeedback,View,Image,} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../../components/TextInput";
import { ButtonTypes } from "../../components/ButtonTypes";
import ImageLogo from "../../../assets/FundoLogin.jpg"


export const Login = () => {

  
  const [email, setEmail] = useState<string>('');
  const [senha, setsenha] = useState<string>('');
  const navigation = useNavigation();

  const handleLogin = () => {
    Alert.alert("Botão para realizar login");
    console.log('Pegando informações', email, senha)
  }

  const handlesenha = (value: string) => {
    setsenha(value);
  }

  const handleEmail = (value: string) => {
    setEmail(value);
  }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.LoginContainer}>
      <View style={styles.boxForms}>
    <Image
          style={styles.ImageLogo}
          source={ImageLogo}
          alt="Imagem da logo"
        />
           <Text style={styles.Titulo}>
             Gerenciador de Eventos
            </Text> 
          <View style={{ marginTop: 50}} />

          <TextInputField
            placeHolder="Email"
            valueInput={email}
            hadleFunctionInput={handleEmail}
            typeIcon="person"
            />

          <TextInputField
            placeHolder="Senha"
            valueInput={senha}
            hadleFunctionInput={handlesenha}
            typeIcon="password"
            />

          <ButtonTypes 
            title="Login" 
            handleFunction={handleLogin}
            />
            
         <Text style={styles.or}>
         Ainda não tem cadastro?
          </Text>

          <TouchableOpacity 
          style={styles.criarNovaContaButton} 
          onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.textAccount}>Cadastre-se</Text>
          </TouchableOpacity>
    </View>
    </View>
   </TouchableWithoutFeedback>
  )
}
  