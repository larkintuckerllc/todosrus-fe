import React, { useCallback, useState } from 'react';

function TodosTodo({ id, name, onDelete }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleClick = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      await onDelete(id);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, [id, onDelete, setError, setLoading]);

  return (
    <li>
      {name}
      <button
        disabled={loading}
        onClick={handleClick}
      >
        delete
      </button>
      {error && <span>Error Deleting...</span>}
    </li>
  );
}

export default TodosTodo;
