import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// R8: A prop 'onAdicionar' é uma função definida no App.jsx que recebe o objeto do novo filme e atualiza o estado global
export default function Cadastro({ onAdicionar }) {
  // Estados locais para controlar cada um dos 4 inputs do formulário
  const [titulo, setTitulo] = useState('');
  const [duracao, setDuracao] = useState('');
  const [genero, setGenero] = useState('Ação');
  const [sala, setSala] = useState('');
  const [erro, setErro] = useState('');

  // Hook do React Router usado para redirecionar o usuário após salvar
  const navigate = useNavigate();

  // Função executada no envio do formulário para validar os dados e enviar ao App.jsx
  function handleSubmit(e) {
    e.preventDefault();

    // Validação obrigatória geral: impede campos vazios
    if (!titulo.trim() || !duracao || !genero || !sala.trim()) {
      setErro('Todos os campos são obrigatórios. Preencha todas as informações.');
      return;
    }

    // Regra B = 0: Campo principal (Título) deve ter no mínimo 3 caracteres (ignorando espaços nas pontas)
    if (titulo.trim().length < 3) {
      setErro('O título do filme deve ter no mínimo 3 caracteres (sem contar espaços nas pontas).');
      return;
    }

    // Monta o novo registro com ID único gerado por Date.now()
    const novoFilme = {
      id: Date.now(),
      titulo: titulo.trim(),
      duracao: Number(duracao),
      genero,
      sala: sala.trim()
    };

    // Chama a função recebida via props para salvar no estado do App
    onAdicionar(novoFilme);

    // Redireciona para a rota de visualização sem recarregar a página
    navigate('/filmes');
  }

  return (
    <div className="card">
      <h2>Cadastrar Novo Filme</h2>

      {erro && <div className="erro-msg">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grupo">
          <label htmlFor="titulo">Título do Filme:</label>
          <input
            id="titulo"
            type="text"
            placeholder="Ex: Duna: Parte Dois"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="duracao">Duração (minutos):</label>
          <input
            id="duracao"
            type="number"
            placeholder="Ex: 166"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="genero">Gênero:</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="Ação">Ação</option>
            <option value="Comédia">Comédia</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        <div className="form-grupo">
          <label htmlFor="sala">Sala de Exibição:</label>
          <input
            id="sala"
            type="text"
            placeholder="Ex: Sala 03"
            value={sala}
            onChange={(e) => setSala(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primario">
          Salvar Filme
        </button>
      </form>
    </div>
  );
}