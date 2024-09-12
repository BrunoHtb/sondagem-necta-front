import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/logo vertical assinatura_azul _fundo branco.jpg'
import './styles.css';

export default function Login() {
    const [usuario, setUserName] = useState('');
    const [senha, setPassword] = useState('');
    const navigate = useNavigate ();

    async function login(e) {
        e.preventDefault();

        const data = {
            usuario, 
            senha,
        };
        try {
            const response = await api.post('/api/v1/usuario/', data);
            localStorage.setItem('usuario', usuario);            
            navigate('/cadastro');
        } catch(error) {
            alert('Falha no Login');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo" />
                <form onSubmit={login}>
                    <h1>Access your Account</h1>

                    <input placeholder="Username" value={usuario} onChange={e => setUserName(e.target.value)} />
                    <input type="password" placeholder="Password" value={senha} onChange={e => setPassword(e.target.value)} />

                    <button className='button' type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}