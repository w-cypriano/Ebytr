export async function createTask(task, status ) {
    const result = (await
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))
      .json();
    return result;
  }

  export async function getAllTask () {
    const url = 'http://localhost:3001'
    const result = await fetch(url);
    return result.json();
  }
