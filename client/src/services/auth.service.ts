import axios from 'axios';

export async function login(userData: { email: string; password: string }) {
  const response = await axios.post('http://localhost:3001/auth/login', userData, {
    withCredentials: true, 
  });
  return response.data;
}

export async function signUp(userData: {name:string, email: string; password: string ,dob:string}) {
  const response = await axios.post('http://localhost:3001/auth/signup', userData, {
    withCredentials: true, 
  });
  return response.data;
}

export async function getOtp(userData: { email: string; password: string }) {
  const response = await axios.post('http://localhost:3001/otp/send-otp', userData, {
    withCredentials: true, 
  });
  return response.data;
}

export async function verifyOtp(userData: { userId:number,otp:number }) {
  const response = await axios.post('http://localhost:3001/otp/verify-otp', userData, {
    withCredentials: true, 
  });
  return response.data;
}
