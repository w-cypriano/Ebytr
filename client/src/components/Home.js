import React, { useState, useEffect } from 'react';
import { getAllTask, createTask } from '../services/api';
import TodoList from './TodoList';

function Home() {
  const [taskValue, setTaskValue ] = useState('');
  const [statusValue, setStatusValue] = useState('Pendente');
  const [tasksList, setTasksList] = useState([]);  
  console.log('home', tasksList);
  const fetchApi = async () => {
    try {
      const request = await getAllTask();
      setTasksList([...[], ...request.tasks]);
    } catch (e) {
      console.log('Algo deu errado');
    }
  }
  
  useEffect(() => {
    fetchApi();
  }, []);

  const handleSubmit = async () => {
    const request = await createTask(taskValue, statusValue)
    console.log(request.tasks);
    setTasksList([...[], ...request.tasks]);
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
      {tasksList.map((task) => <TodoList key={task._id} task={task} /> )}
    </div>
  )
}
 
export default Home;