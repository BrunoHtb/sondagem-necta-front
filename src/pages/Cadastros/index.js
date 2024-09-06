import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import logoImage from '../../assets/logo vertical assinatura_azul _fundo branco.jpg';
import './styles.css';  

export default function CadastroPage() {
    const [nome, setNome] = useState('');
    
    // Lista de clientes (dados fictícios)
    const [clients, setClients] = useState([
      { id: 1, nome: "Microsoft", responsavel: "Otto", contato: "10665544", status: "Ativo" },
      { id: 2, nome: "Amazon", responsavel: "Willian", contato: "55448899", status: "Desativado" },
      { id: 3, nome: "Google", responsavel: "Jack", contato: "66554433", status: "Em Análise" },
      { id: 4, nome: "Facebook", responsavel: "Kevin", contato: "75881515", status: "Ativo" },
      { id: 5, nome: "Twitter", responsavel: "Jack", contato: "00256548", status: "Ativo" },
    ]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (nome) {
        const newClient = {
          id: clients.length + 1,
          nome: nome,
          responsavel: "Novo",
          contato: "00000000",
          status: "Ativo"
        };
        setClients([...clients, newClient]);
        setNome('');
      }
    };
  
    const handleDeactivate = (id) => {
      setClients(
        clients.map((client) =>
          client.id === id ? { ...client, status: "Desativado" } : client
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
                <th>Responsável</th>
                <th>Contato</th>
                <th>Situação</th>
                <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client, index) => (
                <tr key={client.id}>
                    <td>{index + 1}</td>
                    <td>{client.nome}</td>
                    <td>{client.responsavel}</td>
                    <td>{client.contato}</td>
                    <td>{client.status}</td>
                    <td>
                    <button className="btn-edit">✏️ Editar</button>
                    <button className="btn-deactivate" onClick={() => handleDeactivate(client.id)}>
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

