import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigation } from "@react-navigation/native"; 
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


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
  const jsonPayload = atob(base64);
  return JSON.parse(jsonPayload);
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signed: false,
  loading: false,
  signIn: () => {},
  signOut: () => {},
  eventos: [],
  RelembrarSenha: false,
  setRelembrarSenha: () => {},
  nomeAdmin: null,
  cadastrarEvento: () => {},
  AtualizarEvento: () => {},
  deletarEvento: () => {},
  eventoId: null,
  setEventoId: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [eventos, setEventos] = useState<any[]>([]);
  const [eventoId, setEventoId] = useState<string | null>(null);
  const [nomeAdmin, setNomeAdmin] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [RelembrarSenha, setRelembrarSenha] = useState<boolean>(false);


  const signIn = async (data: { email: string; senha: string }) => {
    setLoading(true); 
    try {
  
      const response = await axios.post("http://localhost:8080/login", {
        email: data.email,
        senha: data.senha,
      });

      const token = response.data;
      console.log("Token recebido:", token);

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
      setLoading(false);  
      navigation.navigate("Dashboard");  

    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);  
    }
  };

 // Buscar nome do admin
 useEffect(() => {
  const fetchNomeAdmin = async () => {
    if (user && user.idAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/${user.idAdmin}`
        );
        if (response.status === 200) {
          setNomeAdmin(response.data.nome);
        }
      } catch (error) {
        console.error('Erro ao buscar o nome do admin:', error);
      }
    }
  };

  fetchNomeAdmin();
}, [user]);



  useEffect(() => {
    if (user && user.idAdmin) {
      console.log("Buscando eventos para o admin com id:", user.idAdmin); // Verifica se o código está sendo executado
      fetchEventos(user.idAdmin);
    }
  }, [user]);

// Buscar eventos
const fetchEventos = async (idAdmin: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/evento/eventos/${idAdmin}`
    );

    console.log("Resposta da API para eventos:", response.data); // Log da resposta da API
    if (response.status === 200) {
      setEventos(response.data);
      if (response.data.length > 0) {
        setEventoId(response.data[0].idEvento);
      } else {
        setEventoId(null);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
  }
};



  // Cadastrar evento
  const cadastrarEvento = async (eventData: any) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/evento/cadastrar?adminId=${user?.idAdmin}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        fetchEventos(user?.idAdmin || '');
        setEventoId(response.data.idEvento);
        console.log('Evento criado com sucesso:', response.data);
      }
    } catch (error) {
      console.error('Erro ao criar evento:');
    }
  };
  

   // Atualizar evento
   const AtualizarEvento = async (eventoId: string, eventData: any) => {
    if (!eventoId || !eventData) {
      console.error('ID ou dados do evento não fornecidos.');
      return;
    }

    try {
      const eventoDataAtualizado = {
        date: eventData.date,
        localizacao: eventData.localizacao,
      };

      const response = await axios.put(
        `http://localhost:8080/evento/atualizar/${eventoId}`,
        eventoDataAtualizado,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Evento atualizado com sucesso', response.data);
        fetchEventos(user?.idAdmin || '');
      }
    } catch (error) {
      console.error('Erro ao atualizar evento:');
    }
  };

//deletar
  const deletarEvento = async (eventoId: string) => {
    if (!eventoId) {
      console.error('ID do evento não fornecido para exclusão.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8080/evento/${eventoId}`, {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        fetchEventos(user?.idAdmin || '');
        console.log('Evento excluído com sucesso', response.data);
      }
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  };



  // Função de logout
  const signOut = async () => {
    setUser(null);
    AsyncStorage.clear();  
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
        cadastrarEvento,
        AtualizarEvento,
        deletarEvento,
        eventoId,
        setEventoId,
      }}
    >
     {children}
    </AuthContext.Provider>
  );
};