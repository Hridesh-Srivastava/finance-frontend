"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Logo from "../components/Logo"

const NotFound = () => {
  const { user } = useAuth()
  const homeLink = user ? "/app" : "/"

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <Logo className="h-12 w-auto mx-auto" />
        <h1 className="mt-6 text-9xl font-extrabold text-gray-900 dark:text-white">404</h1>
        <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page not found</p>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link
            to={homeLink}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound

