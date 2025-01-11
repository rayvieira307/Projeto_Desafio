import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";  // Importa o hook de navegação
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definições de tipos
interface User {
  idAdmin: string;
  [key: string]: any;
}

interface AuthContextProps {
  user: User | null;
  signed: boolean;
  loading: boolean;
  signIn: (data: { email: string; senha: string }) => void;
  signOut: () => void;
  eventos: any[];
  RelembrarSenha: boolean;
  setRelembrarSenha: React.Dispatch<React.SetStateAction<boolean>>;
  nomeAdmin: string | null;
  cadastrarEvento: (eventData: any) => void;
  AtualizarEvento: (eventoId: string, eventData: any) => void;
  deletarEvento: (eventoId: string) => void;
  eventoId: string | null;
  setEventoId: React.Dispatch<React.SetStateAction<string | null>>;
}

const decodeToken = (token: string | null) => {
  if (!token) {
    console.error("Token inválido ou não fornecido");
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Token não tem o formato correto");
    return null;
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigation = useNavigation();  // Usando o hook de navegação
  const [user, setUser] = useState<User | null>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const [eventoId, setEventoId] = useState<string | null>(null);
  const [nomeAdmin, setNomeAdmin] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [RelembrarSenha, setRelembrarSenha] = useState<boolean>(false);

  // Função de login
  const signIn = async (data: { email: string; senha: string }) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: data.email,
        senha: data.senha,
      });

      const token = response.data;

      if (!token) {
        console.error("Token não recebido");
        return;
      }

      const decodedToken = decodeToken(token);

      if (RelembrarSenha) {
       AsyncStorage.setItem("email", data.email);
       AsyncStorage.setItem("senha", data.senha);
       AsyncStorage.setItem("RelembrarSenha", "true");
      } else {
       AsyncStorage.removeItem("email");
       AsyncStorage.removeItem("senha");
       AsyncStorage.removeItem("RelembrarSenha");
      }

     AsyncStorage.setItem("token", token);
      setUser(decodedToken);
      // Navegar para a tela de Dashboard
      navigation.navigate("Dashboard");

    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função de logout
  const signOut = () => {
    setUser(null);
   AsyncStorage.clear();
    // Navegar para a tela de Login
    navigation.navigate("Login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        signIn,
        signOut,
        eventos,
        RelembrarSenha,
        setRelembrarSenha,
        nomeAdmin,
        cadastrarEvento: () => {},
        AtualizarEvento: () => {},
        deletarEvento: () => {},
        eventoId,
        setEventoId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};