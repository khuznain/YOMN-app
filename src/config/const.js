// Replace with ur own ip
const machineIP = `192.168.10.5`;

export const BASE_URL = `http://${machineIP}:5000`;

export const ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/users/login`,
  SIGN_UP: `${BASE_URL}/api/users/signup`
};
