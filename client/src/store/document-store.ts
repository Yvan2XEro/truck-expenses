import { create } from 'zustand';
import { documents as mockDocuments } from '../mocks';
import { Document } from '../types';

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDocuments: () => Promise<void>;
  fetchVehicleDocuments: (vehicleId: string) => Promise<void>;
  getDocumentById: (id: string) => Document | undefined;
  addDocument: (document: Omit<Document, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateDocument: (id: string, data: Partial<Document>) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
  getExpiringDocuments: (daysThreshold: number) => Document[];
  getExpiredDocuments: () => Document[];
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,
  
  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch documents
      set({ documents: mockDocuments, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch documents', isLoading: false });
    }
  },
  
  fetchVehicleDocuments: async (vehicleId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch documents for a specific vehicle
      const vehicleDocuments = mockDocuments.filter(
        (doc) => doc.vehicleId === vehicleId
      );
      
      set({ documents: vehicleDocuments, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch vehicle documents', isLoading: false });
    }
  },
  
  getDocumentById: (id: string) => {
    return get().documents.find((document) => document.id === id);
  },
  
  addDocument: async (documentData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Calculate document status based on expiry date
      const expiryDate = new Date(documentData.expiryDate);
      const now = new Date();
      const daysUntilExpiry = Math.floor(
        (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      let status: 'valid' | 'expired' | 'expiring_soon';
      if (daysUntilExpiry < 0) {
        status = 'expired';
      } else if (daysUntilExpiry < 30) {
        status = 'expiring_soon';
      } else {
        status = 'valid';
      }
      
      // In a real app, this would be an API call to add a document
      const newDocument: Document = {
        id: `${get().documents.length + 1}`,
        ...documentData,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        documents: [...state.documents, newDocument],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add document', isLoading: false });
    }
  },
  
  updateDocument: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a document
      set((state) => ({
        documents: state.documents.map((document) =>
          document.id === id
            ? { ...document, ...data, updatedAt: new Date().toISOString() }
            : document
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update document', isLoading: false });
    }
  },
  
  deleteDocument: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete a document
      set((state) => ({
        documents: state.documents.filter((document) => document.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete document', isLoading: false });
    }
  },
  
  getExpiringDocuments: (daysThreshold) => {
    const now = new Date();
    const thresholdDate = new Date(now);
    thresholdDate.setDate(now.getDate() + daysThreshold);
    
    return get().documents.filter((document) => {
      const expiryDate = new Date(document.expiryDate);
      return (
        expiryDate > now &&
        expiryDate <= thresholdDate &&
        document.status === 'expiring_soon'
      );
    });
  },
  
  getExpiredDocuments: () => {
    const now = new Date();
    
    return get().documents.filter((document) => {
      const expiryDate = new Date(document.expiryDate);
      return expiryDate < now && document.status === 'expired';
    });
  },
}));
