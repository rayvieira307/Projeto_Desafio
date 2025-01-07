import { Route, Routes } from "react-router-dom";
import {Error} from "../pages/Error";
import { Login } from "../pages/Login";
import { Cadastro } from "../pages/Cadastro/index";


export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
