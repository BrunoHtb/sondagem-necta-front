import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logoImage from '../../assets/logo vertical assinatura_azul _fundo branco.jpg';
import api from '../../services/api';
import './styles.css';  

export default function CadastroPage() {
    const [cadastros, setCadastros] = useState([]);
    const [filteredCadastros, setFilteredCadastros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const userName = localStorage.getItem('usuario');
    
    useEffect(() => {
        api.get('/api/v1/cadastro/').then(response => {
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
            <header className='header-container'>
                <img src={logoImage} alt="Erudio" />
                <button type='button'>
                    <FiPower size={18} color='#251FC5' />
                </button>
            </header>

            <div className="container">

                <div className='title-container'>
                    <h2>Pontos de Sondagem</h2>
                    <Link className='button' to='new'>Add New Cadastro</Link>
                </div>
                
                <div className="form-group search">
                    <label htmlFor="search">Buscar:</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Buscar por nome da sondagem"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado de pesquisa
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
                                    <button className="btn-edit">✏️ Editar</button>
                                    <button className="btn-deactivate" >
                                        🛑 Desativar
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
