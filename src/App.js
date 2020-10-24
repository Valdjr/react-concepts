import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setrepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
      setrepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('/repositories', {
      title: "Repo " + Date.now(),
      url: "abc.com",
      techs: ["js", "react"]
    }).then(res => {
      setrepositories([...repositories, res.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete('/repositories/' + id)
    const repos = repositories.filter(repo => repo.id != id);
    setrepositories(repos)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
