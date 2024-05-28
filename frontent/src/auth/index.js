import axios from 'axios';
import API_URL from '../config';

export const signup = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data.error : 'Something went wrong' };
  }
};

export const signin = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data.error : 'Something went wrong' };
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};
export const signout = async (next) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            next();
            const response = await axios.get(`${API_URL}/signout`);
            console.log('signout', response);
        }
    } catch (error) {
        console.log(error);
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};