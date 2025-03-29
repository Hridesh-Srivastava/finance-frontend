"use client"

import type React from "react"

import { useState } from "react"
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Simulate form submission
    setTimeout(() => {
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
    }, 1000)
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
        <div className={`${mobileMenuOpen ? "fixed inset-0 z-40 overflow-y-auto" : "hidden"}`}>
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)}></div>

          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <Logo />
              <button
                type="button"
                className="rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Link
                  to="/"
                  className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 rounded-md"
                >
                  {theme === "light" ? (
                    <>
                      <MoonIcon className="w-5 h-5 mr-3" />
                      <span>Dark Mode</span>
                    </>
                  ) : theme === "dark" ? (
                    <>
                      <ComputerDesktopIcon className="w-5 h-5 mr-3" />
                      <span>System Theme</span>
                    </>
                  ) : isDarkMode ? (
                    <>
                      <SunIcon className="w-5 h-5 mr-3" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-5 h-5 mr-3" />
                      <span>Dark Mode</span>
                    </>
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
                    <p>support@fintrack.com</p>
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

              <form onSubmit={handleSubmit} className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
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
                      className="input"
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
                      className="input"
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
                      className="input"
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
                      className="input"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </div>

                {formStatus === "success" && (
                  <div className="sm:col-span-2 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-green-800 dark:text-green-200">
                      Thank you for your message! We'll get back to you as soon as possible.
                    </p>
                  </div>
                )}

                {formStatus === "error" && (
                  <div className="sm:col-span-2 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-red-800 dark:text-red-200">
                      There was an error sending your message. Please try again later.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
            Frequently asked questions
          </h2>
          <div className="mt-12">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">What is FinTrack?</dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  FinTrack is a personal finance management application that helps you track expenses, visualize
                  spending patterns, and get AI-powered insights to improve your financial health.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Is my financial data secure?
                </dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Yes, we use bank-level encryption and security measures to protect your data. We never sell your
                  personal information to third parties.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Do I need to connect my bank accounts?
                </dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  No, you can manually enter transactions if you prefer. Bank account connection is optional for added
                  convenience.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Is there a mobile app?</dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Yes, FinTrack is available on iOS and Android devices, allowing you to track your finances on the go.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  How much does FinTrack cost?
                </dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  FinTrack offers a free basic plan with core features. Premium plans with advanced features start at
                  $5.99/month.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900 dark:text-white">How do I get started?</dt>
                <dd className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Simply sign up for an account, set up your profile, and start tracking your finances. Our onboarding
                  process will guide you through the setup.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <Logo />
              <p className="text-gray-500 dark:text-gray-400 text-base">
                Making personal finance management simple, visual, and intelligent.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
                    Pages
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link
                        to="/"
                        className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-300 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <Link
                        to="/privacy"
                        className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Privacy
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terms"
                        className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        Terms
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-base text-gray-400 dark:text-gray-500 text-center">
              &copy; {new Date().getFullYear()} FinTrack, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactUs

