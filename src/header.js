import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <div className="container-fluid">
            <header className="container">
                <ol>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/client-list">Lista de clientes</Link></li>
                </ol>
            </header>
        </div>
    )
}