import axios from 'axios';

export async function login(userData: { email: string; password: string }) {
  const response = await axios.post('http://localhost:3001/auth/login', userData, {
    withCredentials: true, 
  });
  return response.data;
}