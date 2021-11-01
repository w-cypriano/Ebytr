import React, { useState } from 'react';
import { getAllTask } from '../services/api';
import TodoList from './TodoList';

function Home() {
  const [taskValue, setTaskValue ] = useState('');
  const [statusValue, setStatusValue] = useState('')

  const handleSubmit = async () => {
    const result = await getAllTask()
    console.log(result);
    return result;
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
          <option selected value="Pendente">Pendente</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Pronto">Pronto</option>
        </select>
      </form>
      <button type="submit" onClick={handleSubmit}>Cadastrar</button>
      <TodoList/>
    </div>
  )
}
 
export default Home;