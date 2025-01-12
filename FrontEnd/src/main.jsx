import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes/AppRoutes';
import { Footer } from './components/Footer/index'
import { Header } from './components/Header';
import { AuthProvider } from './context/Auth';
import { DarkThemeProvider } from './context/DarkTheme';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <DarkThemeProvider> 
      <AuthProvider> 
        <Header />
        <AppRoutes />
        <Footer />
      </AuthProvider>
      </DarkThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
