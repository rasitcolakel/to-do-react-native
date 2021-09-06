import React, { createContext, useState, useContext } from "react";
import { Appearance } from "react-native";

import { create } from "tailwind-rn";
import styles from "./styles.json";
const { tailwind, getColor } = create(styles);

export default tailwind;
export { getColor };

const TailwindContext = createContext();

function handleThemeClasses(classes, isDarkMode) {
  const regExp = isDarkMode ? /dark:/g : /dark:\S+/g;
  return classes.replace(regExp, "").replace(/\s\s/g, " ").trim();
}

function useTailwind() {
  const context = useContext(TailwindContext);
  if (!context)
    throw new Error(`useTailwind must be used within a TailwindProvider`);

  const [currentColorScheme, setCurrentColorScheme] = context;
  const isDarkMode = currentColorScheme == "dark";

  return {
    isDarkMode,
    setDarkMode: (isDark) => setCurrentColorScheme(isDark ? "dark" : "light"),
    tw: (classes) => tailwind(handleThemeClasses(classes, isDarkMode)),
    getColor: (colors) => getColor(handleThemeClasses(colors, isDarkMode)),
  };
}

function TailwindProvider({ children }) {
  const contextValue = useState(Appearance.getColorScheme());
  return (
    <TailwindContext.Provider value={contextValue}>
      {children}
    </TailwindContext.Provider>
  );
}

export { TailwindProvider, useTailwind };
