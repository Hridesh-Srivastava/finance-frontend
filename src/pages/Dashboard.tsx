"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for demonstration
const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
  { name: "Jul", income: 3490, expenses: 4300 },
]

const categoryData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 300 },
  { name: "Utilities", value: 200 },
  { name: "Shopping", value: 278 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const Dashboard = () => {
  const [query, setQuery] = useState("")
  const [queryResult, setQueryResult] = useState("")

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call the AI backend
    setQueryResult(
      `Based on your spending patterns, ${query.includes("afford") ? "you can afford this purchase if you reduce your entertainment expenses by 15% this month." : "your biggest expense category is Food at 27% of your total spending."}`,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="mt-4 md:mt-0">
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
        <div className="card bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
          <p className="text-primary-800 dark:text-primary-200">{queryResult}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Balance</h3>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">$12,750</p>
          <p className="text-sm text-green-600">+5.2% from last month</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Income</h3>
          <p className="text-3xl font-bold text-green-600">$4,250</p>
          <p className="text-sm text-green-600">+2.1% from last month</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Expenses</h3>
          <p className="text-3xl font-bold text-red-600">$2,150</p>
          <p className="text-sm text-red-600">+7.4% from last month</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Savings</h3>
          <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">$2,100</p>
          <p className="text-sm text-green-600">+12.3% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Income vs Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#0ea5e9" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Spending Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="expenses" stroke="#ef4444" activeDot={{ r: 8 }} name="Expenses" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Expense Categories</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
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
    </div>
  )
}

export default Dashboard

