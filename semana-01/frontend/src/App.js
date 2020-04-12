import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  const handleAddRepository = async () => {

    const newRepository = `Novo repositório ${Date.now()}`

    const response = await api.post('repositories', {
      title: newRepository,
      url: "https://github.com/GabryelleSS/desafio-conceitos-node",
      techs: ["Node.js", "..."],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  const handleRemoveRepository = async (id) => {
    const newRepository = repositories.filter(repository => repository.id !== id);

    await api.delete(`repositories/${id}`);

    setRepositories(newRepository);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>   
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
