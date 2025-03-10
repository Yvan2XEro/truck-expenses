import { Vehicle } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: '1',
    licensePlate: 'ABC-123',
    model: 'Mercedes Actros',
    status: 'available',
    mileage: 50000,
    purchaseDate: '2023-01-15T00:00:00.000Z',
    createdAt: '2023-01-15T00:00:00.000Z',
    updatedAt: '2025-02-20T00:00:00.000Z',
  },
  {
    id: '2',
    licensePlate: 'DEF-456',
    model: 'Volvo FH16',
    status: 'on_trip',
    mileage: 75000,
    purchaseDate: '2022-06-10T00:00:00.000Z',
    createdAt: '2022-06-10T00:00:00.000Z',
    updatedAt: '2025-02-25T00:00:00.000Z',
  },
  {
    id: '3',
    licensePlate: 'GHI-789',
    model: 'Scania R450',
    status: 'maintenance',
    mileage: 120000,
    purchaseDate: '2021-11-05T00:00:00.000Z',
    createdAt: '2021-11-05T00:00:00.000Z',
    updatedAt: '2025-02-28T00:00:00.000Z',
  },
  {
    id: '4',
    licensePlate: 'JKL-012',
    model: 'MAN TGX',
    status: 'available',
    mileage: 35000,
    purchaseDate: '2024-01-20T00:00:00.000Z',
    createdAt: '2024-01-20T00:00:00.000Z',
    updatedAt: '2025-02-15T00:00:00.000Z',
  },
];
