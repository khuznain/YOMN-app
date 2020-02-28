// Replace with ur own ip

// execute this command so u can get ur localhost ip address from the computer

// ipconfig getifaddr en0

// export const BASE_URL = `http://localhost:5000`;

export const BASE_URL = `http://192.168.10.4:5000`;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/users/login`,
  SIGN_UP: `${BASE_URL}/api/users/signup`,
  USERS: `${BASE_URL}/api/users`,
  USER: `${BASE_URL}/api/items/user`,
  POST_ITEM: `${BASE_URL}/api/items`,
  DELETE_ITEM: `${BASE_URL}/api/items`
};
