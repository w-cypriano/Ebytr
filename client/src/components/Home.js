import React, { useState, useEffect, useContext  } from 'react';
import MyContext from '../contexts/myContext'
import { getAllTask, createTask } from '../services/api';


function Home() {
  const [taskValue, setTaskValue ] = useState('');
  const [statusValue, setStatusValue] = useState('Pendente');
  const { tasksList, setTasksList, refreshList } = useContext(MyContext);
  console.log('home', tasksList);
  console.log('home ref', refreshList);

  const fetchApi = async () => {
    try {
      const request = await getAllTask();
      const result = request.tasks;
      console.log('fethc', request.tasks)
      setTasksList([...result]);
    } catch (e) {
      console.log('Algo deu errado');
    }
  }
  
  useEffect(() => {
    fetchApi();
  }, []);

  const handleSubmit = async () => {
    const request = await createTask(taskValue, statusValue)
    const result = request.tasks;
    setTasksList([...result]);
    setTaskValue(' ');
  }
  
  return (
    <div>
      <form>
        <input
          onChange={(e)=> setTaskValue(e.target.value)}
          value={taskValue} type="text" id= "tarefa"
          placeholder="cadastre sua tarefa"
        />
        <select 
          onChange={(e) => setStatusValue(e.target.value)}
          value={statusValue}
        >
          <option defaultValue value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Pronto">Pronto</option>
        </select>
      </form>
      <button type="submit" onClick={handleSubmit}>Cadastrar</button>
    </div>
  )
}
 
export default Home;