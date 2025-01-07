import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './Global.css'
import { AppRoutes } from './routes/AppRoutes';
import { Footer } from './components/Footer/index'
import { Header } from './components/Header';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Header/>
    <AppRoutes/>
    <Footer/> 
    </BrowserRouter>
  </StrictMode>,
)
