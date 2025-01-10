import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const decodeToken = (token) => {
  if (!token) {
    console.error("Token inválido ou não fornecido");
    return null;  
  }

  const parts = token.split('.');  
  if (parts.length !== 3) {
    console.error("Token não tem o formato correto");
    return null;  
  }

  const base64Url = parts[1]; 
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [eventoId, setEventoId] = useState(null);
  const [nomeAdmin, setNomeAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [RelembrarSenha, setRelembrarSenha] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedRelembrarSenha = localStorage.getItem("RelembrarSenha");

    if (storedUser && storedToken && storedRelembrarSenha === "true") {
      setUser(JSON.parse(storedUser));
      setRelembrarSenha(true);
    }

    setLoading(false);
  }, []);

  //login
  const signIn = async (data) => {
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
      console.log("Decodificação do Token:", decodedToken);  
    
    
      if (RelembrarSenha) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("senha", data.senha);
        localStorage.setItem("RelembrarSenha", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("senha");
        localStorage.removeItem("RelembrarSenha");
      }
  
      localStorage.setItem("token", token);
      setUser(decodedToken);
      fetchEventos(decodedToken.idAdmin); 
  
      
      navigate("/dashboard");
  
    } catch (error) {
      console.error("Erro:", error);
    }
  }

//buscar nome admin
useEffect(() => {
  const fetchNomeAdmin = async () => {
    if (user && user.idAdmin) {
      try {
        const response = await axios.get(`http://localhost:8080/admin/${user.idAdmin}`);
        if (response.status === 200) {
          setNomeAdmin(response.data.nome); 
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do admin:", error);
      }
    }
  };

  fetchNomeAdmin();
}, [user]);

//buscar eventos
  const fetchEventos = async (idAdmin) => {
    try {
      const response = await axios.get(`http://localhost:8080/evento/eventos/${idAdmin}`);
      
      if (response.status === 200) {
        setEventos(response.data);  
  
      
        if (response.data.length > 0) {
          setEventoId(response.data[0].idEvento);
        } else {
          setEventoId(null);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error.response?.data || error.message);
    }
  };
  
//cadastrar eventos
  const cadastrarEvento = async (eventData) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/evento/cadastrar?adminId=${user.idAdmin}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchEventos(user.idAdmin);
        setEventoId(response.data.idEvento);
        console.log("Evento criado com sucesso:", response.data);
      }
    } catch (error) {
      console.error("Erro ao criar evento:", error.response?.data || error.message);
    }
  };

  // Função para atualizar um evento
  const AtualizarEvento = async (eventoId, eventData) => {
   
    if (!eventoId || !eventData) {
      console.error("ID ou dados do evento não fornecidos.");
      return;
    }
  
    try {
      const eventoDataAtualizado = {
        date: eventData.date,
        localizacao: eventData.localizacao,
      };
  
      console.log("Payload que será enviado para atualização:", eventoDataAtualizado);
  
      const response = await axios.put(
        `http://localhost:8080/evento/atualizar/${eventoId}`, 
        eventoDataAtualizado,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Evento atualizado com sucesso", response.data);
        fetchEventos(user.idAdmin); 
      }
    } catch (error) {
      console.error("Erro ao atualizar evento:", error.response ? error.response.data : error);
    }
  };

 //deletar evento
  const deletarEvento = async (eventoId) => {
    try {
    
      if (!eventoId) {
        console.error("ID do evento não fornecido para exclusão.");
        return;
      }
  
    
      const response = await axios.delete(
        `http://localhost:8080/evento/${eventoId}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  
          },
        }
      );
  
      if (response.status === 200) {
      
        fetchEventos(user.idAdmin);  
        console.log("Evento excluído com sucesso", response.data);
      }
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
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
        setEventoId
      }}
    >
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};