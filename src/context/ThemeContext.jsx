import { createContext, useState } from "react";

export const themeContext = createContext();

const ThemeState = (props) => {
  const permatheme = localStorage.getItem('theme') || 'dark'
  const [theme, setwebTheme] = useState(permatheme);

  const setTheme = (data) => {
    setwebTheme(data)
    localStorage.setItem('theme', data)
  }
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </themeContext.Provider>
  );
};

export default ThemeState;
