import axios from "axios"

/**
 * Utility to check if the backend server is reachable
 * @returns Promise<boolean> - True if server is reachable, false otherwise
 */
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    const response = await axios.get(`${baseUrl}/health`, { timeout: 5000 })
    return response.status === 200
  } catch (error) {
    console.error("Server health check failed:", error)
    return false
  }
}

/**
 * Utility to check if MongoDB is connected
 * @returns Promise<boolean> - True if MongoDB is connected, false otherwise
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
    const response = await axios.get(`${baseUrl}/health/db`, { timeout: 5000 })
    return response.status === 200
  } catch (error) {
    console.error("Database health check failed:", error)
    return false
  }
}

/**
 * Diagnose connection issues and return helpful messages
 * @returns Promise<string[]> - Array of diagnostic messages
 */
export const diagnoseConnectionIssues = async (): Promise<string[]> => {
  const messages: string[] = []

  const serverReachable = await checkServerHealth()
  if (!serverReachable) {
    messages.push("Cannot reach the backend server. Please check if the server is running.")
    messages.push("Make sure the server is running on the correct port (default: 5000).")
    messages.push("Check if there are any firewall or network issues blocking the connection.")
    return messages
  }

  const dbConnected = await checkDatabaseConnection()
  if (!dbConnected) {
    messages.push("Server is reachable but cannot connect to the database.")
    messages.push("Check MongoDB connection string and make sure MongoDB is running.")
  }

  if (messages.length === 0) {
    messages.push("All systems are operational.")
  }

  return messages
}

