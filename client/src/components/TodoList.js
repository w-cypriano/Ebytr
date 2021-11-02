import React, { Component } from 'react';

function TodoList(tasks) {
  console.log(tasks)
 const { task, status } = tasks
  console.log('todo',task);
    return ( 
      <div>
        <p>{task.task} - {task.status}</p><button>editar</button><button>excluir</button>
      </div>
    );
}
 
export default TodoList;