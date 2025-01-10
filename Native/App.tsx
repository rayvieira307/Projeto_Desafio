import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { StackRouters } from './src/routes/StackRouters'; 

export default function App() {
  return (

       <NavigationContainer>
          <StackRouters/>
        </NavigationContainer>

      
  );
}