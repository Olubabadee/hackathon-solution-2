// Type definitions for the application

export type UserRole = 'client' | 'barber';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Barber extends User {
  role: 'barber';
  bio: string;
  rating: number;
  specialties: string[];
  powerStatus: 'available' | 'outage';
}

export interface TimeSlot {
  id: string;
  barberId: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  isBooked: boolean;
}

export interface Appointment {
  id: string;
  barberId: string;
  clientId: string;
  slotId: string;
  date: string; // ISO string
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
}

export interface WorkingHours {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isWorking: boolean;
  startTime?: string; // HH:MM format
  endTime?: string; // HH:MM format;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'appointment' | 'reminder' | 'cancellation' | 'system';
  isRead: boolean;
  createdAt: string; // ISO string
}