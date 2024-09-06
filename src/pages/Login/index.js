import React from 'react';
import './styles.css';

import logo from '../../assets/logo vertical assinatura_azul _fundo branco.jpg'

export default function Login() {
    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo" />
                <form>
                    <h1>Access your Account</h1>
                    <input placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <button className='button' type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}