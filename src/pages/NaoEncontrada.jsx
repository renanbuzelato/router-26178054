import { Link, useLocation } from 'react-router-dom';

// R8: Componente de rota coringa (*). Usa useLocation para ler o caminho inválido acessado na URL
export default function NaoEncontrada() {
  const location = useLocation();

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <h2>404 — Página não encontrada</h2>
      <p style={{ margin: '1rem 0' }}>
        O caminho <strong>{location.pathname}</strong> não existe neste sistema.
      </p>
      <Link to="/" className="btn-primario">
        Voltar para a Home
      </Link>
    </div>
  );
}