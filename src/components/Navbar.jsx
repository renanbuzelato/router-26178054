import { NavLink } from 'react-router-dom';

// R2: Navbar no layout D = 0 (horizontal no topo com links centralizados)
// Utiliza NavLink para aplicar a classe 'ativo' automaticamente na rota atual sem recarregar a página
export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'ativo' : '')}>
            Início
          </NavLink>
        </li>
        <li>
          <NavLink to="/filmes" end className={({ isActive }) => (isActive ? 'ativo' : '')}>
            Filmes Cadastrados
          </NavLink>
        </li>
        <li>
          <NavLink to="/filmes/novo" className={({ isActive }) => (isActive ? 'ativo' : '')}>
            Novo Filme
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}