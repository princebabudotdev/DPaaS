import React, { createContext, useContext, useEffect, useState } from "react";

export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [Popup, setPopup] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setPopup(null);
    }, 5000);
  }, [Popup]);

  const data = "prince";
  return (
    <MainContext.Provider value={{ data, Popup, setPopup }}>
      {children}
    </MainContext.Provider>
  );
};

export const UseData = () => React.useContext(MainContext);
