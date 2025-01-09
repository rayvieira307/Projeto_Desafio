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

  const signIn = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email: data.email,
        senha: data.senha,
      });
  
      // O token é o próprio response.data
      const token = response.data;
  
      console.log("Token recebido:", token);  // Exibe o token que foi recebido
  
      if (!token) {
        console.error("Token não recebido");
        return;  // Se o token não estiver presente, interrompe o fluxo
      }
  
      // Decodificando o token para acessar as informações
      const decodedToken = decodeToken(token);  // Função para decodificar o token
      console.log("Decoded Token:", decodedToken);  // Exibe o conteúdo do token decodificado
  
      // Aqui você pode acessar o idAdmin e email no decodedToken
      if (decodedToken) {
        console.log("ID Admin:", decodedToken.idAdmin);
        console.log("Email:", decodedToken.sub);
      }
  
      // Agora, armazene o token e o userData no localStorage
      if (RelembrarSenha) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("senha", data.senha);
        localStorage.setItem("RelembrarSenha", "true");
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("senha");
        localStorage.removeItem("RelembrarSenha");
      }
  
      // Armazenando o token no localStorage
      localStorage.setItem("token", token);
      setUser(decodedToken);  // Atualiza o estado do usuário com os dados do token decodificado
  
      // Redireciona para o dashboard
      navigate("/dashboard");
  
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("senha");
    localStorage.removeItem("RelembrarSenha");
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
        RelembrarSenha,
        setRelembrarSenha,
      }}
    >
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};