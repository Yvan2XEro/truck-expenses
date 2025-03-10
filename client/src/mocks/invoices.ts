import { Invoice } from '../types';

export const invoices: Invoice[] = [
  // Invoice for Trip 2 (completed)
  {
    id: '1',
    tripId: '2',
    clientName: 'Cameroon Shipping Ltd',
    providerName: 'Transport Express SARL',
    date: '2025-02-25T14:00:00.000Z',
    vehicleLetterNumber: 'LV-2025-002',
    volume: 8.5, // m³
    amount: 75000,
    status: 'paid',
    createdAt: '2025-02-25T14:00:00.000Z',
    updatedAt: '2025-02-28T10:00:00.000Z',
  },
  
  // Invoice for Trip 3 (completed)
  {
    id: '2',
    tripId: '3',
    clientName: 'Northern Distributors Inc.',
    providerName: 'Transport Express SARL',
    date: '2025-02-17T09:00:00.000Z',
    vehicleLetterNumber: 'LV-2025-003',
    volume: 22.3, // m³
    amount: 450000,
    status: 'sent',
    createdAt: '2025-02-17T09:00:00.000Z',
    updatedAt: '2025-02-17T09:00:00.000Z',
  },
  
  // Draft invoice for Trip 1 (in_progress)
  {
    id: '3',
    tripId: '1',
    clientName: 'Central Logistics Co.',
    providerName: 'Transport Express SARL',
    date: '2025-03-01T16:00:00.000Z', // Estimated completion time
    vehicleLetterNumber: 'LV-2025-001',
    volume: 15.7, // m³
    amount: 180000,
    status: 'draft',
    createdAt: '2025-02-28T00:00:00.000Z',
    updatedAt: '2025-02-28T00:00:00.000Z',
  },
  
  // Draft invoice for Trip 4 (planned)
  {
    id: '4',
    tripId: '4',
    clientName: 'Coastal Enterprises',
    providerName: 'Transport Express SARL',
    date: '2025-03-05T13:00:00.000Z', // Estimated completion time
    vehicleLetterNumber: 'LV-2025-004',
    volume: 6.2, // m³
    amount: 65000,
    status: 'draft',
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
  },
];
