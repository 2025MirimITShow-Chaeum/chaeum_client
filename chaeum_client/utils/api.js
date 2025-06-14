import axios from 'axios';

const BASE_URL = 'https://4b2c-122-37-66-196.ngrok-free.app/api';

export const fetchGroupsByUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/group?user_id=${userId}`);
  return response.data;
};

export const fetchGroupDetail = async (groupId) => {
  const response = await axios.get(`${BASE_URL}/group/${groupId}`);
  return response.data;
};

export const fetchTodosByGroup = async (groupId) => {
  const response = await axios.get(`${BASE_URL}/todos/group/${groupId}`);
  return response.data;
};