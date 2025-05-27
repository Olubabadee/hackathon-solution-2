import React, { createContext, useContext, useState, useEffect } from 'react';
import { Barber, TimeSlot, Appointment, Notification } from '../types';
import { barbers, timeSlots as mockTimeSlots, appointments as mockAppointments, notifications as mockNotifications } from '../utils/mockData';
import { useAuth } from './AuthContext';

interface BookingContextType {
  barbers: Barber[];
  timeSlots: TimeSlot[];
  appointments: Appointment[];
  notifications: Notification[];
  isLoading: boolean;
  bookAppointment: (barberId: string, slotId: string, notes?: string) => Promise<void>;
  cancelAppointment: (appointmentId: string) => Promise<void>;
  markNotificationAsRead: (notificationId: string) => void;
  updateBarberPowerStatus: (barberId: string, status: 'available' | 'outage') => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [allBarbers, setAllBarbers] = useState<Barber[]>(barbers);
  const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>(mockTimeSlots);
  const [allAppointments, setAllAppointments] = useState<Appointment[]>(mockAppointments);
  const [allNotifications, setAllNotifications] = useState<Notification[]>(mockNotifications);

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const bookAppointment = async (barberId: string, slotId: string, notes?: string) => {
    if (!user) throw new Error('User must be logged in to book');
    
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Find the slot
          const slot = allTimeSlots.find(s => s.id === slotId);
          if (!slot) throw new Error('Slot not found');
          if (slot.isBooked) throw new Error('Slot already booked');
          
          // Create a new appointment
          const newAppointment: Appointment = {
            id: `appointment-${Date.now()}`,
            barberId,
            clientId: user.id,
            slotId,
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: 'confirmed',
            notes,
          };
          
          // Update the slot
          const updatedSlots = allTimeSlots.map(s => 
            s.id === slotId ? { ...s, isBooked: true } : s
          );
          
          // Add a notification
          const barber = allBarbers.find(b => b.id === barberId);
          const newNotification: Notification = {
            id: `notification-${Date.now()}`,
            userId: user.id,
            message: `Your appointment with ${barber?.name} on ${new Date(slot.date).toLocaleDateString()} at ${slot.startTime} has been confirmed.`,
            type: 'appointment',
            isRead: false,
            createdAt: new Date().toISOString(),
          };
          
          // Update state
          setAllAppointments([...allAppointments, newAppointment]);
          setAllTimeSlots(updatedSlots);
          setAllNotifications([...allNotifications, newNotification]);
          
          setIsLoading(false);
          resolve();
        } catch (error) {
          setIsLoading(false);
          reject(error);
        }
      }, 800);
    });
  };

  const cancelAppointment = async (appointmentId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        try {
          // Find the appointment
          const appointment = allAppointments.find(a => a.id === appointmentId);
          if (!appointment) throw new Error('Appointment not found');
          
          // Update the appointment status
          const updatedAppointments = allAppointments.map(a => 
            a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a
          );
          
          // Update the slot
          const updatedSlots = allTimeSlots.map(s => 
            s.id === appointment.slotId ? { ...s, isBooked: false } : s
          );
          
          // Add a notification
          const barber = allBarbers.find(b => b.id === appointment.barberId);
          const newNotification: Notification = {
            id: `notification-${Date.now()}`,
            userId: user?.id || appointment.clientId,
            message: `Your appointment with ${barber?.name} on ${new Date(appointment.date).toLocaleDateString()} at ${appointment.startTime} has been cancelled.`,
            type: 'cancellation',
            isRead: false,
            createdAt: new Date().toISOString(),
          };
          
          // Update state
          setAllAppointments(updatedAppointments);
          setAllTimeSlots(updatedSlots);
          setAllNotifications([...allNotifications, newNotification]);
          
          setIsLoading(false);
          resolve();
        } catch (error) {
          setIsLoading(false);
          reject(error);
        }
      }, 800);
    });
  };

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = allNotifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    setAllNotifications(updatedNotifications);
  };

  const updateBarberPowerStatus = async (barberId: string, status: 'available' | 'outage') => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const updatedBarbers = allBarbers.map(b => 
          b.id === barberId ? { ...b, powerStatus: status } : b
        );
        setAllBarbers(updatedBarbers);
        setIsLoading(false);
        resolve();
      }, 600);
    });
  };

  return (
    <BookingContext.Provider value={{
      barbers: allBarbers,
      timeSlots: allTimeSlots,
      appointments: allAppointments,
      notifications: allNotifications,
      isLoading,
      bookAppointment,
      cancelAppointment,
      markNotificationAsRead,
      updateBarberPowerStatus
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};