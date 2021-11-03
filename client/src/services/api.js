export async function createTask(task, status ) {
  const url = 'http://localhost:3001/task'
  const result = await
  fetch(url, {
      "method": "POST",
      "headers": {
          "Content-Type": 'application/json'
      },
      "body": JSON.stringify({
          task,
          status
      })
  })
  return result.json();
}


export async function getAllTask() {
  const url = 'http://localhost:3001'
  const result = await fetch(url);
  return result.json();
}

export async function deleteTask(id) {
  console.log('api', id);
  const url = `http://localhost:3001/task/${id}`
  const result = await fetch(url, {
      "method": "DELETE",
      "headers": {
          "Content-Type": 'application/json'
      },
  });
  return result.json();
}