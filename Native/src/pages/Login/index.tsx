import React, { useState, useEffect } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { TextInputField } from "../../components/TextInput";
import { ButtonTypes } from "../../components/ButtonTypes";
import ImageLogo from "../../../assets/FundoLogin.jpg";
import { useAuth } from "../../hooks/useAuth"; // Use o hook para acessar o contexto de autenticação

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [lembrarSenha, setLembrarSenha] = useState<boolean>(false);
  const { signIn, setRelembrarSenha } = useAuth(); // Usando o hook para acessar o contexto de autenticação
  const navigation = useNavigation();

  useEffect(() => {
    const checkSavedCredentials = () => {
      const savedEmail = localStorage.getItem("email");
      const savedSenha = localStorage.getItem("senha");
      const savedRelembrarSenha = localStorage.getItem("RelembrarSenha");

      if (savedEmail && savedSenha && savedRelembrarSenha === "true") {
        setEmail(savedEmail);
        setSenha(savedSenha);
        setLembrarSenha(true);
      }
    };

    checkSavedCredentials();
  }, []);

  const handleLogin = () => {
    if (email && senha) {
      signIn({ email, senha }); // Chamando o signIn do contexto
    } else {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
    }
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

          {/* Checkbox para lembrar senha */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              onPress={() => {
                const newValue = !lembrarSenha;
                setLembrarSenha(newValue);
                setRelembrarSenha(newValue); // Atualiza o estado do contexto
              }}
            >
              <Image
                source={
                  lembrarSenha
                    ? require("../../../assets/logo.png")
                    : require("../../../assets/logo.png")
                }
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
            <Text>Lembrar senha</Text>
          </View>

          <ButtonTypes title="Login" handleFunction={handleLogin} />

          <Text style={styles.or}>Ainda não tem cadastro?</Text>

          <TouchableOpacity
            style={styles.criarNovaContaButton}
            onPress={() => navigation.navigate("Cadastro")}
          >
            <Text style={styles.textAccount}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
