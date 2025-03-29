"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface LogoProps {
  className?: string
}

const Logo = ({ className = "h-8 w-auto" }: LogoProps) => {
  const { user } = useAuth()
  const homeLink = user ? "/app" : "/"

  return (
    <Link to={homeLink} className="flex items-center">
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 18.09V20H10.74V18.07C9.03 17.71 7.58 16.61 7.47 14.67H9.43C9.53 15.72 10.25 16.54 12.08 16.54C14.04 16.54 14.48 15.56 14.48 14.95C14.48 14.12 14.04 13.34 11.81 12.81C9.33 12.21 7.63 11.19 7.63 9.14C7.63 7.42 9.02 6.23 10.74 5.92V4H13.41V5.92C15.27 6.31 16.2 7.7 16.26 9.25H14.3C14.25 8.22 13.63 7.47 12.08 7.47C10.58 7.47 9.68 8.15 9.68 9.11C9.68 9.95 10.33 10.5 12.35 11.02C14.37 11.54 16.53 12.41 16.53 14.93C16.53 16.76 15.15 17.76 13.41 18.09Z"
          className="fill-primary-600 dark:fill-primary-400"
        />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FinTrack</span>
    </Link>
  )
}

export default Logo

