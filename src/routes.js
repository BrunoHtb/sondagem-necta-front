import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Header from "./components/Header";
import CadastroList from "./pages/Cadastros/CadastroList";  
import CadastroEdit from "./pages/Cadastros/CadastroEdit"; 
import Relatorio from "./pages/Relatorio/index";
import Mapa from "./pages/Mapa/index";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/cadastro" element={<CadastroList />} /> 
                <Route path="/cadastro/edit/:id" element={<CadastroEdit />} />
                <Route path="relatorio" element={<Relatorio />} />
                <Route path="mapa" elemtn={<Mapa />} />
            </Routes>
        </BrowserRouter>
    );
}