"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { useTransactions } from "../context/TransactionContext"
import { ArrowUpIcon, ArrowDownIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"

const Transactions = () => {
  const { transactions, loading, error, fetchTransactions, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions()
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null)
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    date: format(new Date(), "yyyy-MM-dd"),
    category: "Food",
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const categories = ["All", "Food", "Transport", "Entertainment", "Utilities", "Shopping", "Income", "Other"]

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const filteredTransactions = transactions
    .filter((t) => filter === "All" || t.category === filter)
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors: { [key: string]: string } = {}
    if (!newTransaction.name.trim()) errors.name = "Description is required"
    if (!newTransaction.amount) errors.amount = "Amount is required"
    if (isNaN(Number(newTransaction.amount))) errors.amount = "Amount must be a number"
    if (!newTransaction.category) errors.category = "Category is required"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      const amount = Number.parseFloat(newTransaction.amount)

      if (editingTransaction) {
        await updateTransaction(editingTransaction, {
          name: newTransaction.name,
          amount: newTransaction.category === "Income" ? Math.abs(amount) : -Math.abs(amount),
          date: newTransaction.date,
          category: newTransaction.category,
        })
        setEditingTransaction(null)
      } else {
        await addTransaction({
          name: newTransaction.name,
          amount: newTransaction.category === "Income" ? Math.abs(amount) : -Math.abs(amount),
          date: newTransaction.date,
          category: newTransaction.category,
        })
      }

      setNewTransaction({
        name: "",
        amount: "",
        date: format(new Date(), "yyyy-MM-dd"),
        category: "Food",
      })
      setFormErrors({})
      setShowAddForm(false)
    } catch (err) {
      console.error("Failed to save transaction:", err)
    }
  }

  const handleEdit = (transaction: any) => {
    setEditingTransaction(transaction._id)
    setNewTransaction({
      name: transaction.name,
      amount: String(Math.abs(transaction.amount)),
      date: format(new Date(transaction.date), "yyyy-MM-dd"),
      category: transaction.category,
    })
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id)
      } catch (err) {
        console.error("Failed to delete transaction:", err)
      }
    }
  }

  const handleCancelEdit = () => {
    setEditingTransaction(null)
    setNewTransaction({
      name: "",
      amount: "",
      date: format(new Date(), "yyyy-MM-dd"),
      category: "Food",
    })
    setFormErrors({})
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {showAddForm ? "Cancel" : "Add Transaction"}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
          </h2>
          <form onSubmit={handleAddTransaction} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <input
                type="text"
                id="name"
                value={newTransaction.name}
                onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
                className={`mt-1 input ${formErrors.name ? "border-red-500 dark:border-red-500" : ""}`}
              />
              {formErrors.name && <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className={`mt-1 input ${formErrors.amount ? "border-red-500 dark:border-red-500" : ""}`}
                placeholder="0.00"
              />
              {formErrors.amount && <p className="mt-1 text-sm text-red-600">{formErrors.amount}</p>}
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="mt-1 input"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category
              </label>
              <select
                id="category"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                className={`mt-1 input ${formErrors.category ? "border-red-500 dark:border-red-500" : ""}`}
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
              {formErrors.category && <p className="mt-1 text-sm text-red-600">{formErrors.category}</p>}
            </div>
            <div className="flex justify-end space-x-3">
              {editingTransaction && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {editingTransaction ? "Update" : "Add"} Transaction
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <XMarkIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading transactions</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input w-full"
          />
        </div>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input"
            aria-label="Filter by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Loading transactions...</p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={`flex items-center ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowUpIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(transaction)}
                        className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span className="sr-only">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Transactions

