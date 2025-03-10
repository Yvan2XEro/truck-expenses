import { Document } from '../types';

export const documents: Document[] = [
  {
    id: '1',
    vehicleId: '1',
    type: 'insurance',
    number: 'INS-2025-001',
    issueDate: '2025-01-01T00:00:00.000Z',
    expiryDate: '2026-01-01T00:00:00.000Z',
    status: 'valid',
    file: '/documents/insurance-1.pdf',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    vehicleId: '1',
    type: 'technical_visit',
    number: 'TV-2025-001',
    issueDate: '2024-12-15T00:00:00.000Z',
    expiryDate: '2025-12-15T00:00:00.000Z',
    status: 'valid',
    file: '/documents/technical-visit-1.pdf',
    createdAt: '2024-12-15T00:00:00.000Z',
    updatedAt: '2024-12-15T00:00:00.000Z',
  },
  {
    id: '3',
    vehicleId: '1',
    type: 'transport_license',
    number: 'TL-2025-001',
    issueDate: '2024-11-01T00:00:00.000Z',
    expiryDate: '2025-04-01T00:00:00.000Z',
    status: 'expiring_soon',
    file: '/documents/transport-license-1.pdf',
    createdAt: '2024-11-01T00:00:00.000Z',
    updatedAt: '2024-11-01T00:00:00.000Z',
  },
  {
    id: '4',
    vehicleId: '2',
    type: 'insurance',
    number: 'INS-2024-002',
    issueDate: '2024-07-01T00:00:00.000Z',
    expiryDate: '2025-07-01T00:00:00.000Z',
    status: 'valid',
    file: '/documents/insurance-2.pdf',
    createdAt: '2024-07-01T00:00:00.000Z',
    updatedAt: '2024-07-01T00:00:00.000Z',
  },
  {
    id: '5',
    vehicleId: '3',
    type: 'blue_card',
    number: 'BC-2023-003',
    issueDate: '2023-05-15T00:00:00.000Z',
    expiryDate: '2025-03-01T00:00:00.000Z',
    status: 'expired',
    file: '/documents/blue-card-3.pdf',
    createdAt: '2023-05-15T00:00:00.000Z',
    updatedAt: '2023-05-15T00:00:00.000Z',
  },
  {
    id: '6',
    vehicleId: '4',
    type: 'acf',
    number: 'ACF-2024-004',
    issueDate: '2024-02-10T00:00:00.000Z',
    expiryDate: '2025-02-10T00:00:00.000Z',
    status: 'valid',
    file: '/documents/acf-4.pdf',
    createdAt: '2024-02-10T00:00:00.000Z',
    updatedAt: '2024-02-10T00:00:00.000Z',
  },
];
