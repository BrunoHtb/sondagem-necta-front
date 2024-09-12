import React, { useState, useEffect } from 'react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logoImage from '../../assets/logo vertical assinatura_azul _fundo branco.jpg';
import api from '../../services/api';
import './styles.css';  

export default function CadastroPage() {
    const [cadastros, setCadastros] = useState([]);
    const userName = localStorage.getItem('usuario');

    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    
    useEffect(() => {
      api.get('/api/v1/cadastro/').then(response => {
        setCadastros(response.data);
      });
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (nome) {
        const newClient = {
          id: cadastros.length + 1,  // Usa o tamanho do array de cadastros para gerar um id
          nome: nome,
          responsavel: "Novo",
          contato: "00000000",
          status: "Ativo"
        };
        setCadastros([...cadastros, newClient]);  // Atualiza os cadastros com o novo cliente
        setNome('');  // Limpa o campo de nome
      }
    };
  
    const handleDeactivate = (id) => {
      setCadastros(
        cadastros.map((cadastro) =>
          cadastro.id === id ? { ...cadastro, status: "Desativado" } : cadastro
        )
      );
    };
  
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
            <h2 >Pontos de Sondagem</h2>
            <Link className='button' to='new'>Add New Cadastro</Link>
            </div>
            
            <div className="form-group search">
            <label htmlFor="search">Buscar:</label>
            <input type="text" id="search" placeholder="Buscar por nome do cliente" />
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
                {cadastros.map((cadastro, index) => (
                <tr key={cadastro.id}>
                    <td>{index + 1}</td>
                    <td>{cadastro.nomePonto}</td>
                    <td>{cadastro.profundidadeProgramada}</td>
                    <td>{cadastro.profundidadeFinal}</td>
                    <td>{cadastro.statusSondagem}</td>
                    <td>
                    <button className="btn-edit">✏️ Editar</button>
                    <button className="btn-deactivate" onClick={() => handleDeactivate(cadastro.id)}>
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
  };

