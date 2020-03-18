import React, { useCallback, useEffect, useState } from 'react';
import Authenticated from './components/Authenticated';
import { getTokens, login, loginUrl, logout } from './api/auth';

const params = (new URL(document.location)).searchParams;
const code = params.get('code'); 
const tokens = getTokens();

function App() {
  const [authenticated, setAuthenticated] = useState(tokens !== null);
  const [authenticating, setAuthenticating] = useState(code !== null);
  useEffect(() => {
    const execute = async () => {
      window.history.replaceState({}, document.title, '/');
      try {
        await login(code);
        setAuthenticated(true);
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
    logout();
    setAuthenticated(false);
  }, [setAuthenticated]);

  if (authenticating) {
    return <div>authenticating...</div>;
  }
  if (!authenticated) {
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
