const urlBase = process.env.REACT_APP_API;

export const loginUrl = `${urlBase}/login`;

export const postGrant = async (code) => {
  const response = await fetch(
    `${urlBase}/grant`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
      }),
    }
  );
  const tokens = await response.json();
  return tokens;
};