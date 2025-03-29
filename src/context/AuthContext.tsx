"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authApi, type User } from "../services/api"

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  clearError: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      setLoading(true)
      const { data } = await authApi.getMe()
      setUser(data)
      setError(null)
      // Reset retry count on success
      setRetryCount(0)
    } catch (err: any) {
      console.error("Failed to fetch user:", err)

      // If we've already retried 3 times, give up
      if (retryCount >= 3) {
        localStorage.removeItem("token")
        setError("Session expired. Please login again.")
        setLoading(false)
        return
      }

      // If it's a network error, retry after a delay
      if (err.message.includes("Network") || err.code === "ERR_NETWORK") {
        console.log(`Retrying fetch user (attempt ${retryCount + 1})...`)
        setRetryCount((prev) => prev + 1)

        // Retry after 2 seconds
        setTimeout(() => {
          fetchUser()
        }, 2000)
      } else {
        localStorage.removeItem("token")
        setError("Session expired. Please login again.")
        setLoading(false)
      }
    } finally {
      if (retryCount === 0) {
        setLoading(false)
      }
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { data } = await authApi.login({ email, password })
      localStorage.setItem("token", data.token)
      await fetchUser()
    } catch (err: any) {
      console.error("Login error:", err)
      const message = err.response?.data?.message || "Failed to login"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)

      // Log registration attempt
      console.log("Registering user:", { name, email })

      // Use direct fetch for debugging
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Server responded with status: ${response.status}`)
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      await fetchUser()
    } catch (err: any) {
      console.error("Registration error:", err)
      const message = err.message || "Failed to register"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true)
      await authApi.forgotPassword({ email })
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to process request"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (token: string, password: string) => {
    try {
      setLoading(true)
      await authApi.resetPassword({ token, password })
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to reset password"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        clearError,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

