import { create } from 'zustand';
import { vehicles as mockVehicles } from '../mocks';
import { Vehicle, VehicleStatus } from '../types';

interface VehicleState {
  vehicles: Vehicle[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchVehicles: () => Promise<void>;
  getVehicleById: (id: string) => Vehicle | undefined;
  addVehicle: (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateVehicle: (id: string, data: Partial<Vehicle>) => Promise<void>;
  updateVehicleStatus: (id: string, status: VehicleStatus) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [],
  isLoading: false,
  error: null,
  
  fetchVehicles: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch vehicles
      set({ vehicles: mockVehicles, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch vehicles', isLoading: false });
    }
  },
  
  getVehicleById: (id: string) => {
    return get().vehicles.find((vehicle) => vehicle.id === id);
  },
  
  addVehicle: async (vehicleData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to add a vehicle
      const newVehicle: Vehicle = {
        id: `${get().vehicles.length + 1}`,
        ...vehicleData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        vehicles: [...state.vehicles, newVehicle],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add vehicle', isLoading: false });
    }
  },
  
  updateVehicle: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a vehicle
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === id
            ? { ...vehicle, ...data, updatedAt: new Date().toISOString() }
            : vehicle
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update vehicle', isLoading: false });
    }
  },
  
  updateVehicleStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a vehicle's status
      set((state) => ({
        vehicles: state.vehicles.map((vehicle) =>
          vehicle.id === id
            ? { ...vehicle, status, updatedAt: new Date().toISOString() }
            : vehicle
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update vehicle status', isLoading: false });
    }
  },
  
  deleteVehicle: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete a vehicle
      set((state) => ({
        vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete vehicle', isLoading: false });
    }
  },
}));
