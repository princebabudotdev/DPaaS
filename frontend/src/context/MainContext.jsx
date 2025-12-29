import React, { createContext, useContext } from 'react'


export const MainContext = createContext()

export const MainContextProvider = ({ children }) => {
    const data = "prince"
    return (
        <MainContext.Provider value={{data}}>
            {children}
        </MainContext.Provider>
    )
}

export const UseData = () => React.useContext(MainContext);