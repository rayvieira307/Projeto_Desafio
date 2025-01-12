import { useContext } from 'react';
import { AuthContext } from '../hooks/Auth'; 

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Erro do useAuth');
  }

  return context;
};