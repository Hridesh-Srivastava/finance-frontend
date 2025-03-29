"use client"

import type React from "react"

import { useState } from "react"

const Settings = () => {
  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    currency: "USD",
    theme: "system",
    notifications: true,
    weeklyReport: true,
    monthlyReport: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to the backend
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  className="input mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="input mt-1"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferences</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="input mt-1"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
                <select id="theme" name="theme" value={settings.theme} onChange={handleChange} className="input mt-1">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Enable notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weeklyReport"
                  name="weeklyReport"
                  checked={settings.weeklyReport}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="weeklyReport" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Receive weekly spending report
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="monthlyReport"
                  name="monthlyReport"
                  checked={settings.monthlyReport}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="monthlyReport" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Receive monthly financial summary
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save Settings
            </button>
          </div>
        </form>
      </div>

      <div className="card bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
        <h2 className="text-lg font-medium text-red-800 dark:text-red-200 mb-4">Danger Zone</h2>
        <p className="text-red-700 dark:text-red-300 mb-4">
          The following actions are destructive and cannot be undone. Please proceed with caution.
        </p>
        <div className="flex space-x-4">
          <button className="btn bg-red-600 text-white hover:bg-red-700">Delete All Transactions</button>
          <button className="btn bg-red-600 text-white hover:bg-red-700">Delete Account</button>
        </div>
      </div>
    </div>
  )
}

export default Settings

