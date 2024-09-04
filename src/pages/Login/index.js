import React from 'react';
import './styles.css';

import logo from '../../assets/LogoEsteio2.png'

export default function Login() {
    return (
        <div className="logint-container">
            <section className="form">
                <img src={logo} alt="Logo" />
                <form>
                    <h1>Access your Account</h1>
                    <input placeholder="Username" />
                    <input type="password" placeholder="Password" />

                    <button type="submit">Login</button>
                </form>
            </section>
        </div>
    );
}