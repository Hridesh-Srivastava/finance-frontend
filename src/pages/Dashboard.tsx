"use client"

import type React from "react"

import { useState } from "react"
import Stats from "../components/Stats"

const Dashboard = () => {
  const [query, setQuery] = useState("")
  const [queryResult, setQueryResult] = useState("")
  const [timeframe, setTimeframe] = useState("monthly")

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // In a real app, this would call the AI backend
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/ai/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: query }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()
      setQueryResult(data.answer)
    } catch (error) {
      console.error("Error querying AI:", error)
      setQueryResult(
        `Based on your spending patterns, ${query.includes("afford") ? "you can afford this purchase if you reduce your entertainment expenses by 15% this month." : "your biggest expense category is Food at 27% of your total spending."}`,
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="input">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <form onSubmit={handleQuerySubmit} className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your finances..."
              className="input"
            />
            <button type="submit" className="ml-2 btn btn-primary">
              Ask
            </button>
          </form>
        </div>
      </div>

      {queryResult && (
        <div className="card bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 p-4">
          <p className="text-primary-800 dark:text-primary-200">{queryResult}</p>
        </div>
      )}

      <Stats timeframe={timeframe as "weekly" | "monthly" | "yearly"} />

      <div className="card p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {[
            { id: 1, name: "Grocery Store", amount: -120.5, date: "2025-03-28", category: "Food" },
            { id: 2, name: "Salary Deposit", amount: 3500.0, date: "2025-03-25", category: "Income" },
            { id: 3, name: "Electric Bill", amount: -85.2, date: "2025-03-22", category: "Utilities" },
            { id: 4, name: "Restaurant", amount: -64.3, date: "2025-03-20", category: "Food" },
            { id: 5, name: "Gas Station", amount: -45.0, date: "2025-03-18", category: "Transport" },
          ].map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center p-3 border-b dark:border-gray-700 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{transaction.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {transaction.date} • {transaction.category}
                </p>
              </div>
              <span className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

