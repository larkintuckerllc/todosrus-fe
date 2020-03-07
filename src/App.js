import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { deleteTodo, getTodos, postTodo } from './api/todos';
import TodoForm from './components/TodoForm';
import Todos from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const execute = async () => {
      try {
        const nextTodos = await getTodos();
        setTodos(nextTodos);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    execute();
  }, []);
  const handleCreate = useCallback(async (name) => {
    const id = uuidv4();
    const todo = await postTodo(id, name);
    setTodos(todos => [...todos, todo]);
  }, [setTodos]);
  const handleDelete = useCallback(async (deleteId) => {
    await deleteTodo();
    const newTodos = [...todos];
    const index = newTodos.findIndex(({ id }) => id === deleteId);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }, [setTodos, todos]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error Loading...</div>;
  }
  return (
    <>
      <TodoForm onCreate={handleCreate} />
      <Todos onDelete={handleDelete} todos={todos} />
    </>
  );
}

export default App;
