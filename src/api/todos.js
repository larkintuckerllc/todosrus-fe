import { getTokens, refreshTokens } from './auth';

const urlBase = process.env.REACT_APP_API;

export const getTodos = async () => {
  const { idToken, refreshToken } = getTokens();
  const response = await fetch(`${urlBase}/todos`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!response.ok) {
    if (response.status !== 401) {
      throw new Error();
    }

    // REFRESH_TOKENS AND RETRY
    await refreshTokens(refreshToken);
    const { idToken: retryIdToken } = getTokens();
    const retryResponse = await fetch(`${urlBase}/todos`, {
      headers: {
        Authorization: `Bearer ${retryIdToken}`,
      },
    });
    if (!retryResponse.ok) {
      throw new Error();
    }
    const retryTodos = await retryResponse.json();
    return retryTodos;
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
