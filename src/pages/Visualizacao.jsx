import { useState } from 'react';
import { Link } from 'react-router-dom';

// R8: As props 'titulo' (constante), 'filmes' (estado array) e 'onRemover' (função) vêm do App.jsx
export default function Visualizacao({ titulo, filmes, onRemover }) {
  // Opcional 05: Estado local para filtrar filmes pelo título enquanto o usuário digita
  const [busca, setBusca] = useState('');

  // Opções definidas na Tabela A para o campo de seleção Gênero
  const generos = ['Ação', 'Comédia', 'Drama'];

  // Filtra os registros conforme o texto digitado na barra de busca
  const filmesFiltrados = filmes.filter((filme) =>
    filme.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="card">
      <h2>{titulo}</h2>

      {/* R6: Caso não exista nenhum filme cadastrado, exibe aviso e link para o cadastro */}
      {filmes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <p style={{ marginBottom: '1rem' }}>Nenhum filme cadastrado no momento.</p>
          <Link to="/filmes/novo" className="btn-primario">
            Cadastrar Primeiro Filme
          </Link>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="barra-busca"
            placeholder="Buscar filme pelo título..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          {/* Regra C = 3: Visualização agrupada pelo campo de seleção (um subtítulo por gênero) */}
          {generos.map((generoAtual) => {
            const filmesDoGenero = filmesFiltrados.filter(
              (filme) => filme.genero === generoAtual
            );

            return (
              <div key={generoAtual} className="grupo-genero">
                <h3>{generoAtual}</h3>

                {filmesDoGenero.length === 0 ? (
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    Nenhum filme encontrado neste gênero.
                  </p>
                ) : (
                  <ul className="lista-filmes">
                    {/* R6: Renderização com map utilizando key={filme.id} */}
                    {filmesDoGenero.map((filme) => (
                      <li key={filme.id} className="item-filme">
                        <div>
                          <strong>{filme.titulo}</strong> — {filme.duracao} min
                          <br />
                          <small style={{ color: '#555' }}>Local: {filme.sala}</small>
                        </div>
                        <button
                          className="btn-remover"
                          onClick={() => onRemover(filme.id)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}