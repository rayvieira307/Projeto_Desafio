import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [RelembrarSenha, setRelembrarSenha] = useState(false); // Estado para controlar o checkbox "Gravar Senha"
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

      if (response.status === 200) {
        const userData = response.data;

      
        if (RelembrarSenha) {
          localStorage.setItem("email", data.email);
          localStorage.setItem("senha", data.senha);
          localStorage.setItem("RelembrarSenha", "true");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("senha");
          localStorage.removeItem("RelembrarSenha");
        }

     
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);

        setUser(userData); 
        navigate("/dashboard"); 
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