"use client"

import { useState, useEffect } from "react"
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B", "#6B66FF"]

interface StatsProps {
  userId?: string
  timeframe?: "weekly" | "monthly" | "yearly"
}

interface StatsData {
  income: number
  expenses: number
  expensesByCategory: { _id: string; total: number }[]
  monthlyData: { _id: { month: number; year: number; category: boolean }; total: number }[]
}

const Stats = ({ userId, timeframe = "monthly" }: StatsProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<StatsData | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No authentication token found")
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/transactions/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!response.ok) {
          throw new Error("Failed to fetch statistics")
        }

        const data = await response.json()
        setStats(data)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching stats:", err)
        setError(err.message || "Failed to load statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [userId, timeframe])

  // Format monthly data for charts
  const formatMonthlyData = () => {
    if (!stats?.monthlyData) return []

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const formattedData: { name: string; income: number; expenses: number; savings: number }[] = []

    // Group by month and year
    const groupedData = stats.monthlyData.reduce(
      (acc, item) => {
        const key = `${item._id.year}-${item._id.month}`
        if (!acc[key]) {
          acc[key] = {
            year: item._id.year,
            month: item._id.month,
            income: 0,
            expenses: 0,
          }
        }

        if (item._id.category) {
          // Income
          acc[key].income += item.total
        } else {
          // Expense
          acc[key].expenses += Math.abs(item.total)
        }

        return acc
      },
      {} as Record<string, { year: number; month: number; income: number; expenses: number }>,
    )

    // Convert to array and sort by date
    Object.values(groupedData)
      .sort((a, b) => {
        if (a.year !== b.year) return a.year - b.year
        return a.month - b.month
      })
      .forEach((item) => {
        formattedData.push({
          name: months[item.month - 1],
          income: item.income,
          expenses: item.expenses,
          savings: item.income - item.expenses,
        })
      })

    return formattedData
  }

  // Format category data for pie chart
  const formatCategoryData = () => {
    if (!stats?.expensesByCategory) return []

    return stats.expensesByCategory.map((category) => ({
      name: category._id,
      value: Math.abs(category.total),
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-md">
        <p className="text-red-800 dark:text-red-200">{error}</p>
      </div>
    )
  }

  const monthlyData = formatMonthlyData()
  const categoryData = formatCategoryData()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Balance</h3>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            ${((stats?.income || 0) - Math.abs(stats?.expenses || 0)).toFixed(2)}
          </p>
        </div>
        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Income</h3>
          <p className="text-3xl font-bold text-green-600">${(stats?.income || 0).toFixed(2)}</p>
        </div>
        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Expenses</h3>
          <p className="text-3xl font-bold text-red-600">${Math.abs(stats?.expenses || 0).toFixed(2)}</p>
        </div>
        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Savings Rate</h3>
          <p className="text-3xl font-bold text-secondary-600 dark:text-secondary-400">
            {stats?.income ? Math.round(((stats.income - Math.abs(stats.expenses)) / stats.income) * 100) : 0}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Income vs Expenses</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#0ea5e9" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Savings Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#8b5cf6" activeDot={{ r: 8 }} name="Savings" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4">
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
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial Insights</h3>
          <div className="space-y-4">
            {stats?.income && stats.expenses && (
              <>
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-green-200">Savings Analysis</h4>
                  <p className="text-green-700 dark:text-green-300">
                    {stats.income > Math.abs(stats.expenses)
                      ? `You're saving ${Math.round(
                          ((stats.income - Math.abs(stats.expenses)) / stats.income) * 100,
                        )}% of your income. Great job!`
                      : "Your expenses exceed your income. Consider reviewing your budget to find areas to cut back."}
                  </p>
                </div>

                {stats.expensesByCategory.length > 0 && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Top Expense Category</h4>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      Your highest spending category is {stats.expensesByCategory[0]._id} at $
                      {Math.abs(stats.expensesByCategory[0].total).toFixed(2)}, which is{" "}
                      {Math.round((Math.abs(stats.expensesByCategory[0].total) / Math.abs(stats.expenses)) * 100)}% of
                      your total expenses.
                    </p>
                  </div>
                )}

                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">Recommendation</h4>
                  <p className="text-blue-700 dark:text-blue-300">
                    {stats.income > Math.abs(stats.expenses) * 1.2
                      ? "You have a healthy savings rate. Consider investing some of your savings for long-term growth."
                      : "Try to increase your savings rate to at least 20% of your income for better financial security."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats

