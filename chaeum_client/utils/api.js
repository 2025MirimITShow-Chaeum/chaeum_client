import axios from 'axios';
import { BASE_URL, ACCESSTOKEN } from '@env';

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${ACCESSTOKEN}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// 사용자가 가입한 그룹 불러오기
export const fetchGroupsByUser = async (userId) => {
  const response = await api.get(`/group`, {
    params: { user_id: userId },
  });
  return response.data;
};

// 그룹의 정보 가져오기
export const fetchGroupDetail = async (groupId) => {
  const response = await api.get(`/group/${groupId}`);
  return response.data;
};

// 그룹의 전체 투두 가져오기
export const fetchTodosByGroup = async (groupId) => {
  const response = await api.get(`/todos/group/${groupId}`);
  return response.data;
};

// 전체 그룹 랭킹 가져오기
export const fetchAllGroupRankings = async () => {
  const res = await api.get(`/ranking`);
  return res.data;
};

// 내가 가입한 그룹들 랭킹 가져오기
export const fetchMyGroupRankings = async (userId) => {
  const res = await api.get(`/ranking/me`, {
    params: { user_id: userId },
  });
  return res.data;
};