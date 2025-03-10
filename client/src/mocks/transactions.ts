import { Transaction } from '../types';

export const transactions: Transaction[] = [
  // Transactions for Trip 2 (completed, SHUTTLE)
  {
    id: '1',
    tripId: '2',
    driverId: '2', // Jane Driver
    type: 'SHUTTLE',
    amount: 5000, // Lower bonus for SHUTTLE
    date: '2025-02-25T12:00:00.000Z',
    status: 'paid',
    createdAt: '2025-02-25T12:00:00.000Z',
    updatedAt: '2025-02-25T12:00:00.000Z',
  },
  
  // Transactions for Trip 3 (completed, LONG_DISTANCE)
  {
    id: '2',
    tripId: '3',
    driverId: '1', // John Driver
    type: 'LONG_DISTANCE',
    amount: 20000, // Higher bonus for long distance
    date: '2025-02-16T21:00:00.000Z',
    status: 'paid',
    createdAt: '2025-02-16T21:00:00.000Z',
    updatedAt: '2025-02-16T21:00:00.000Z',
  },
  
  // Transactions for Trip 1 (in_progress, LONG_DISTANCE)
  {
    id: '3',
    tripId: '1',
    driverId: '1', // John Driver
    type: 'LONG_DISTANCE',
    amount: 20000, // Higher bonus for long distance
    date: '2025-03-01T16:00:00.000Z', // Estimated completion time
    status: 'pending',
    createdAt: '2025-02-28T00:00:00.000Z',
    updatedAt: '2025-02-28T00:00:00.000Z',
  },
  
  // Transactions for Trip 4 (planned, SHUTTLE)
  {
    id: '4',
    tripId: '4',
    driverId: '2', // Jane Driver
    type: 'SHUTTLE',
    amount: 5000, // Lower bonus for SHUTTLE
    date: '2025-03-05T13:00:00.000Z', // Estimated completion time
    status: 'pending',
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
  },
];
