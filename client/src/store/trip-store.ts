import { create } from 'zustand';
import { trips as mockTrips } from '../mocks';
import { Trip, TripStatus, TripType } from '../types';

interface TripState {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchTrips: () => Promise<void>;
  fetchDriverTrips: (driverId: string) => Promise<void>;
  fetchVehicleTrips: (vehicleId: string) => Promise<void>;
  getTripById: (id: string) => Trip | undefined;
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTrip: (id: string, data: Partial<Trip>) => Promise<void>;
  updateTripStatus: (id: string, status: TripStatus) => Promise<void>;
  completeTrip: (id: string, finalMileage: number, actualArrivalDate: string) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  getActiveTrips: () => Trip[];
  getCompletedTrips: () => Trip[];
  getPlannedTrips: () => Trip[];
  getTripsByType: (type: TripType) => Trip[];
}

export const useTripStore = create<TripState>((set, get) => ({
  trips: [],
  isLoading: false,
  error: null,
  
  fetchTrips: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch trips
      set({ trips: mockTrips, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch trips', isLoading: false });
    }
  },
  
  fetchDriverTrips: async (driverId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch trips for a specific driver
      const driverTrips = mockTrips.filter((trip) => trip.driverId === driverId);
      
      set({ trips: driverTrips, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch driver trips', isLoading: false });
    }
  },
  
  fetchVehicleTrips: async (vehicleId: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to fetch trips for a specific vehicle
      const vehicleTrips = mockTrips.filter((trip) => trip.vehicleId === vehicleId);
      
      set({ trips: vehicleTrips, isLoading: false });
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to fetch vehicle trips', isLoading: false });
    }
  },
  
  getTripById: (id: string) => {
    return get().trips.find((trip) => trip.id === id);
  },
  
  addTrip: async (tripData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to add a trip
      const newTrip: Trip = {
        id: `${get().trips.length + 1}`,
        ...tripData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set((state) => ({
        trips: [...state.trips, newTrip],
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to add trip', isLoading: false });
    }
  },
  
  updateTrip: async (id, data) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a trip
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id
            ? { ...trip, ...data, updatedAt: new Date().toISOString() }
            : trip
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update trip', isLoading: false });
    }
  },
  
  updateTripStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to update a trip's status
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id
            ? { ...trip, status, updatedAt: new Date().toISOString() }
            : trip
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to update trip status', isLoading: false });
    }
  },
  
  completeTrip: async (id, finalMileage, actualArrivalDate) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to complete a trip
      set((state) => ({
        trips: state.trips.map((trip) =>
          trip.id === id
            ? {
                ...trip,
                status: 'completed',
                finalMileage,
                actualArrivalDate,
                updatedAt: new Date().toISOString(),
              }
            : trip
        ),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to complete trip', isLoading: false });
    }
  },
  
  deleteTrip: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, this would be an API call to delete a trip
      set((state) => ({
        trips: state.trips.filter((trip) => trip.id !== id),
        isLoading: false,
      }));
    } catch (error: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      set({ error: 'Failed to delete trip', isLoading: false });
    }
  },
  
  getActiveTrips: () => {
    return get().trips.filter((trip) => trip.status === 'in_progress');
  },
  
  getCompletedTrips: () => {
    return get().trips.filter((trip) => trip.status === 'completed');
  },
  
  getPlannedTrips: () => {
    return get().trips.filter((trip) => trip.status === 'planned');
  },
  
  getTripsByType: (type) => {
    return get().trips.filter((trip) => trip.type === type);
  },
}));
