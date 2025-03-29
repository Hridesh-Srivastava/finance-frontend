"use client"

import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import Logo from "../components/Logo"
import { MoonIcon, SunIcon, ComputerDesktopIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const PrivacyPolicy = () => {
  const { theme, setTheme, isDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              <Link
                to="/contact"
                className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
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

      {/* Content */}
      <div className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase">
                Legal
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Privacy Policy
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 dark:text-gray-400 leading-8">Last updated: March 29, 2025</p>
          </div>
          <div className="mt-6 prose prose-indigo dark:prose-invert prose-lg text-gray-500 dark:text-gray-400 mx-auto">
            <h2>1. Introduction</h2>
            <p>
              Welcome to FinTrack ("we," "our," or "us"). We are committed to protecting your privacy and personal
              information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you use our financial tracking service.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you
              have read, understood, and agree to be bound by all the terms outlined in this policy.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect several types of information from and about users of our service, including:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address, and other contact details you provide when
                registering for our service.
              </li>
              <li>
                <strong>Financial Information:</strong> Transaction data, account balances, spending patterns, and other
                financial information you choose to track using our service.
              </li>
              <li>
                <strong>Usage Information:</strong> How you interact with our service, features you use, and time spent
                on the platform.
              </li>
              <li>
                <strong>Device Information:</strong> Information about your device, IP address, browser type, and
                operating system.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our service</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates or security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Generate personalized financial insights and recommendations</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our service</li>
              <li>Detect, prevent, and address technical issues</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>5. Data Sharing and Disclosure</h2>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li>With your consent</li>
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With business partners with your consent</li>
              <li>In connection with a business transaction such as a merger or acquisition</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectify inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to restrict or object to processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: privacy@fintrack.com
              <br />
              Address: 123 Finance Street, Suite 100, San Francisco, CA 94107
            </p>
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

export default PrivacyPolicy

