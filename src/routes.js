import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import CadastroList from "./pages/Cadastros/CadastroList";  
import CadastroEdit from "./pages/Cadastros/CadastroEdit"; 

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/cadastro" element={<CadastroList />} /> 
                <Route path="/cadastro/edit/:id" element={<CadastroEdit />} />
            </Routes>
        </BrowserRouter>
    );
}