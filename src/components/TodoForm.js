import React, { useCallback, useState } from 'react';

function TodoForm({ onCreate }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, [setValue]);
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      await onCreate(value);
      setValue('');
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }, [onCreate, setError, setLoading, value]);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={value} />
      <button disabled={value === '' || loading} type="submit">Create</button>
      {error && <div>Error Creating...</div>}
    </form>
  );
}

export default TodoForm;
