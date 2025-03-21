import { Expense } from '../types';

export const expenses: Expense[] = [
  // Expenses for Trip 1 (in_progress)
  {
    id: '1',
    tripId: '1',
    category: 'fuel',
    amount: 50000,
    description: 'Initial fuel for Douala-Yaoundé trip',
    date: '2025-03-01T07:30:00.000Z',
    receipt: '/receipts/fuel-trip1-1.jpg',
    createdAt: '2025-03-01T07:35:00.000Z',
    updatedAt: '2025-03-01T07:35:00.000Z',
  },
  {
    id: '2',
    tripId: '1',
    category: 'toll',
    amount: 2500,
    description: 'Edéa toll',
    date: '2025-03-01T10:15:00.000Z',
    receipt: '/receipts/toll-trip1-1.jpg',
    createdAt: '2025-03-01T10:20:00.000Z',
    updatedAt: '2025-03-01T10:20:00.000Z',
  },
  
  // Expenses for Trip 2 (completed)
  {
    id: '3',
    tripId: '2',
    category: 'fuel',
    amount: 25000,
    description: 'Fuel for Douala-Limbé trip',
    date: '2025-02-25T08:45:00.000Z',
    receipt: '/receipts/fuel-trip2-1.jpg',
    createdAt: '2025-02-25T08:50:00.000Z',
    updatedAt: '2025-02-25T08:50:00.000Z',
  },
  {
    id: '4',
    tripId: '2',
    category: 'other',
    amount: 5000,
    description: 'Driver lunch',
    date: '2025-02-25T12:30:00.000Z',
    createdAt: '2025-02-25T12:35:00.000Z',
    updatedAt: '2025-02-25T12:35:00.000Z',
  },
  
  // Expenses for Trip 3 (completed)
  {
    id: '5',
    tripId: '3',
    category: 'fuel',
    amount: 120000,
    description: 'Initial fuel for Douala-Garoua trip',
    date: '2025-02-15T05:30:00.000Z',
    receipt: '/receipts/fuel-trip3-1.jpg',
    createdAt: '2025-02-15T05:35:00.000Z',
    updatedAt: '2025-02-15T05:35:00.000Z',
  },
  {
    id: '6',
    tripId: '3',
    category: 'fuel',
    amount: 80000,
    description: 'Refuel in Yaoundé',
    date: '2025-02-15T12:00:00.000Z',
    receipt: '/receipts/fuel-trip3-2.jpg',
    createdAt: '2025-02-15T12:05:00.000Z',
    updatedAt: '2025-02-15T12:05:00.000Z',
  },
  {
    id: '7',
    tripId: '3',
    category: 'maintenance',
    amount: 15000,
    description: 'Tire pressure check and adjustment',
    date: '2025-02-15T16:30:00.000Z',
    createdAt: '2025-02-15T16:35:00.000Z',
    updatedAt: '2025-02-15T16:35:00.000Z',
  },
  {
    id: '8',
    tripId: '3',
    category: 'toll',
    amount: 5000,
    description: 'Various tolls',
    date: '2025-02-16T10:00:00.000Z',
    receipt: '/receipts/toll-trip3-1.jpg',
    createdAt: '2025-02-16T10:05:00.000Z',
    updatedAt: '2025-02-16T10:05:00.000Z',
  },
  {
    id: '9',
    tripId: '3',
    category: 'other',
    amount: 25000,
    description: 'Accommodation in Ngaoundéré',
    date: '2025-02-15T20:00:00.000Z',
    receipt: '/receipts/hotel-trip3-1.jpg',
    createdAt: '2025-02-15T20:05:00.000Z',
    updatedAt: '2025-02-15T20:05:00.000Z',
  },
  
  // Expenses for Trip 4 (planned)
  {
    id: '10',
    tripId: '4',
    category: 'fuel',
    amount: 30000,
    description: 'Estimated fuel for Douala-Kribi trip',
    date: '2025-03-05T00:00:00.000Z', // Planned date
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
  },
];
