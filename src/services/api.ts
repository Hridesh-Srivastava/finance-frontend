import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Add a response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Types
export interface Transaction {
  _id: string
  user: string
  name: string
  amount: number
  date: string
  category: string
  notes?: string
  createdAt: string
}

export interface User {
  _id: string
  name: string
  email: string
  preferences: {
    currency: string
    theme: string
    notifications: boolean
    weeklyReport: boolean
    monthlyReport: boolean
  }
  createdAt: string
}

export interface AuthResponse {
  token: string
}

export interface Stats {
  income: number
  expenses: number
  expensesByCategory: { _id: string; total: number }[]
  monthlyData: { _id: { month: number; year: number; category: boolean }; total: number }[]
}

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string }) => api.post<AuthResponse>("/auth/register", data),

  login: (data: { email: string; password: string }) => api.post<AuthResponse>("/auth/login", data),

  getMe: () => api.get<User>("/auth/me"),

  forgotPassword: (data: { email: string }) => api.post("/auth/forgot-password", data),

  resetPassword: (data: { token: string; password: string }) => api.post("/auth/reset-password", data),
}

// Transaction API
export const transactionApi = {
  getAll: () => api.get<Transaction[]>("/transactions"),

  getById: (id: string) => api.get<Transaction>(`/transactions/${id}`),

  create: (transaction: Omit<Transaction, "_id" | "user" | "createdAt">) =>
    api.post<Transaction>("/transactions", transaction),

  update: (id: string, transaction: Partial<Omit<Transaction, "_id" | "user" | "createdAt">>) =>
    api.put<Transaction>(`/transactions/${id}`, transaction),

  delete: (id: string) => api.delete(`/transactions/${id}`),

  getStats: () => api.get<Stats>("/transactions/stats"),
}

// User API
export const userApi = {
  getProfile: () => api.get<User>("/users/profile"),

  updateProfile: (data: { name: string; email: string }) => api.put<User>("/users/profile", data),

  updateSettings: (settings: Partial<User["preferences"]>) => api.put<User>("/users/settings", settings),

  updatePassword: (data: { currentPassword: string; newPassword: string }) => api.put("/users/password", data),
}

// AI API
export const aiApi = {
  askQuestion: (question: string) => api.post<{ answer: string }>("/ai/ask", { question }),

  getInsights: () => api.get<{ insights: string[] }>("/ai/insights"),
}

export default api

