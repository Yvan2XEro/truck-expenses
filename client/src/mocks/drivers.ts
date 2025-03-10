import { Driver } from '../types';

export const drivers: Driver[] = [
  {
    id: '1',
    userId: '2', // John Driver
    licenseNumber: 'DL-12345',
    licenseExpiryDate: '2026-05-15T00:00:00.000Z',
    phoneNumber: '+237 612345678',
    address: '123 Driver Street, Douala',
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
  },
  {
    id: '2',
    userId: '3', // Jane Driver
    licenseNumber: 'DL-67890',
    licenseExpiryDate: '2027-03-20T00:00:00.000Z',
    phoneNumber: '+237 687654321',
    address: '456 Driver Avenue, Yaoundé',
    createdAt: '2025-01-03T00:00:00.000Z',
    updatedAt: '2025-01-03T00:00:00.000Z',
  },
];
