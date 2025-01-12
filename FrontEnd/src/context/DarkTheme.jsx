import { createContext, useEffect, useState } from "react";

export const DarkTheme = createContext(null);

export function DarkThemeProvider({ children }) {
  const [darkThemeIsActive, setDarkThemeIsActive] = useState(false);

  function handleTheme() {
    setDarkThemeIsActive(!darkThemeIsActive);
    localStorage.setItem("theme", JSON.stringify(!darkThemeIsActive));
  }

  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("theme"));
    if (savedTheme !== null) {
      setDarkThemeIsActive(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (darkThemeIsActive) {

      document.documentElement.style.setProperty("--background-color", "#070707");
      document.documentElement.style.setProperty("--font-color", "black");
      document.documentElement.style.setProperty("--label-color", "#070707");
      document.documentElement.style.setProperty("--title-color", "rgb(65, 154, 154)");
    } else {
   
      document.documentElement.style.setProperty("--background-color", "#f4f4f9");
      document.documentElement.style.setProperty("--font-color", "black");
      document.documentElement.style.setProperty("--hover-color", "lightgray");
      document.documentElement.style.setProperty("--label-color", "black");
      document.documentElement.style.setProperty("--title-color", "black");
    }
  }, [darkThemeIsActive]);


  return (
    <DarkTheme.Provider value={{ darkThemeIsActive, handleTheme }}>
      {children}
    </DarkTheme.Provider>
  );
}