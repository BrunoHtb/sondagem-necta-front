import { FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo vertical assinatura_azul _fundo branco.jpg';
import './styles.css'


function Header() {
    return (
        <header className='header-container'>
            <Link to="/cadastro">
                <img src={logoImage} alt="logo" />
            </Link>

            <nav className="header-nav">
                <ul>
                    <li>
                        <Link to="/mapa">Mapa</Link>
                    </li>
                    <li>
                        <Link to="/cadastro">Lista de Cadastro</Link>
                    </li>
                    <li>
                        <Link to="/relatorio">Relatório</Link>
                    </li>
                </ul>
            </nav>

            <button type='button' className='logout-button'>
                <FiPower size={24} color='#251FC5' />
            </button>
        </header>
    );
}

export default Header;