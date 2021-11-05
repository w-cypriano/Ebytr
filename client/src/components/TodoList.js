import React, { Component, useContext } from 'react';
import MyContext from '../contexts/myContext'
import { deleteTask } from '../services/api';

function TodoList() {
  const { tasksList, setTasksList} = useContext(MyContext);
  
  const removeTask = async (id) => {
    const request = await deleteTask(id);
    const result = request.tasks;
    setTasksList([...result]);
  }

  const editTask = async (id) => {
    const request = await updateTask(id);
    const result = request.tasks;
    setTasksList([...result]);
  }
  const allTask = tasksList.map((task) =>
    <li key={task._id}>
      {task.task} -  {task.status}
      <div>
        <button onClick={() => editTask(task._id)}>editar</button>
        <button onClick={() => removeTask(task._id)}>excluir</button>
      </div>
    </li>
  );
    return ( 
      <ul>
        {allTask}
    </ul>
    );
}
 
export default TodoList;