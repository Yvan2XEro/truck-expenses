import { create } from 'zustand';
import { transactions as mockTransactions } from '../mocks';
import { Transaction, TripType } from '../types';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTransactions: () => Promise<void>;
  fetchDriverTransactions: (driverId: string) => Promise<void>;
  fetchTripTransaction: (tripId: string) => Promise<void>;
  getTransactionById: (id: string) => Transaction | undefined;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getPendingTransactions: () => Transaction[];
  getPaidTransactions: () => Transaction[];
  getTransactionsByType: (type: TripType) => Transaction[];
  getTotalTransactionsByDriver: (driverId: string) => number;
  getTotalPendingAmount: () => number;
  getTotalPaidAmount: () => number;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,
  error: null,
  
  fetchTransactions: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch transactions
      set({ transactions: mockTransactions, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch transactions', isLoading: false });
    }
  },
  
  fetchDriverTransactions: async (driverId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch transactions for a specific driver
      const driverTransactions = mockTransactions.filter(
        (transaction) => transaction.driverId === driverId
      );
      
      set({ transactions: driverTransactions, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch driver transactions', isLoading: false });
    }
  },
  
  fetchTripTransaction: async (tripId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch transaction for a specific trip
      const tripTransaction = mockTransactions.filter(
        (transaction) => transaction.tripId === tripId
      );
      
      set({ transactions: tripTransaction, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch trip transaction', isLoading: false });
    }
  },
  
  getTransactionById: (id: string) => {
    return get().transactions.find((transaction) => transaction.id === id);
  },
  
  addTransaction: async (transactionData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to add a transaction
      const newTransaction: Transaction = {
        id: `${get().transactions.length + 1}`,
        ...transactionData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        transactions: [...state.transactions, newTransaction],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add transaction', isLoading: false });
    }
  },
  
  updateTransaction: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a transaction
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, ...data, updatedAt: new Date().toISOString() }
            : transaction
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update transaction', isLoading: false });
    }
  },
  
  markAsPaid: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to mark a transaction as paid
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id
            ? {
                ...transaction,
                status: 'paid',
                updatedAt: new Date().toISOString(),
              }
            : transaction
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to mark transaction as paid', isLoading: false });
    }
  },
  
  deleteTransaction: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete a transaction
      set((state) => ({
        transactions: state.transactions.filter((transaction) => transaction.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete transaction', isLoading: false });
    }
  },
  
  getPendingTransactions: () => {
    return get().transactions.filter((transaction) => transaction.status === 'pending');
  },
  
  getPaidTransactions: () => {
    return get().transactions.filter((transaction) => transaction.status === 'paid');
  },
  
  getTransactionsByType: (type) => {
    return get().transactions.filter((transaction) => transaction.type === type);
  },
  
  getTotalTransactionsByDriver: (driverId) => {
    return get().transactions
      .filter((transaction) => transaction.driverId === driverId)
      .reduce((total, transaction) => total + transaction.amount, 0);
  },
  
  getTotalPendingAmount: () => {
    return get().transactions
      .filter((transaction) => transaction.status === 'pending')
      .reduce((total, transaction) => total + transaction.amount, 0);
  },
  
  getTotalPaidAmount: () => {
    return get().transactions
      .filter((transaction) => transaction.status === 'paid')
      .reduce((total, transaction) => total + transaction.amount, 0);
  },
}));
