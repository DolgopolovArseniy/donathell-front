import axios from "axios";
import { CurrencyCode, Transaction, User } from "../types/types";

interface CreateTransactionData {
  amount: number;
  currency: CurrencyCode;
  from: string;
  message: string;
  slug: string;
}

export interface LoginData {
  loginIdentifier: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface QueryParams {
  page: number;
  currency?: CurrencyCode;
  from?: string;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}

export type AppliedFilters = Omit<QueryParams, "page">;

export type AuthFn = (
  data: LoginData | SignupData,
) => Promise<{ token: string; user: User }>;

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export const getUserBySlug = async (slug: string): Promise<User> => {
  const res = await api.get(`/users/${slug}`);
  return res.data.data.user;
};

export const createTransaction = async (
  data: CreateTransactionData,
): Promise<void> => {
  await api.post("/transactions", data);
};

export const getTransactions = async (
  params: QueryParams,
): Promise<{
  transactions: Transaction[];
  total: number;
}> => {
  const res = await api.get("/transactions", { params });
  return {
    transactions: res.data.data.transactions,
    total: res.data.total,
  };
};

export const getMe = async (): Promise<User> => {
  const res = await api.get("/users/me");
  return res.data.data.user;
};

export const loginApi: AuthFn = async (data) => {
  const res = await api.post("/users/login", data);
  return { token: res.data.token, user: res.data.data.user };
};

export const signupApi: AuthFn = async (data) => {
  const res = await api.post("/users/signup", data);
  return { token: res.data.token, user: res.data.data.user };
};
