// import React, { useEffect, useState } from 'react';
import React from 'react';
import Authenticated from './components/Authenticated';

/*
const params = (new URL(document.location)).searchParams;
const code = params.get('code'); 
*/

function App() {
  // const [authenticating, setAuthenticating] = useState(code !== null);
  // const [tokens, setTokens] = useState(null);

  /*
  useEffect(() => {
    const execute = async () => {
      window.history.replaceState({}, document.title, '/');
      try {
        const tokens = await postGrant(code);
        // TODO: REMOVE
        console.log(tokens);
        setTokens(tokens);
      } catch (err) {
        // DO NOTHING
      }
      setAuthenticating(false);
    };
    if (code !== null) {
      execute();
    }
  }, []);

  if (authenticating) {
    return <div>authenticating...</div>
  }
  if (tokens === null) {
    return <a href={loginUrl}>Login</a>;
  }
  */
  return (
    <Authenticated />
  );
}

export default App;
