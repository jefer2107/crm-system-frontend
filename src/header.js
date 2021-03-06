import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <div className="container-fluid">
            <header className="container">
                <ol>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/client-list">Lista de clientes</Link></li>
                    <li><Link to="/project-list">Lista de projetos</Link></li>
                    <li><Link to="/projects-register">Cadastro de Projetos</Link></li>
                </ol>
            </header>
        </div>
    )
}