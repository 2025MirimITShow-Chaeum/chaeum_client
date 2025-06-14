import axios from 'axios';

const BASE_URL = 'https://b7d6-122-37-66-196.ngrok-free.app/api';

export const fetchGroupsByUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/group?user_id=${userId}`);
  return response.data;
};