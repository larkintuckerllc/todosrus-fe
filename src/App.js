import React, { useCallback, useEffect, useState } from 'react';
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
    const todo = await postTodo(name);
    setTodos(todos => [...todos, todo]);
  }, [setTodos]);
  const handleDelete = useCallback(async (deleteId) => {
    await deleteTodo(deleteId);
    const newTodos = [...todos];
    const index = newTodos.findIndex(({ Id }) => Id === deleteId);
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
