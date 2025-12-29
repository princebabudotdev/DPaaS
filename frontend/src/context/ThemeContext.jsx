import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

// const getInitialTheme = () => {
//     if (localStorage.getItem("theme")) {
//         return localStorage.getItem("theme") || "light";
//     }

//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light";
// };

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
    console.log(theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ✅ Safe custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeContextProvider");
  }
  return context;
};
