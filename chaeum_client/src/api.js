// src/api.js
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";


const { BASE_URL } = Constants.expoConfig.extra;

// JWT 헤더 헬퍼
async function authHeaders() {
  const token = await SecureStore.getItemAsync("accessToken");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
}

// axios 인스턴스 (/api 까지 baseURL에 포함)
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await SecureStore.deleteItemAsync("accessToken");
      // TODO: 네비게이션 단에서 로그인 화면으로 리다이렉트
    }
    return Promise.reject(err);
  }
);

// 1) 로그인
export async function loginWithGoogle({ idToken }) {
  return api.post("/auth/login", { idToken });
}

// 2) 유저 정보 업데이트
export async function registerNickname(nickname) {
  const headers = await authHeaders();
  return api.patch("/auth/register", { nickname }, { headers });
}
export async function registerProfileImage(profile_image) {
  const headers = await authHeaders();
  return api.patch("/auth/register", { profile_image }, { headers });
}

// 3) 홈 데이터
export async function fetchHome() {
  const headers = await authHeaders();
  return api.get("/home", { headers });
}

export async function fetchGroups(userId) {
  const headers = await authHeaders();
  return api.get(`/group?user_id=${userId}`, { headers });
}


// 오늘 날짜(YYYY-MM-DD) 조회용 헬퍼
function getToday() {
  return new Date().toISOString().slice(0, 10);
}


export async function fetchTimer(groupId) {
  const headers = await authHeaders();
  const date = getToday();
  return api.get(`/timers?group_id=${groupId}&date=${date}`, { headers });
}


export async function startTimer(groupId) {
  const headers = await authHeaders();
  return api.post(`/timers/${groupId}/start`, {}, { headers });
}


export async function stopTimer(groupId) {
  const headers = await authHeaders();
  return api.post(`/timers/${groupId}/stop`, {}, { headers });
}

// 9) TODO 생성
export async function createTodo({ user_id, group_id, title }) {
  const headers = await authHeaders();
  return api.post("/todos", { user_id, group_id, title }, { headers });
}

export async function fetchAccumulatedTime(date) {
  const headers = await authHeaders();
  return api.get(`/timers/accumulated-time?date=${date}`, { headers });
}


export default api;