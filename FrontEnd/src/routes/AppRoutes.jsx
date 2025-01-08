import { Route, Routes } from "react-router-dom";
import {Error} from "../pages/Error";
import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro/index";
import { HomeEventos } from "../pages/HomeEventos";
import { ProtectedRoute } from "./ProtectedRoute";


export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route element={<ProtectedRoute allowedRoles={['admin', 'user']} />}>
          <Route path="/dashboard" element={<HomeEventos />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
