import React, { useCallback, useEffect, useState } from 'react';
import Authenticated from './components/Authenticated';
import { removeTokens, getTokens, loadTokens, loginUrl } from './api/auth';

const params = (new URL(document.location)).searchParams;
const code = params.get('code'); 

function App() {
  const [authenticating, setAuthenticating] = useState(code !== null);
  const [tokens, setTokens] = useState(loadTokens());
  useEffect(() => {
    const execute = async () => {
      window.history.replaceState({}, document.title, '/');
      try {
        const newTokens = await getTokens(code);
        setTokens(newTokens);
      } catch (err) {
        // DO NOTHING
      }
      setAuthenticating(false);
    };
    if (code !== null) {
      execute();
    }
  }, []);
  const handleClick = useCallback(() => {
    removeTokens();
    setTokens(null);
  }, [setTokens]);

  if (authenticating) {
    return <div>authenticating...</div>
  }
  if (tokens === null) {
    return <a href={loginUrl}>Login</a>;
  }
  return (
    <>
      <div>
        <button onClick={handleClick}>Logout</button>
      </div>
      <Authenticated />
    </>
  );
}

export default App;
