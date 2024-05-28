import axios from 'axios';
import API_URL from '../config';

// Fetch list of users
export const listUser = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/list`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return { error: error.response ? error.response.data.error : 'Something went wrong' };
  }
};

export const getUser = async (userId, token) => {
  try {
      const response = await axios.get(`${API_URL}/user/${userId}/details`, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });
      // Check if the response is successful
      if (response.status === 200) {
          return response.data; // Return data if successful
      } else {
          return { error: 'Failed to fetch user details' }; // Return error message otherwise
      }
  } catch (error) {
      // Handle network errors or invalid responses
      return { error: error.response ? error.response.data.error : 'Something went wrong' };
  }
};


// Update user information
export const updateUser = async (userId, user, token) => {
    try {
        const response = await axios.put(`${API_URL}/user/${userId}`, user, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return { error: error.response ? error.response.data.error : 'Something went wrong' };
    }
};


export const createCharge = async (userId, token, charge) => {
  try {
      const response = await axios.post(
          `${API_URL}/charge/create/${userId}`,
          charge,
          {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
              }
          }
      );
      return response.data;
  } catch (err) {
      console.error('Error creating category:', err.response ? err.response.data : err.message);
      throw err; 
  }
};

export const getAllCharges = async (token) => {
  try {
      const response = await axios.get(
          `${API_URL}/charge/list`,
          {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
              }
          }
      );
      return response.data;
  } catch (err) {
      console.error('Error fetching all charges:', err.response ? err.response.data : err.message);
      throw err; 
  }
};

export const createUserJurisdiction = async (userId, token, charge) => {
    try {
        const response = await axios.post(
            `${API_URL}/create/${userId}`,
            charge,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (err) {
        console.error('Error creating category:', err.response ? err.response.data : err.message);
        throw err; 
    }
  };

  export const getAllJurisdiction = async (token) => {
    try {
        const response = await axios.get(
            `${API_URL}/list`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (err) {
        console.error('Error fetching all charges:', err.response ? err.response.data : err.message);
        throw err; 
    }
  };
  
