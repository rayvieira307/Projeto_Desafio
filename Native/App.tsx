import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackRouters } from "./src/routes/StackRouters";
import { AuthProvider } from "./src/hooks/Auth";
import { HomeEventos } from "./src/pages/HomeEventos";

export default function App() {
  return (

 < NavigationContainer>
      <AuthProvider>
       <StackRouters /> 
      </AuthProvider>
    </NavigationContainer>   
  
  );
}
