import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./Cadastro.module.css";
import Modal from "../../components/Modal/Modal";
import FundoCadastro  from "../../assets/cadastro.png";
import axios from "axios";

export const Cadastro = () => {

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmasenha: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmasenha) {
      setMessage("Senha e Confirma Senha não são iguais.");
      setModalOpen(true);
      return;
    }

    const dataToSend = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
    };

    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/admin", dataToSend);;
      setMessage("Cadastro realizado com sucesso!");
      console.log("Cadastro realizado:", response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Erro ao realizar o cadastro:", error);
      setMessage("Erro ao realizar o cadastro. Tente novamente.");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (message === "Cadastro realizado com sucesso!") {
      navigate("/");
    }
  };

  return (
    <>
      <title>Pagina de Cadastro</title>
      <main className={styles.registrationContainer}>
        <header className={styles.registrationTitle}>
          <h2 className={styles.titlePagina}>Realize o seu Cadastro </h2>
          <img
                      className={styles.ImageFundo}
                      src={FundoCadastro}
                      alt="Fundo Cadastro sobre Gestao de Eventos"
                      tabIndex="0"
                    /> 
        </header>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <section className={styles.inputGroup}>
            <label className={styles.labelInput} htmlFor="nome">
              Nome
            </label>
            <input
              type="nome"
              id="nome"
              placeholder="Nome Completo"
              name="nome"
              aria-label="Nome"
              onChange={handleChange}
              required
            />
          </section>

          <section className={styles.inputGroup}>
            <label className={styles.labelInput} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="seuemail@email.com"
              name="email"
              aria-label="Email"
              onChange={handleChange}
              required
            />
          </section>

          <section className={styles.inputGroup}>
            <label className={styles.labelInput} htmlFor="senha">
              Senha
            </label>
            <input
              type="password"
              placeholder="Senha"
              className={styles.loginSenha}
              id="senha"
              name="senha"
           
              onChange={handleChange}
              required
              aria-label="Senha"
            />
          </section>

          <section className={styles.inputGroup}>
            <label className={styles.labelInput} htmlFor="confirmaSenha">
              Confirma Senha
            </label>
            <input
              type="password"
              placeholder="Confirma Senha"
              id="confirmaSenha"
              name="confirmasenha"
              value={formData.confirmasenha}
              onChange={handleChange}
              required
              aria-label="Confirma Senha"
            />
          </section>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Cadastrando..." : "CADASTRAR"}
          </button>
        </form>
      </main>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>{message}</h2>
      </Modal>
    </>
  );
};
