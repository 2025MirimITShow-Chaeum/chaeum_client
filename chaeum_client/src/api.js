// src/api.js
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const { BASE_URL } = Constants.expoConfig.extra;

const api = axios.create({
  baseURL: `${BASE_URL}/api`,  // <-- /api 까지만
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('API 요청에 토큰 추가됨:', token.substring(0, 20) + '...');
      }
    } catch (error) {
      console.error('토큰 조회 실패:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log('토큰 만료 또는 인증 실패');
      await SecureStore.deleteItemAsync('accessToken');
      // 네비게이션은 컴포넌트 단에서 처리하세요
    }
    return Promise.reject(error);
  }
);

// 홈 정보 조회
export const fetchHome = () =>
  api.get('/home');

// 이메일/비번 로그인
// export const login = ({ email, password }) =>
//   api.post('/auth/login', { email, password });

// 구글 로그인 (Firebase ID 토큰 전달)
export const loginWithGoogle = ({ idToken }) =>
  api.post('/auth/login', { idToken });

export default api;
