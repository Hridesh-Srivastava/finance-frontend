"use client"

import { useState, useEffect } from "react"
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline"
import Logo from "./Logo"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { theme, setTheme, isDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const navigation = [
    { name: "Dashboard", href: "/app", icon: HomeIcon },
    { name: "Transactions", href: "/app/transactions", icon: CreditCardIcon },
    { name: "Analytics", href: "/app/analytics", icon: ChartBarIcon },
    { name: "Settings", href: "/app/settings", icon: Cog6ToothIcon },
  ]

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 shadow-xl transition-transform transform">
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <Logo className="h-8 w-auto" />
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${
                      isActive
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center h-16 px-4 border-b dark:border-gray-700">
            <Logo className="h-8 w-auto" />
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${
                      isActive
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-100"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 shadow-sm">
          <button
            className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <UserCircleIcon className="w-6 h-6" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border dark:border-gray-700">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
                }}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="w-6 h-6" />
                ) : theme === "dark" ? (
                  <ComputerDesktopIcon className="w-6 h-6" />
                ) : isDarkMode ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6" />
                )}
              </button>
            </div>

            <div className="relative">
              <button
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Notifications"
              >
                <BellIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

        <footer className="py-4 px-6 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center space-x-4">
              <Logo className="h-6 w-auto" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Finance Tracker. All rights reserved.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <NavLink
                to="/privacy"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Privacy Policy
              </NavLink>
              <NavLink
                to="/terms"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/contact"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Contact Us
              </NavLink>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout

