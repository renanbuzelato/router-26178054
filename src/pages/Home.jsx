import { Link } from 'react-router-dom';

// R8: Comentários explicando a origem das props e o funcionamento do componente
// As props 'nomeSistema' (constante) e 'totalRegistros' (quantidade calculada) vêm diretamente do App.jsx
export default function Home({ nomeSistema, totalRegistros }) {
  return (
    <div className="card">
      <h1>{nomeSistema}</h1>
      <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
        Bem-vindo ao sistema de gerenciamento de programação cinematográfica.
      </p>

      <div style={{ margin: '1.5rem 0', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
        <p><strong>Responsável técnico:</strong> Renan Buzelato</p>
        <p style={{ marginTop: '0.5rem' }}>
          <strong>Filmes atualmente em cartaz:</strong> {totalRegistros} {totalRegistros === 1 ? 'registro' : 'registros'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/filmes" className="btn-primario">
          Ver Programação
        </Link>
        <Link to="/filmes/novo" className="btn-primario">
          Cadastrar Novo Filme
        </Link>
      </div>
    </div>
  );
}