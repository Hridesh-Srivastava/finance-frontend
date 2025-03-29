"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { transactionApi, type Transaction } from "../services/api"
import { useAuth } from "./AuthContext"

interface TransactionContextType {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  fetchTransactions: () => Promise<void>
  addTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>
  updateTransaction: (id: string, transaction: Partial<Transaction>) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
  clearError: () => void
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export const useTransactions = () => {
  const context = useContext(TransactionContext)
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider")
  }
  return context
}

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const { data } = await transactionApi.getAll()
      setTransactions(data)
      setError(null)
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch transactions"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      setLoading(true)
      const { data } = await transactionApi.create(transaction)
      setTransactions([data, ...transactions])
      setError(null)
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to add transaction"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const updateTransaction = async (id: string, transaction: Partial<Transaction>) => {
    try {
      setLoading(true)
      const { data } = await transactionApi.update(id, transaction)
      setTransactions(transactions.map((t) => (t._id === id ? data : t)))
      setError(null)
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update transaction"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      setLoading(true)
      await transactionApi.delete(id)
      setTransactions(transactions.filter((t) => t._id !== id))
      setError(null)
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete transaction"
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        clearError,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

