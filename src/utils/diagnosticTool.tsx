"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const DiagnosticTool = () => {
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    setResults([])
    const diagnosticResults: string[] = []

    try {
      // 1. Check if server is reachable
      diagnosticResults.push("🔍 Testing server connection...")
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        const response = await axios.get(`${baseUrl}/health`, { timeout: 5000 })

        if (response.status === 200) {
          diagnosticResults.push("✅ Server is reachable and responding")

          // Check MongoDB connection if server is reachable
          if (response.data.mongodb === "connected") {
            diagnosticResults.push("✅ MongoDB is connected")
          } else {
            diagnosticResults.push("❌ MongoDB is not connected to the server")
            diagnosticResults.push("→ Check your MongoDB connection string in the server's .env file")
          }
        } else {
          diagnosticResults.push(`❌ Server responded with unexpected status: ${response.status}`)
        }
      } catch (error: any) {
        diagnosticResults.push("❌ Cannot reach the server")

        if (error.code === "ECONNREFUSED") {
          diagnosticResults.push("→ The server is not running or not listening on the expected port")
          diagnosticResults.push("→ Make sure your backend server is running (npm start)")
        } else if (error.code === "ECONNABORTED") {
          diagnosticResults.push("→ Connection timed out. Server might be overloaded or unreachable")
        } else if (error.message.includes("Network Error")) {
          diagnosticResults.push("→ Network error. Check your internet connection")
        } else {
          diagnosticResults.push(`→ Error: ${error.message}`)
        }
      }

      // 2. Check CORS configuration
      diagnosticResults.push("\n🔍 Testing CORS configuration...")
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        const response = await fetch(`${baseUrl}/health`, {
          method: "OPTIONS",
          headers: {
            Origin: window.location.origin,
          },
        })

        if (response.ok) {
          const corsHeader = response.headers.get("Access-Control-Allow-Origin")
          if (corsHeader === "*" || corsHeader === window.location.origin) {
            diagnosticResults.push("✅ CORS is properly configured")
          } else {
            diagnosticResults.push(
              `⚠️ CORS might be misconfigured. Expected '${window.location.origin}' but got '${corsHeader}'`,
            )
          }
        } else {
          diagnosticResults.push("⚠️ OPTIONS request failed, CORS might be misconfigured")
        }
      } catch (error: any) {
        diagnosticResults.push(`❌ CORS test failed: ${error.message}`)
      }

      // 3. Check environment variables
      diagnosticResults.push("\n🔍 Checking environment variables...")
      const apiUrl = import.meta.env.VITE_API_URL
      if (apiUrl) {
        diagnosticResults.push(`✅ VITE_API_URL is set to: ${apiUrl}`)
      } else {
        diagnosticResults.push("⚠️ VITE_API_URL is not set, using default: http://localhost:5000/api")
      }

      // 4. Network information
      diagnosticResults.push("\n🔍 Network information:")
      diagnosticResults.push(`→ Current origin: ${window.location.origin}`)
      diagnosticResults.push(`→ Current protocol: ${window.location.protocol}`)
      diagnosticResults.push(`→ Online status: ${navigator.onLine ? "Online" : "Offline"}`)
    } catch (error: any) {
      diagnosticResults.push(`❌ Diagnostic error: ${error.message}`)
    } finally {
      setResults(diagnosticResults)
      setLoading(false)
    }
  }

  useEffect(() => {
    // Run diagnostics on mount
    runDiagnostics()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-md">
        <div
          className="bg-primary-600 text-white px-4 py-2 flex justify-between items-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <h3 className="font-medium">Connection Diagnostics</h3>
          <span>{expanded ? "▼" : "▲"}</span>
        </div>

        {expanded && (
          <div className="p-4">
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="mb-4 px-4 py-2 bg-primary-600 text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Running..." : "Run Diagnostics Again"}
            </button>

            <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-md max-h-60 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
                </div>
              ) : (
                <pre className="text-xs whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-200">
                  {results.join("\n")}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiagnosticTool

