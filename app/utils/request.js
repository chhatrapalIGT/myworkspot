import axios from 'axios';

const request = async options => {
  const updateOption = { ...options };
  try {
    const apiCall = await axios(updateOption);
    return apiCall;
  } catch (error) {
    console.log(`error`, error);
    return error.response;
  }
};
export default request;
