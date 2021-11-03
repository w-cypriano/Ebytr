import React, { Component } from 'react';
import { deleteTask } from '../services/api';
function TodoList(tasks) {

const removeItem = async (id) => {
  const request = await deleteTask(id)
}

 const { _id, task, status } = tasks
    return ( 
      <div>
        <p>{task.task} - {task.status}
        </p><button>editar</button>
        <button onClick={() => removeItem(task._id)}>excluir</button>
      </div>
    );
}
 
export default TodoList;