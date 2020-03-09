import React from 'react';
import TodosTodo from './TodosTodo';

function Todos({ onDelete, todos }) {
  return (
    <ul>
      {todos.map(({ Id, Name }) => (
        <TodosTodo
          key={Id}
          id={Id}
          name={Name}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default Todos;
