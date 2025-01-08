import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se há um usuário armazenado no localStorage
    const storageUser = localStorage.getItem("user");
    const storageToken = localStorage.getItem("token"); // Verifique se o token está armazenado também

    if (storageUser && storageToken) {
      setUser(JSON.parse(storageUser));
    }

    setLoading(false);
  }, []);

  const signIn = async (data) => {
    try {
      // Enviando email e senha para a API de login
      const response = await axios.post("http://localhost:8080/login", {
        email: data.email,
        senha: data.senha,
      });

      // Se o login for bem-sucedido (status 200), armazene o usuário e o token
      if (response.status === 200) {
        const userData = response.data;
        
        // Armazenando o token e o usuário no localStorage
        localStorage.setItem("token", userData.token);  // Armazene o token
        localStorage.setItem("user", JSON.stringify(userData)); // Armazene os dados do usuário

        setUser(userData);  // Defina o usuário no estado
        navigate("/dashboard");  // Redireciona para a página inicial
      } else {
        console.error("Erro ao fazer login:", response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");  // Remove o token ao deslogar
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
      }}
    >
      {loading ? <p>Carregando...</p> : children}
    </AuthContext.Provider>
  );
};