import React, { useState, useEffect, useContext } from "react";
import {Keyboard,Text,TouchableOpacity,TouchableWithoutFeedback,View,Image,} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../../components/TextInput";
import { ButtonTypes } from "../../components/ButtonTypes";
import ImageLogo from "../../../assets/FundoLogin.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../../components/Modal";
import { AuthContext } from "../../hooks/Auth";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const { signIn } = useAuth();
  const {RelembrarSenha, setRelembrarSenha } = useContext(AuthContext);
  const navigation = useNavigation();
  const [message, setMessage] = useState("");  
  const [isModalVisible, setIsModalVisible] = useState(false);


  useEffect(() => {

    const loadCredentials = async () => {
    if (RelembrarSenha) {
        const salvarEmail = await AsyncStorage.getItem("email");
        const salvarSenha = await AsyncStorage.getItem("senha");
  
        if (salvarEmail && salvarSenha) {
          setEmail(salvarEmail);
          setSenha(salvarSenha);
        }
      };
    }
    loadCredentials();
  }, [RelembrarSenha]);

  const handleLogin = () => {
    if (!email || !senha) {
      setMessage("Erro ao fazer login. Tente novamente. Verifique se os campos estão preenchidos! Ou se as credenciais estão corretas!");
      setIsModalVisible(true);
      return; 
    }
  
    signIn({ email, senha });
    if (RelembrarSenha) {
      
     AsyncStorage.setItem("email", email);
     AsyncStorage.setItem("senha", senha);
    }
  };
  
  const handleCheckboxChange = () => {
    setRelembrarSenha(!RelembrarSenha);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.LoginContainer}>
        <View style={styles.boxForms}>
          <Image
            style={styles.ImageLogo}
            source={ImageLogo}
            alt="Imagem da logo"
          />
          <Text style={styles.Titulo}>Gerenciador de Eventos</Text>
          <View style={{ marginTop: 50 }} />

          <TextInputField
            placeHolder="Email"
            valueInput={email}
            hadleFunctionInput={(value: string) => setEmail(value)}
            typeIcon="person"
          />

          <TextInputField
            placeHolder="Senha"
            valueInput={senha}
            hadleFunctionInput={(value: string) => setSenha(value)}
            typeIcon="password"
          />

          <View>
            <TouchableOpacity
            onPress={handleCheckboxChange}
            >
              <Image
                source={
                  RelembrarSenha
                    ? require("../../../assets/marcado.jpg")
                    : require("../../../assets/desmarcado.jpg")
                }
                style={{ width: 20, height: 20, marginRight: 130, marginTop: 22 }}
              />
            </TouchableOpacity>
          </View>
            <Text style ={{marginTop: -23, marginLeft: 20, fontSize: 18}}>Lembrar senha</Text>

            <ButtonTypes title="Login" handleFunction={handleLogin} />

          <Text style={styles.or}>Ainda não tem cadastro?</Text>

          <TouchableOpacity
            style={styles.criarNovaContaButton}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={styles.textAccount}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <Modal isOpen={isModalVisible} onClose={() => {setIsModalVisible(false); setMessage("");}}>
          <Text style={styles.modalMessage}>{message}</Text>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
