import axios from 'axios';

const BASE_URL = 'https://3529-122-37-66-196.ngrok-free.app/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkRlNyaWpKUERSUFk1cEV0S2s0bkZ3WXdqNTUyIiwidWlkIjoiZEZTcmlqSlBEUlBZNXBFdEtrNG5Gd1l3ajU1MiIsImlhdCI6MTc0OTkzMTkyNSwiZXhwIjoxNzQ5OTM1NTI1fQ.g_n1hWtzP_rmidWsJvDKWzGo1LTDuQlnzSo9BVeztZA';

export const fetchGroupsByUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/group?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const fetchAllGroupRankings = async () => {
  const res = await axios.get(`${API_URL}/ranking`);
  return res.data;
};

export const fetchMyGroupRankings = async (userId) => {
  const res = await axios.get(`${API_URL}/ranking/me`, {
    params: { user_id: userId },
  });
  return res.data;
};