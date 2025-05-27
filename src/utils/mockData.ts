import { Barber, Appointment, TimeSlot, Notification, WorkingHours } from '../types';

// Mock barbers
export const barbers: Barber[] = [
  {
    id: '1',
    name: 'James Wilson',
    email: 'james@campus.edu',
    role: 'barber',
    profileImage: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Specializing in fades and modern cuts. 3 years of experience.',
    rating: 4.8,
    specialties: ['Fades', 'Tapers', 'Line-ups'],
    powerStatus: 'available',
  },
  {
    id: '2',
    name: 'Michael Johnson',
    email: 'michael@campus.edu',
    role: 'barber',
    profileImage: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Classic cuts and beard trims. 5+ years in the business.',
    rating: 4.9,
    specialties: ['Classic Cuts', 'Beard Trims', 'Hot Towel Shaves'],
    powerStatus: 'outage',
  },
  {
    id: '3',
    name: 'Sophia Rodriguez',
    email: 'sophia@campus.edu',
    role: 'barber',
    profileImage: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Modern styles for all hair types. Known for precision and attention to detail.',
    rating: 4.7,
    specialties: ['Textured Cuts', 'Creative Designs', 'Hair Coloring'],
    powerStatus: 'available',
  },
];

// Generate time slots for today and the next 6 days
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const barberIds = barbers.map(barber => barber.id);
  
  // Get today's date
  const today = new Date();
  
  // Generate slots for the next 7 days
  for (let day = 0; day < 7; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    const dateString = currentDate.toISOString().split('T')[0];
    
    // For each barber
    barberIds.forEach(barberId => {
      // Generate slots from 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        const startTime = `${hour}:00`;
        const endTime = `${hour + 1}:00`;
        
        // Random booking status (for demo purposes)
        const isBooked = Math.random() > 0.7;
        
        slots.push({
          id: `${barberId}-${dateString}-${hour}`,
          barberId,
          date: dateString,
          startTime,
          endTime,
          isBooked,
        });
      }
    });
  }
  
  return slots;
};

export const timeSlots: TimeSlot[] = generateTimeSlots();

// Mock appointments
export const appointments: Appointment[] = [
  {
    id: '1',
    barberId: '1',
    clientId: 'client1',
    slotId: timeSlots[0].id,
    date: timeSlots[0].date,
    startTime: timeSlots[0].startTime,
    endTime: timeSlots[0].endTime,
    status: 'confirmed',
    notes: 'Regular fade, number 2 on the sides',
  },
  {
    id: '2',
    barberId: '2',
    clientId: 'client1',
    slotId: timeSlots[10].id,
    date: timeSlots[10].date,
    startTime: timeSlots[10].startTime,
    endTime: timeSlots[10].endTime,
    status: 'pending',
    notes: 'Beard trim',
  },
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: '1',
    userId: 'client1',
    message: 'Your appointment with James Wilson is confirmed for tomorrow at 10:00 AM.',
    type: 'appointment',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    userId: 'client1',
    message: 'Reminder: You have an appointment with Michael Johnson in 1 hour.',
    type: 'reminder',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock working hours
export const workingHours: Record<string, WorkingHours[]> = {
  '1': [
    { day: 'monday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'tuesday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'wednesday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'thursday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'friday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'saturday', isWorking: false },
    { day: 'sunday', isWorking: false },
  ],
  '2': [
    { day: 'monday', isWorking: true, startTime: '10:00', endTime: '18:00' },
    { day: 'tuesday', isWorking: true, startTime: '10:00', endTime: '18:00' },
    { day: 'wednesday', isWorking: false },
    { day: 'thursday', isWorking: true, startTime: '10:00', endTime: '18:00' },
    { day: 'friday', isWorking: true, startTime: '10:00', endTime: '18:00' },
    { day: 'saturday', isWorking: true, startTime: '11:00', endTime: '16:00' },
    { day: 'sunday', isWorking: false },
  ],
  '3': [
    { day: 'monday', isWorking: false },
    { day: 'tuesday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'wednesday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'thursday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'friday', isWorking: true, startTime: '09:00', endTime: '17:00' },
    { day: 'saturday', isWorking: true, startTime: '10:00', endTime: '15:00' },
    { day: 'sunday', isWorking: false },
  ],
};

// Current user for mock auth
export const currentUser = {
  id: 'client1',
  name: 'Alex Thompson',
  email: 'alex@student.edu',
  role: 'client' as const,
};