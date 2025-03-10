import { Trip } from '../types';

export const trips: Trip[] = [
  {
    id: '1',
    vehicleId: '2', // Volvo FH16 (on_trip)
    driverId: '1', // John Driver
    type: 'LONG_DISTANCE',
    status: 'in_progress',
    departureLocation: 'Douala',
    destinationLocation: 'Yaoundé',
    intermediateStops: ['Edéa', 'Pouma'],
    departureDate: '2025-03-01T08:00:00.000Z',
    estimatedArrivalDate: '2025-03-01T16:00:00.000Z',
    initialMileage: 75000,
    createdAt: '2025-02-28T00:00:00.000Z',
    updatedAt: '2025-03-01T08:00:00.000Z',
  },
  {
    id: '2',
    vehicleId: '1', // Mercedes Actros (available)
    driverId: '2', // Jane Driver
    type: 'SHUTTLE',
    status: 'completed',
    departureLocation: 'Douala',
    destinationLocation: 'Limbé',
    departureDate: '2025-02-25T09:00:00.000Z',
    estimatedArrivalDate: '2025-02-25T11:30:00.000Z',
    actualArrivalDate: '2025-02-25T11:45:00.000Z',
    initialMileage: 49800,
    finalMileage: 50000,
    createdAt: '2025-02-24T00:00:00.000Z',
    updatedAt: '2025-02-25T12:00:00.000Z',
  },
  {
    id: '3',
    vehicleId: '4', // MAN TGX (available)
    driverId: '1', // John Driver
    type: 'LONG_DISTANCE',
    status: 'completed',
    departureLocation: 'Douala',
    destinationLocation: 'Garoua',
    intermediateStops: ['Yaoundé', 'Ngaoundéré'],
    departureDate: '2025-02-15T06:00:00.000Z',
    estimatedArrivalDate: '2025-02-16T18:00:00.000Z',
    actualArrivalDate: '2025-02-16T20:30:00.000Z',
    initialMileage: 34500,
    finalMileage: 35000,
    createdAt: '2025-02-14T00:00:00.000Z',
    updatedAt: '2025-02-16T21:00:00.000Z',
  },
  {
    id: '4',
    vehicleId: '1', // Mercedes Actros (available)
    driverId: '2', // Jane Driver
    type: 'SHUTTLE',
    status: 'planned',
    departureLocation: 'Douala',
    destinationLocation: 'Kribi',
    departureDate: '2025-03-05T10:00:00.000Z',
    estimatedArrivalDate: '2025-03-05T13:00:00.000Z',
    initialMileage: 50000,
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
  },
];
