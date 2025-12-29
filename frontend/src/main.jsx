import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App/App'
import { MainContext, MainContextProvider } from './context/MainContext'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './context/ThemeContext'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>

    </MainContextProvider>
  </BrowserRouter>,
)
