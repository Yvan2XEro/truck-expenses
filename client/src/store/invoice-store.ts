import { create } from 'zustand';
import { invoices as mockInvoices } from '../mocks';
import { Invoice } from '../types';

interface InvoiceState {
  invoices: Invoice[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchInvoices: () => Promise<void>;
  fetchTripInvoice: (tripId: string) => Promise<void>;
  getInvoiceById: (id: string) => Invoice | undefined;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateInvoice: (id: string, data: Partial<Invoice>) => Promise<void>;
  markAsSent: (id: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  getDraftInvoices: () => Invoice[];
  getSentInvoices: () => Invoice[];
  getPaidInvoices: () => Invoice[];
  getTotalInvoiceAmount: () => number;
  getTotalPaidAmount: () => number;
  getTotalUnpaidAmount: () => number;
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoices: [],
  isLoading: false,
  error: null,
  
  fetchInvoices: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch invoices
      set({ invoices: mockInvoices, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch invoices', isLoading: false });
    }
  },
  
  fetchTripInvoice: async (tripId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch invoice for a specific trip
      const tripInvoice = mockInvoices.filter((invoice) => invoice.tripId === tripId);
      
      set({ invoices: tripInvoice, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch trip invoice', isLoading: false });
    }
  },
  
  getInvoiceById: (id: string) => {
    return get().invoices.find((invoice) => invoice.id === id);
  },
  
  addInvoice: async (invoiceData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to add an invoice
      const newInvoice: Invoice = {
        id: `${get().invoices.length + 1}`,
        ...invoiceData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        invoices: [...state.invoices, newInvoice],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add invoice', isLoading: false });
    }
  },
  
  updateInvoice: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update an invoice
      set((state) => ({
        invoices: state.invoices.map((invoice) =>
          invoice.id === id
            ? { ...invoice, ...data, updatedAt: new Date().toISOString() }
            : invoice
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update invoice', isLoading: false });
    }
  },
  
  markAsSent: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to mark an invoice as sent
      set((state) => ({
        invoices: state.invoices.map((invoice) =>
          invoice.id === id
            ? {
                ...invoice,
                status: 'sent',
                updatedAt: new Date().toISOString(),
              }
            : invoice
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to mark invoice as sent', isLoading: false });
    }
  },
  
  markAsPaid: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to mark an invoice as paid
      set((state) => ({
        invoices: state.invoices.map((invoice) =>
          invoice.id === id
            ? {
                ...invoice,
                status: 'paid',
                updatedAt: new Date().toISOString(),
              }
            : invoice
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to mark invoice as paid', isLoading: false });
    }
  },
  
  deleteInvoice: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete an invoice
      set((state) => ({
        invoices: state.invoices.filter((invoice) => invoice.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete invoice', isLoading: false });
    }
  },
  
  getDraftInvoices: () => {
    return get().invoices.filter((invoice) => invoice.status === 'draft');
  },
  
  getSentInvoices: () => {
    return get().invoices.filter((invoice) => invoice.status === 'sent');
  },
  
  getPaidInvoices: () => {
    return get().invoices.filter((invoice) => invoice.status === 'paid');
  },
  
  getTotalInvoiceAmount: () => {
    return get().invoices.reduce((total, invoice) => total + invoice.amount, 0);
  },
  
  getTotalPaidAmount: () => {
    return get().invoices
      .filter((invoice) => invoice.status === 'paid')
      .reduce((total, invoice) => total + invoice.amount, 0);
  },
  
  getTotalUnpaidAmount: () => {
    return get().invoices
      .filter((invoice) => invoice.status !== 'paid')
      .reduce((total, invoice) => total + invoice.amount, 0);
  },
}));
