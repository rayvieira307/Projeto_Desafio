import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../pages/Login";  // Certifique-se de que a importação está correta
import { Cadastro } from "../pages/Cadastro";
import { HomeEventos } from "../pages/HomeEventos";

const Stack = createNativeStackNavigator();

export const StackRouters = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name = "Cadastro" component={Cadastro}/>
      <Stack.Screen name = "Dashboard" component={HomeEventos}>

      </Stack.Screen>
    </Stack.Navigator>
  );
};