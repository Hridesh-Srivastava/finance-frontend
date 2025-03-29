"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data
const monthlyData = [
  { name: "Jan", income: 4000, expenses: 2400, savings: 1600 },
  { name: "Feb", income: 3000, expenses: 1398, savings: 1602 },
  { name: "Mar", income: 2000, expenses: 1800, savings: 200 },
  { name: "Apr", income: 2780, expenses: 1908, savings: 872 },
  { name: "May", income: 1890, expenses: 1800, savings: 90 },
  { name: "Jun", income: 2390, expenses: 1800, savings: 590 },
  { name: "Jul", income: 3490, expenses: 2300, savings: 1190 },
]

const categoryData = [
  { name: "Food", value: 400 },
  { name: "Transport", value: 300 },
  { name: "Entertainment", value: 300 },
  { name: "Utilities", value: 200 },
  { name: "Shopping", value: 278 },
]

const weeklyData = [
  { day: "Mon", amount: 120 },
  { day: "Tue", amount: 85 },
  { day: "Wed", amount: 210 },
  { day: "Thu", amount: 145 },
  { day: "Fri", amount: 320 },
  { day: "Sat", amount: 180 },
  { day: "Sun", amount: 90 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("monthly")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <div className="mt-4 md:mt-0">
          <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="input">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Savings Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  name="Savings"
                />
              </AreaChart>
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Daily Spending (This Week)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#ef4444" activeDot={{ r: 8 }} name="Spending" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-medium text-green-800 dark:text-green-200">Positive Trend</h4>
            <p className="text-green-700 dark:text-green-300">
              Your savings have increased by 15% compared to last month. Keep up the good work!
            </p>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Spending Alert</h4>
            <p className="text-yellow-700 dark:text-yellow-300">
              Your entertainment expenses are 20% higher than your monthly average. Consider adjusting your budget.
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Recommendation</h4>
            <p className="text-blue-700 dark:text-blue-300">
              Based on your income and spending patterns, you could increase your monthly savings by $250 by reducing
              food expenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

