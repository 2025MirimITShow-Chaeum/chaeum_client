import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const { BASE_URL } = Constants.expoConfig.extra;

// JWT 헤더 생성 함수
async function authHeaders() {
  const token = await SecureStore.getItemAsync("accessToken");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
}

// axios 인스턴스
const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
});

// 응답 인터셉터: 401 시 토큰 삭제
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await SecureStore.deleteItemAsync("accessToken");
      // TODO: 네비게이션으로 로그인 화면 이동
    }
    return Promise.reject(err);
  }
);

// 오늘 날짜(YYYY-MM-DD) 헬퍼
function getToday() {
  return new Date().toISOString().slice(0, 10);
}

// 인증 / 로그인 관련
export async function loginWithGoogle({ idToken }) {
  return api.post("/auth/login", { idToken });
}

export async function registerNickname(nickname) {
  const headers = await authHeaders();
  return api.patch("/auth/register", { nickname }, { headers });
}

export async function registerProfileImage(profile_image) {
  const headers = await authHeaders();
  return api.patch("/auth/register", { profile_image }, { headers });
}

// 홈 / 타이머
export async function fetchHome() {
  const headers = await authHeaders();
  return api.get("/home", { headers });
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

export async function fetchAccumulatedTime(date) {
  const headers = await authHeaders();
  return api.get(`/timers/accumulated-time?date=${date}`, { headers });
}

// 그룹 관련
export async function postGroup({ name, color }) {
  console.log("그룹아이디", name, color)
  const headers = await authHeaders();
  return api.post(`/group`, { name, color }, {
    headers,
  });
}

export async function joinGroup() {
  const headers = await authHeaders();
  return api.post(`/group`, {
    headers,
  });
}

export async function fetchGroupsByUser() {
  const headers = await authHeaders();
  const res = await api.get(`/group`, {
    headers,
  });
  return res.data;
}

export async function fetchGroupDetail(groupId) {
  const headers = await authHeaders();
  const res = await api.get(`/group/${groupId}`, { headers });
  return res.data;
}

export async function fetchTodosByGroup(groupId) {
  const headers = await authHeaders();
  const res = await api.get(`/todos/group/${groupId}`, { headers });
  return res.data;
}

// 그룹 전체 랭킹
export async function fetchAllGroupRankings() {
  const headers = await authHeaders();
  const res = await api.get(`/group/ranking`, { headers });
  return res.data;
}

// 그룹 랭킹
export async function fetchMyGroupRankings(userId) {
  const headers = await authHeaders();
  const res = await api.get(`/group/ranking/user`, {
    params: { user_id: userId },
    headers,
  });
  return res.data;
}


// 유저 투두 관련
export async function fetchUserTodos() {
  const headers = await authHeaders();
  return api.get('/todos', { headers })
}

export async function createTodo({ group_id, title }) {
  const headers = await authHeaders();
  return api.post("/todos", { group_id, title }, { headers });
}

// 투두 수정
export async function updateTodo(todoId, { title }) {
  const headers = await authHeaders();
  return api.patch(`/todos/${todoId}`, { title }, { headers })
}

// 투두 완료 / 취소
export async function updateStatusTodo(todoId, { isDone }) {
  const headers = await authHeaders();
  return api.patch(`/todos/${todoId}`, { isDone }, { headers })
}

export async function deleteTodo(todoId) {
  const headers = await authHeaders();
  return api.delete(`/todos/${todoId}`, { headers })
}


// 유저 관련
export async function fetchUserInfo() {
  const headers = await authHeaders();
  const res = await api.get('/users', {
    headers
  });
  return res.data;
};

export async function updateUserInfo({ nickname, slogan }) {
  const headers = await authHeaders();
  const res = await api.patch('/users', {
    nickname, slogan
  }, { headers });
  return res.data;
}

export async function deleteUser() {
  const headers = await authHeaders();
  return api.delete('/users', { headers });
}


// 디데이 관련
export async function postDday({ title, end_at }) {
  const headers = await authHeaders({});
  const res = api.post('/dday', { title, end_at }, { headers })
  return res.data ?? [];
}

export async function fetchDdays() {
  const headers = await authHeaders();
  const res = await api.get('/dday', { headers })
  return res.data.data ?? [];
}

export async function updateDday(id) {
  const headers = await authHeaders();
  return api.patch(`/dday/${id}`, { headers })
}

export async function deleteDday(id) {
  const headers = await authHeaders();
  console.log("삭제 요청 →", `/dday/${id}`);
  return api.delete(`/dday/${id}`, { headers })
}

export default api;
