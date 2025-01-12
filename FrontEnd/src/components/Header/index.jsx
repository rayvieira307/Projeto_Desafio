import React from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
import logoNeki from "../../assets/neki-header.jpg";
import { Acessibilidade } from "../Acessibilidade";

export const Header = () => {
  const navigate = useNavigate();  
  
  const handleNavigation = () => {
    navigate("/");  
  };

  return (
  
    
    <header className={styles.header}>
      <Acessibilidade/>
      <div id={styles.logoNeki} onClick={handleNavigation}>
        <img src={logoNeki} alt="Logo da Neki" />
      </div>
    </header>
  
  );
};
