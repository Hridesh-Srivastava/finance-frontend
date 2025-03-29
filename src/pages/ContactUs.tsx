"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import Logo from "../components/Logo"
import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  Bars3Icon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline"
import { healthApi } from "../services/api"

const ContactUs = () => {
  const { theme, setTheme, isDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking")

  // Check server status on component mount
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await healthApi.checkServer()
        setServerStatus("online")
      } catch (err) {
        console.error("Server health check failed:", err)
        setServerStatus("offline")
      }
    }

    checkServerStatus()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")
    setErrorMessage("")

    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("error")
      setErrorMessage("Please fill in all fields")
      return
    }

    // Check server status before attempting submission
    if (serverStatus === "offline") {
      setFormStatus("error")
      setErrorMessage("Server is currently unavailable. Please try again later.")
      return
    }

    try {
      // Log submission attempt for debugging
      console.log("Attempting to submit contact form:", formData)

      // Use direct fetch instead of the API service for debugging
      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Server responded with status: ${response.status}`)
      }

      setFormStatus("success")
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      setFormStatus("error")

      if (error.message.includes("Network") || error.message.includes("Failed to fetch")) {
        setErrorMessage("Unable to connect to the server. Please check your internet connection and try again.")
      } else {
        setErrorMessage(error.message || "Failed to submit form. Please try again later.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Logo />
            </div>

            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="hidden md:flex space-x-10">
              <Link
                to="/"
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                About Us
              </Link>
              <Link to="/contact" className="text-base font-medium text-gray-900 dark:text-white">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
              <button
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
                }}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MoonIcon className="w-5 h-5" />
                ) : theme === "dark" ? (
                  <ComputerDesktopIcon className="w-5 h-5" />
                ) : isDarkMode ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>

              <Link
                to="/login"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 divide-y-2 divide-gray-50 dark:divide-gray-700">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <Logo />
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      className="bg-white dark:bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <Link
                      to="/"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">Home</span>
                    </Link>
                    <Link
                      to="/about"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">About Us</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="ml-3 text-base font-medium text-gray-900 dark:text-white">Contact</span>
                    </Link>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => {
                      setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
                      setMobileMenuOpen(false)
                    }}
                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                    aria-label="Toggle theme"
                  >
                    {theme === "light" ? (
                      <MoonIcon className="w-5 h-5" />
                    ) : theme === "dark" ? (
                      <ComputerDesktopIcon className="w-5 h-5" />
                    ) : isDarkMode ? (
                      <SunIcon className="w-5 h-5" />
                    ) : (
                      <MoonIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div>
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contact section */}
      <div className="relative bg-white dark:bg-gray-900 py-16 sm:py-24">
        <div className="lg:absolute lg:inset-0">
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3120.8219681239984!2d78.16493377501617!3d30.190831911621057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390924dc8a731ca5%3A0x862f6f008f38d092!2sSwami%20Rama%20Himalayan%20University%20(SRHU)!5e1!3m2!1sen!2sin!4v1742756216226!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="SRHU Map"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="relative py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:py-32 lg:grid lg:grid-cols-2">
          <div className="lg:pr-8">
            <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
                Get in touch
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 sm:mt-3">
                We'd love to hear from you! Send us a message using the form, or reach out to us directly using the
                contact information below.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>support@Blink-Bank.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="ml-3 text-base text-gray-500 dark:text-gray-400">
                    <p>
                      123 Finance Street, Suite 100
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>

              {serverStatus === "offline" && (
                <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Server is currently offline. Form submission may not work until the server is back online.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                {formStatus === "error" && (
                  <div className="sm:col-span-2 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-red-800 dark:text-red-200">
                      {errorMessage || "There was an error sending your message. Please try again later."}
                    </p>
                  </div>
                )}

                {formStatus === "success" && (
                  <div className="sm:col-span-2 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-green-800 dark:text-green-200">
                      Thank you for your message! We'll get back to you as soon as possible.
                    </p>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <div className="mt-1">
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                    >
                      <option value="">Please select</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-white"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting" || serverStatus === "offline"}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <div className="px-5 py-2">
              <Link
                to="/"
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/about"
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/contact"
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/terms"
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Terms
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/privacy"
                className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Privacy
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default ContactUs

