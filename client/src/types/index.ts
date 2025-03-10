// Common types
export type ID = string;

// User types
export type UserRole = "ADMIN" | "DRIVER";
export type VehicleType = "FLATBED" | "LOG_TRUCK";
export interface User {
  id: ID;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

// Vehicle types
export type VehicleStatus =
  | "AVAILABLE"
  | "ON_TRIP"
  | "MAINTENANCE"
  | "OUT_OF_SERVICE";

export interface Vehicle {
  id: ID;
  model: string;
  status: VehicleStatus;
  createdAt: string;
  updatedAt: string;
  brand: string;
  type: VehicleType;
  tractorPlateNumber: string;
  trailerPlateNumber: string;
  documents: Document[];
}

// Document types
export type DocumentType =
  | "INSURANCE"
  | "LICENSE"
  | "TECHNICAL_VISIT"
  | "ACF"
  | "BLUE_CARD";

export interface Document {
  id: ID;
  vehicleId: ID;
  documentType: DocumentType;
  number: string;
  issueDate: string;
  expiryDate: string;
  status: "VALID" | "INVALID";
  file?: string; // URL to the document file
  createdAt: string;
  updatedAt: string;
}

// Driver types
export interface Driver {
  id: ID;
  userId: ID;
  licenseNumber: string;
  licenseExpiryDate: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: ID;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  matricule: string;
}
export interface Client {
  id: ID;
  name: string;
  contact?: string;
  address?: string;
  createdAt: string;
  trips: Trip[];
  updatedAt: string;
}

// Trip types
export type TripStatus = "planned" | "in_progress" | "completed" | "cancelled";
export type TripType = "LONG_DISTANCE" | "SHUTTLE";


export interface Trip {
  id: ID;
  vehicleId: ID;
  driverId: ID;
  clientId?: ID;
  departure: string;
  arrival: string;
  startTime?: Date;
  endTime?: Date;
  tripType: TripType;
  vehicle?: Vehicle;
  driver: User
  expenses: Expense[];
  client?: Client;
  createdAt: string;
  updatedAt: string;
}

// Expense types
export type ExpenseCategory = "FUEL" | "TOLL" | "MAINTENANCE" | "MISC";

export interface Expense {
  id: ID;
  tripId: ID;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// Transaction types
export interface Transaction {
  id: ID;
  tripId: ID;
  driverId: ID;
  type: TripType; // Same as trip type
  amount: number;
  date: string;
  status: "pending" | "paid";
  createdAt: string;
  updatedAt: string;
}

// Invoice types
export interface Invoice {
  id: ID;
  tripId: ID;
  clientName: string;
  providerName: string;
  date: string;
  vehicleLetterNumber: string; // Numéro de lettre voiture
  volume: number; // m³
  amount: number;
  status: "draft" | "sent" | "paid";
  createdAt: string;
  updatedAt: string;
}

// Report types
export interface Report {
  id: ID;
  type: "expense" | "transaction" | "document";
  startDate: string;
  endDate: string;
  generatedAt: string;
  format: "pdf" | "excel";
  url: string; // URL to the report file
}
