"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { healthApi } from "../services/api"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking")

  const { register } = useAuth()
  const navigate = useNavigate()

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await healthApi.checkServer()
        setServerStatus("online")
      } catch (err) {
        console.error("Server health check failed:", err)
        setServerStatus("offline")
      }
    }

    checkServerStatus()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Check server status before attempting registration
    if (serverStatus === "offline") {
      setError("Server is currently unavailable. Please try again later.")
      return
    }

    try {
      setLoading(true)

      // Log registration attempt for debugging
      console.log("Attempting to register user:", { name, email })

      await register(name, email, password)
      navigate("/app")
    } catch (err: any) {
      console.error("Registration error:", err)

      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.message.includes("Network")) {
        setError("Unable to connect to the server. Please check your internet connection and try again.")
      } else {
        setError("Registration failed. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-left">
          <button
            onClick={() => navigate("/")}
            className="mb-4 text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            &larr; Back to Home
          </button>
        </div>

        <div>
          <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white">Finance Tracker</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>
        </div>

        {serverStatus === "offline" && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md">
            <p className="text-yellow-800 dark:text-yellow-200">
              Server is currently offline. Registration may not work until the server is back online.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-md">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 dark:bg-gray-800"
                placeholder="Full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 dark:bg-gray-800"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 dark:bg-gray-800"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 dark:bg-gray-800"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || serverStatus === "offline"}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

