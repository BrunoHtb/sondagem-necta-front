import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import apiBase from '../../services/apiBase';
import './CadastroList.css';  

export default function CadastroPage() {
    const [cadastros, setCadastros] = useState([]);
    const [filteredCadastros, setFilteredCadastros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const userName = localStorage.getItem('usuario');
    
    useEffect(() => {
        apiBase.get('/cadastro').then(response => {
            setCadastros(response.data);
            setFilteredCadastros(response.data); 
        });
    }, []);

    useEffect(() => {
        const filtered = cadastros.filter(cadastro =>
            cadastro.nomePonto.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCadastros(filtered);
    }, [searchTerm, cadastros]); 

    return (
        <div> 
            <div className="container">
                <div className='title-container'>
                    <h2>Pontos de Sondagem</h2>
                    <Link className='button' to='new'>Criar Novo Cadastro</Link>
                </div>
                
                <div className="form-group search">
                    <label htmlFor="search">Buscar:</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Buscar por nome da sondagem"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
        
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Profundidade Programada</th>
                            <th>Profundidade Final</th>
                            <th>Status</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCadastros.map((cadastro, index) => (
                            <tr key={cadastro.id}>
                                <td>{index + 1}</td>
                                <td>{cadastro.nomePonto}</td>
                                <td>{cadastro.profundidadeProgramada}</td>
                                <td>{cadastro.profundidadeFinal}</td>
                                <td>{cadastro.statusSondagem}</td>
                                <td>
                                    <Link to={`/cadastro/edit/${cadastro.id}`} className="btn-edit">✏️ Editar</Link>
                                    <button className="btn-deactivate" >
                                        🛑 Deletar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>    
        </div>
    );
}
