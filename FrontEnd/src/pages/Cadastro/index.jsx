import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as styles from "./Cadastro.module.css";
import Modal from "../../components/Modal/Modal";

export const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmaSenha) {
      setMessage("Senha e ConfirmaSenha não são iguais.");
      setModalOpen(true);
      return;
    }

    const dataToSend = {
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      confirmaSenha: formData.confirmaSenha,
    };

    setIsLoading(true);

    try {
      const response = await api.post("/usuarios", dataToSend);
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
          <h2>Cadastre-se</h2>
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
              onChange={(e) => setNome(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
           
              onChange={(e) => setSenha(e.target.value)}
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
              placeholder="confirmaSenha"
              id="senha"
              name="senha"
              onChange={(e) => setSenha(e.target.value)}
              required
              aria-label="Senha"
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
