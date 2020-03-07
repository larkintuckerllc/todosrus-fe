import React from 'react';
import TodosTodo from './TodosTodo';

function Todos({ onDelete, todos }) {
  return (
    <ul>
      {todos.map(({ id, name }) => (
        <TodosTodo
          key={id}
          id={id}
          name={name}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default Todos;
