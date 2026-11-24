import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Rodape from './components/Rodape';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Visualizacao from './pages/Visualizacao';
import NaoEncontrada from './pages/NaoEncontrada';

// R3: 3 registros iniciais de exemplo, contendo o RA 26178054 no campo complementar (Sala)
const REGISTROS_INICIAIS = [
  {
    id: 1,
    titulo: 'Interestelar',
    duracao: 169,
    genero: 'Ação',
    sala: 'Sala IMAX 26178054'
  },
  {
    id: 2,
    titulo: 'O Auto da Compadecida',
    duracao: 104,
    genero: 'Comédia',
    sala: 'Sala 02'
  },
  {
    id: 3,
    titulo: 'Oppenheimer',
    duracao: 180,
    genero: 'Drama',
    sala: 'Sala VIP 01'
  }
];

export default function App() {
  // R3 + Opcional 06: Estado centralizado no App com persistência no localStorage
  const [filmes, setFilmes] = useState(() => {
    const salvos = localStorage.getItem('cinema_renan_26178054');
    return salvos ? JSON.parse(salvos) : REGISTROS_INICIAIS;
  });

  // Atualiza o localStorage sempre que a lista de filmes mudar
  useEffect(() => {
    localStorage.setItem('cinema_renan_26178054', JSON.stringify(filmes));
  }, [filmes]);

  // R4 & R5: Função passada via props para adicionar novo registro de forma imutável
  function adicionarFilme(novoFilme) {
    setFilmes((estadoAnterior) => [...estadoAnterior, novoFilme]);
  }

  // Opcional 03: Função passada via props para remover um registro pelo id
  function removerFilme(id) {
    setFilmes((estadoAnterior) => estadoAnterior.filter((filme) => filme.id !== id));
  }

  // R7: Identidade do sistema (<Sistema> <Primeiro Nome>)
  const nomeSistema = 'Cinema Renan';

  return (
    <div className="app-container">
      <Navbar />

      <main className="conteudo-principal">
        {/* R1: Declaração das 4 rotas obrigatórias com o slug 'filmes' */}
        <Routes>
          {/* R4: Home recebe a quantidade calculada no App e a constante do nome do sistema */}
          <Route
            path="/"
            element={<Home nomeSistema={nomeSistema} totalRegistros={filmes.length} />}
          />

          {/* R4: Cadastro recebe a função adicionarFilme (e não o setFilmes direto) */}
          <Route
            path="/filmes/novo"
            element={<Cadastro onAdicionar={adicionarFilme} />}
          />

          {/* R4: Visualização recebe uma constante (titulo) e o estado (lista de filmes) */}
          <Route
            path="/filmes"
            element={
              <Visualizacao
                titulo="Programação por Gênero"
                filmes={filmes}
                onRemover={removerFilme}
              />
            }
          />

          {/* R1: Rota coringa para capturar URLs inexistentes */}
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape />
    </div>
  );
}