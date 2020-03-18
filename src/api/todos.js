const urlBase = process.env.REACT_APP_API;

export const getTodos = async () => {
  const response = await fetch(`${urlBase}/todos`, {
    /*
    headers: {
      Authorization: `iBearer ${idToken}`,
    },
    */
  });
  if (!response.ok) {
    if (response.status !== 401) {
      throw new Error();
    }
    // NEW TOKENS
    console.log('401');
    return [];
  }
  const todos = await response.json();
  return todos;
};

export const postTodo = async (name) => {
  const response = await fetch(
    `${urlBase}/todos`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: name,
      }),
    }
  );
  const todo = await response.json();
  return todo;
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${urlBase}/todos/${id}`, { method: 'DELETE' });
  await response.json();
  return { Id: id };
};
