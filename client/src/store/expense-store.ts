import { create } from 'zustand';
import { expenses as mockExpenses } from '../mocks';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchExpenses: () => Promise<void>;
  fetchTripExpenses: (tripId: string) => Promise<void>;
  getExpenseById: (id: string) => Expense | undefined;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateExpense: (id: string, data: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  getExpensesByCategory: (category: ExpenseCategory) => Expense[];
  getTotalExpensesByTrip: (tripId: string) => number;
  getTotalExpensesByCategory: (category: ExpenseCategory) => number;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  isLoading: false,
  error: null,
  
  fetchExpenses: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch expenses
      set({ expenses: mockExpenses, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch expenses', isLoading: false });
    }
  },
  
  fetchTripExpenses: async (tripId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch expenses for a specific trip
      const tripExpenses = mockExpenses.filter((expense) => expense.tripId === tripId);
      
      set({ expenses: tripExpenses, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch trip expenses', isLoading: false });
    }
  },
  
  getExpenseById: (id: string) => {
    return get().expenses.find((expense) => expense.id === id);
  },
  
  addExpense: async (expenseData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to add an expense
      const newExpense: Expense = {
        id: `${get().expenses.length + 1}`,
        ...expenseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        expenses: [...state.expenses, newExpense],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add expense', isLoading: false });
    }
  },
  
  updateExpense: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update an expense
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense.id === id
            ? { ...expense, ...data, updatedAt: new Date().toISOString() }
            : expense
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update expense', isLoading: false });
    }
  },
  
  deleteExpense: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete an expense
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete expense', isLoading: false });
    }
  },
  
  getExpensesByCategory: (category) => {
    return get().expenses.filter((expense) => expense.category === category);
  },
  
  getTotalExpensesByTrip: (tripId) => {
    return get().expenses
      .filter((expense) => expense.tripId === tripId)
      .reduce((total, expense) => total + expense.amount, 0);
  },
  
  getTotalExpensesByCategory: (category) => {
    return get().expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  },
}));
