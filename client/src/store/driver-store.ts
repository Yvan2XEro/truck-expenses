import { create } from 'zustand';
import { drivers as mockDrivers } from '../mocks';
import { Driver } from '../types';

interface DriverState {
  drivers: Driver[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchDrivers: () => Promise<void>;
  getDriverById: (id: string) => Driver | undefined;
  addDriver: (driver: Omit<Driver, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateDriver: (id: string, data: Partial<Driver>) => Promise<void>;
  deleteDriver: (id: string) => Promise<void>;
}

export const useDriverStore = create<DriverState>((set, get) => ({
  drivers: [],
  isLoading: false,
  error: null,
  
  fetchDrivers: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch drivers
      set({ drivers: mockDrivers, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch drivers', isLoading: false });
    }
  },
  
  getDriverById: (id: string) => {
    return get().drivers.find((driver) => driver.id === id);
  },
  
  addDriver: async (driverData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to add a driver
      const newDriver: Driver = {
        id: `${get().drivers.length + 1}`,
        ...driverData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        drivers: [...state.drivers, newDriver],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add driver', isLoading: false });
    }
  },
  
  updateDriver: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a driver
      set((state) => ({
        drivers: state.drivers.map((driver) =>
          driver.id === id
            ? { ...driver, ...data, updatedAt: new Date().toISOString() }
            : driver
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update driver', isLoading: false });
    }
  },
  
  deleteDriver: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete a driver
      set((state) => ({
        drivers: state.drivers.filter((driver) => driver.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete driver', isLoading: false });
    }
  },
}));
