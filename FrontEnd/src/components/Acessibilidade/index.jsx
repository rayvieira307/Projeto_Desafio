import { useState, useEffect, useContext } from "react";
import { DarkTheme } from "../../context/DarkTheme";
import iconeAcessibilidade from "../../assets/acessibilidadeIcon.png";
import iconeContraste from "../../assets/contrasteIcon.png";
import * as styles from "./acessibilidade.module.css";

export const Acessibilidade = () => {

  const [outlineIsActive, setOutlineIsActive] = useState(false); 
  const { darkThemeIsActive, handleTheme } = useContext(DarkTheme);


  useEffect(() => {
    const outlineStyle = "*:focus{outline: 5px solid var(--azul-primario)};";

    if (outlineIsActive) {      
      let element = document.createElement("style");
      element.innerHTML = outlineStyle;
      document.head.insertAdjacentElement("beforeend", element);
      return;
    }

    let elements = document.querySelectorAll("style");
    elements.forEach((element) => {
      if (element.innerHTML === outlineStyle) {
        element.remove();
      }
    });
  }, [outlineIsActive]);

  function handleFontSize(updateValue) {
    const selectors = "h1, h2, p, a, span, li, label, input, button, textarea";
    let elements = document.querySelectorAll(selectors);
    elements.forEach((element) => {
      let currentFontSize = window.getComputedStyle(element).fontSize;
      let newFontSize = parseInt(currentFontSize) + updateValue;

      const maxFontSize = 32;

      if (newFontSize > maxFontSize) {
        newFontSize = maxFontSize;
    }

      element.style.fontSize = `${newFontSize}px`;
    })
  }

  return (
    <main className={styles.secaoAcessibilidade}>
       <header>
        <div>
          <img
            className={styles.iconeAcessibilidade}
            src={iconeAcessibilidade}
            alt="Ícone mundial de acessibilidade"
          />
          <div className={styles.containerBotoes}>
            <button
              className={styles.btDiminuir}
              aria-label="Diminuir tamanho do texto -A"
              onClick={() => handleFontSize(-1)}
            >
              A-
            </button>
            <button
              className={styles.btAumentar}
              aria-label="Aumentar tamanho do texto +A"
              onClick={() => handleFontSize(1)}
            >
              A+
            </button>
            <button
              className={styles.btAltoContraste}
              arial-label="Ativar alto contraste"
              aria-pressed={darkThemeIsActive}
              onClick={handleTheme}
            >
              <img
                className={styles.iconeContraste}
                src={iconeContraste}
                alt="Ícone ilustrativo de alto contraste"
              />
            </button>
          </div>
        </div>
      </header>
    </main>
  );
}