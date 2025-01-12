import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import * as Yup from "yup";
import Modal from "../../components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import * as style from "./Login.module.css";
import { FaCalendarDays } from "react-icons/fa6";
import FundoLogin from "../../assets/FundoLogin.png";

export const Login = () => {
  const { signIn, RelembrarSenha, setRelembrarSenha } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (RelembrarSenha) {
      const salvarEmail = localStorage.getItem("email");
      const salvarSenha = localStorage.getItem("senha");

      if (salvarEmail && salvarSenha) {
        setEmail(salvarEmail);
        setSenha(salvarSenha);
      }
    }
  }, [RelembrarSenha]);


  const schema = Yup.object().shape({
    senha: Yup.string().required("Você deve informar sua senha."),
    email: Yup.string()
      .email("Insira um email válido.")
      .required("O campo email é obrigatório."),
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      
      await schema.validate({ email, senha }, { abortEarly: false });
      setLoading(true);
      setMessage("");

 
      const result = await signIn({ email, senha });
      
    
      if (result?.status !== 200) {
        throw new Error(result?.message || "Suas Credenciais estão inválidas! Verifique seu email e senha!.");
      }

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      setMessage(err.message || "Ocorreu um erro inesperado.");
      setIsModalOpen(true);  
    }
  };

  const handleCheckboxChange = () => {
    setRelembrarSenha(!RelembrarSenha);
  };

  return (
    <main>
      <div className={style.loginContainer}>
        <div className={style.LadoEsquerdo}>
          <title>Página de Login</title>
          <img
            className={style.ImageFundo}
            src={FundoLogin}
            alt="Fundo Login sobre Gestao de Eventos"
            tabIndex="0"
          />
        </div>

        <div className={style.LadoDireito}>
          <form className={style.formularioLogin} onSubmit={handleSignIn}>
            <p className={style.formText}>
              Gerenciador de Eventos
              <FaCalendarDays className={style.Calendario} />
            </p>
            <p className={style.titulo}>Faça seu Login</p>

            <label className={style.labelInput} htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              className={style.loginEmail}
              placeholder="seuemail@email.com"
              name="email"
              value={email}
              aria-label="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className={style.labelInput} htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              placeholder="Senha"
              className={style.loginSenha}
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              aria-label="Senha"
            />

            <label className={style.CheckBox}>
              <input
                type="checkbox"
                aria-label="Lembrar da Senha"
                checked={RelembrarSenha}  
                onChange={handleCheckboxChange} 
              />
              Gravar Senha
            </label>

            <button
              type="submit"
              disabled={loading}
              className={style.loginButton}
            >
              {loading ? "Enviando..." : "Login"}
            </button>

            <p className={style.registerMessage}>Ainda não tem cadastro?</p>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <h2>{message}</h2>
            </Modal>

            <button
              type="button"
              className={style.CadastroBotao}
              onClick={() => navigate("/cadastro")}
            >
              Cadastre-se
            </button>
          </form>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </main>
  );
};