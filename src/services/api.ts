import axios, { type AxiosError } from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout
  withCredentials: false, // Important for CORS
})

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Log outgoing requests for debugging
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)

    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

// Add a response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    // Log successful responses for debugging
    console.log(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error: AxiosError) => {
    // Handle session expiration
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
      return Promise.reject(new Error("Your session has expired. Please log in again."))
    }

    // Log network errors
    if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      console.error("Network error:", error.message)
      return Promise.reject(new Error("Network error. Please check your connection and try again."))
    }

    // Log other errors
    console.error("API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })

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

  forgotPassword: (data: { email: string }) => api.post("/users/forgot-password", data),

  resetPassword: (data: { token: string; password: string }) => api.post("/users/reset-password", data),
}

// Contact API
export const contactApi = {
  submitForm: (data: { name: string; email: string; subject: string; message: string }) => api.post("/contact", data),
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

// Health check API
export const healthApi = {
  checkServer: () => api.get("/health"),
}

export default api

