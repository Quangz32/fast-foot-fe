import axios from "axios";

const BASE_URL = "http://localhost:2003/api"; // Thay thế bằng API endpoint thực tế của bạn

export interface LoginPayload {
  phone: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    phone: string;
    name: string;
  };
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export default api;
