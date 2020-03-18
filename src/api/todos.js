import { getTokens, refreshTokens } from './auth';

const urlBase = process.env.REACT_APP_API;

const getTodosFetch = async () => {
  const { idToken } = getTokens();
  const response = await fetch(`${urlBase}/todos`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response;
};

export const getTodos = async () => {
  const response = await getTodosFetch();
  if (!response.ok) {
    if (response.status !== 401) {
      throw new Error();
    }

    // REFRESH_TOKENS AND RETRY
    const { refreshToken } = getTokens();
    await refreshTokens(refreshToken);
    const retryResponse = await getTodosFetch();
    if (!retryResponse.ok) {
      throw new Error();
    }
    const retryTodos = await retryResponse.json();
    return retryTodos;
  }
  const todos = await response.json();
  return todos;
};

const postTodosFetch = async (name) => {
  const { idToken } = getTokens();
  const response = await fetch(
    `${urlBase}/todos`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: name,
      }),
    }
  );
  return response;
};

export const postTodo = async (name) => {
  const response = await postTodosFetch(name);
  if (!response.ok) {
    if (response.status !== 401) {
      throw new Error();
    }

    // REFRESH_TOKENS AND RETRY
    const { refreshToken } = getTokens();
    await refreshTokens(refreshToken);
    const retryResponse = await postTodosFetch(name);
    if (!retryResponse.ok) {
      throw new Error();
    }
    const retryTodo = await retryResponse.json();
    return retryTodo;
  }
  const todo = await response.json();
  return todo;
};

const deleteTodoFetch = async (id) => {
  const { idToken } = getTokens();
  const response = await fetch(`${urlBase}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    method: 'DELETE',
  });
  return response;
};

export const deleteTodo = async (id) => {
  const response = await deleteTodoFetch(id);
  if (!response.ok) {
    if (response.status !== 401) {
      throw new Error();
    }

    // REFRESH_TOKENS AND RETRY
    const { refreshToken } = getTokens();
    await refreshTokens(refreshToken);
    const retryResponse = await deleteTodoFetch(id);
    if (!retryResponse.ok) {
      throw new Error();
    }
    await retryResponse.json();
    return { Id: id };
  }
  await response.json();
  return { Id: id };
};
