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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const Analytics = () => {
  const [timeframe, setTimeframe] = useState("monthly")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No authentication token found")
        }

        // Fetch transaction stats
        const statsResponse = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/transactions/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch statistics")
        }

        const statsData = await statsResponse.json()
        setStats(statsData)

        // Fetch AI insights
        try {
          const insightsResponse = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/ai/insights`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          if (insightsResponse.ok) {
            const insightsData = await insightsResponse.json()
            setInsights(insightsData.insights || [])
          }
        } catch (insightError) {
          console.error("Error fetching insights:", insightError)
          // Fallback insights if AI service fails
          setInsights([
            "Your savings have increased by 15% compared to last month. Keep up the good work!",
            "Your entertainment expenses are 20% higher than your monthly average. Consider adjusting your budget.",
            "Based on your income and spending patterns, you could increase your monthly savings by $250 by reducing food expenses.",
          ])
        }

        setError(null)
      } catch (err: any) {
        console.error("Error fetching analytics data:", err)
        setError(err.message || "Failed to load analytics data")

        // Set mock data for demonstration
        setStats({
          income: 4000,
          expenses: -2400,
          expensesByCategory: [
            { _id: "Food", total: -400 },
            { _id: "Transport", total: -300 },
            { _id: "Entertainment", total: -300 },
            { _id: "Utilities", total: -200 },
            { _id: "Shopping", total: -278 },
          ],
          monthlyData: [
            { _id: { month: 1, year: 2025, category: true }, total: 4000 },
            { _id: { month: 1, year: 2025, category: false }, total: -2400 },
            { _id: { month: 2, year: 2025, category: true }, total: 3000 },
            { _id: { month: 2, year: 2025, category: false }, total: -1398 },
            { _id: { month: 3, year: 2025, category: true }, total: 2000 },
            { _id: { month: 3, year: 2025, category: false }, total: -1800 },
            { _id: { month: 4, year: 2025, category: true }, total: 2780 },
            { _id: { month: 4, year: 2025, category: false }, total: -1908 },
            { _id: { month: 5, year: 2025, category: true }, total: 1890 },
            { _id: { month: 5, year: 2025, category: false }, total: -1800 },
            { _id: { month: 6, year: 2025, category: true }, total: 2390 },
            { _id: { month: 6, year: 2025, category: false }, total: -1800 },
            { _id: { month: 7, year: 2025, category: true }, total: 3490 },
            { _id: { month: 7, year: 2025, category: false }, total: -2300 },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  // Format monthly data for charts
  const formatMonthlyData = () => {
    if (!stats?.monthlyData) return []

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const formattedData: { name: string; income: number; expenses: number; savings: number }[] = []

    // Group by month and year
    const groupedData = stats.monthlyData.reduce((acc: any, item: any) => {
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
    }, {})

    // Convert to array and sort by date
    Object.values(groupedData)
      .sort((a: any, b: any) => {
        if (a.year !== b.year) return a.year - b.year
        return a.month - b.month
      })
      .forEach((item: any) => {
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

    return stats.expensesByCategory.map((category: any) => ({
      name: category._id,
      value: Math.abs(category.total),
    }))
  }

  // Mock weekly data
  const weeklyData = [
    { day: "Mon", amount: 120 },
    { day: "Tue", amount: 85 },
    { day: "Wed", amount: 210 },
    { day: "Thu", amount: 145 },
    { day: "Fri", amount: 320 },
    { day: "Sat", amount: 180 },
    { day: "Sun", amount: 90 },
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <p className="ml-3 text-gray-700 dark:text-gray-300">Loading analytics...</p>
      </div>
    )
  }

  const monthlyData = formatMonthlyData()
  const categoryData = formatCategoryData()

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

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
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

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Savings Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
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

        <div className="card p-6">
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
                  {categoryData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Daily Spending (This Week)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#ef4444" activeDot={{ r: 8 }} name="Spending" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Financial Insights</h3>
        <div className="space-y-4">
          {insights.length > 0 ? (
            insights.map((insight, index) => {
              const colors = ["green", "yellow", "blue"]
              const colorIndex = index % colors.length
              const color = colors[colorIndex]

              return (
                <div
                  key={index}
                  className={`p-4 bg-${color}-50 dark:bg-${color}-900/30 rounded-lg border border-${color}-200 dark:border-${color}-800`}
                >
                  <h4 className={`font-medium text-${color}-800 dark:text-${color}-200`}>
                    {index === 0 ? "Positive Trend" : index === 1 ? "Spending Alert" : "Recommendation"}
                  </h4>
                  <p className={`text-${color}-700 dark:text-${color}-300`}>{insight}</p>
                </div>
              )
            })
          ) : (
            <>
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
                  Based on your income and spending patterns, you could increase your monthly savings by $250 by
                  reducing food expenses.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Analytics

