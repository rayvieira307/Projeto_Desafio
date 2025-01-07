import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";

export const Error = () => {
  return (
    <>
      <div className={styles.errorPageContainer}>
        <h1 className={styles.errorTitle}>404</h1>
        <h1 className={styles.errorTitle}>Página Não Encontrada</h1>
        <p className={styles.errorMessage}>
          Desculpe, mas a página que você está procurando não existe.
        </p>
        <Link to="/" className={styles.homeLink}>
          Voltar para a página inicial
        </Link>
      </div>
    </>
  );
}
