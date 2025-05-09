import axios from 'axios';
import { X_API_KEY } from '../config/env';

const request = async options => {
  const apiKey = X_API_KEY; // Replace with your actual API key

  const updateOption = {
    ...options,
    headers: {
      ...(options.headers || {}),
      'x-api-key': apiKey,
    },
  };
  // const updateOption = { ...options };

  try {
    const apiCall = await axios(updateOption);
    return apiCall;
  } catch (error) {
    return error.response;
  }
};
export default request;
