import cryptoBrowserify from 'crypto-browserify';

const SCOPE = 'phone+email+openid+profile+aws.cognito.signin.user.admin';

const accessToken = window.localStorage.getItem('accessToken');
const idToken = window.localStorage.getItem('idToken');
const refreshToken = window.localStorage.getItem('refreshToken');
let tokens = accessToken === null ? null : {
    accessToken,
    idToken,
    refreshToken,
  };

const base64URLEncode = str => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = buffer => {
  return cryptoBrowserify.createHash('sha256').update(buffer).digest();
}

let storedVerifier = window.localStorage.getItem('verifier');
if (storedVerifier === null) {
  const newVerifier = base64URLEncode(cryptoBrowserify.randomBytes(32));
  window.localStorage.setItem('verifier', newVerifier);
  storedVerifier = newVerifier;
}
const verifier = storedVerifier; 
const challenge = base64URLEncode(sha256(storedVerifier));
const baseUrl = process.env.REACT_APP_AUTH_BASE_URL;
const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;
const redirectUri = process.env.REACT_APP_AUTH_REDIRECT_URI;
const tokenUrl = `${baseUrl}/oauth2/token`;

export const loginUrl = `${baseUrl}/login?scope=${SCOPE}&response_type=code&client_id=${clientId}&code_challenge=${challenge}&code_challenge_method=S256&redirect_uri=${redirectUri}`;

export const refreshTokens = async refreshToken => {
  const body = `grant_type=refresh_token&client_id=${clientId}&refresh_token=${refreshToken}`;
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!response.ok) {
    throw Error();
  }
  const { access_token, id_token } = await response.json();
  window.localStorage.setItem('accessToken', access_token);
  window.localStorage.setItem('idToken', id_token);
  window.localStorage.setItem('refreshToken', refreshToken);
  tokens = {
    accessToken,
    idToken,
    refreshToken,
  };
};

export const login = async code => {
  const body = `grant_type=authorization_code&client_id=${clientId}&code_verifier=${verifier}&code=${code}&redirect_uri=${redirectUri}`;
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!response.ok) {
    throw Error();
  }
  const { access_token, id_token, refresh_token } = await response.json();
  window.localStorage.setItem('accessToken', access_token);
  window.localStorage.setItem('idToken', id_token);
  window.localStorage.setItem('refreshToken', refresh_token);
  tokens = {
    accessToken: access_token,
    idToken: id_token,
    refreshToken: refresh_token,
  };
};

export const logout = () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('idToken');
  window.localStorage.removeItem('refreshToken');
  tokens = null;
};

export const getTokens = () => tokens;
