import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { BarberCard } from '../components/barber/BarberCard';
import { BarberProfile } from '../components/barber/BarberProfile';
import { BookingCalendar } from '../components/booking/BookingCalendar';
import { BookingConfirmation } from '../components/booking/BookingConfirmation';
import { BookingSuccess } from '../components/booking/BookingSuccess';
import { useBooking } from '../context/BookingContext';
import { Barber, TimeSlot } from '../types';
import { Search, Scissors } from 'lucide-react';

type BookingStep = 'list' | 'profile' | 'calendar' | 'confirmation' | 'success';

export const BookingPage: React.FC = () => {
  const { barbers, timeSlots, bookAppointment } = useBooking();
  const [currentStep, setCurrentStep] = useState<BookingStep>('list');
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter barbers based on search query
  const filteredBarbers = barbers.filter(barber => 
    barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barber.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Handle barber profile view
  const handleViewProfile = (barberId: string) => {
    const barber = barbers.find(b => b.id === barberId);
    if (barber) {
      setSelectedBarber(barber);
      setCurrentStep('profile');
    }
  };
  
  // Handle booking initiation
  const handleBookAppointment = (barberId: string) => {
    const barber = barbers.find(b => b.id === barberId);
    if (barber) {
      setSelectedBarber(barber);
      setCurrentStep('calendar');
    }
  };
  
  // Handle slot selection
  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    setCurrentStep('confirmation');
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = async (notes: string) => {
    if (selectedBarber && selectedSlot) {
      await bookAppointment(selectedBarber.id, selectedSlot.id, notes);
      setCurrentStep('success');
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    switch (currentStep) {
      case 'profile':
        setCurrentStep('list');
        setSelectedBarber(null);
        break;
      case 'calendar':
        setCurrentStep('profile');
        break;
      case 'confirmation':
        setCurrentStep('calendar');
        setSelectedSlot(null);
        break;
      default:
        break;
    }
  };
  
  // Handle done action after booking success
  const handleDone = () => {
    setCurrentStep('list');
    setSelectedBarber(null);
    setSelectedSlot(null);
  };
  
  // Render based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'list':
        return (
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                  placeholder="Search barbers by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {filteredBarbers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBarbers.map((barber) => (
                  <BarberCard 
                    key={barber.id} 
                    barber={barber} 
                    onViewProfile={handleViewProfile}
                    onBookAppointment={handleBookAppointment}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Scissors className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No barbers found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or check back later for new barbers.
                </p>
              </div>
            )}
          </div>
        );
        
      case 'profile':
        if (!selectedBarber) return null;
        return (
          <div className="container mx-auto px-4 py-6">
            <BarberProfile 
              barber={selectedBarber} 
              onBack={handleBack}
              onBookAppointment={handleBookAppointment}
            />
          </div>
        );
        
      case 'calendar':
        if (!selectedBarber) return null;
        return (
          <div className="container mx-auto px-4 py-6">
            <BookingCalendar 
              barber={selectedBarber}
              timeSlots={timeSlots}
              onSelectSlot={handleSelectSlot}
              onBack={handleBack}
            />
          </div>
        );
        
      case 'confirmation':
        if (!selectedBarber || !selectedSlot) return null;
        return (
          <div className="container mx-auto px-4 py-6">
            <BookingConfirmation 
              barber={selectedBarber}
              selectedSlot={selectedSlot}
              onConfirm={handleConfirmBooking}
              onBack={handleBack}
            />
          </div>
        );
        
      case 'success':
        if (!selectedBarber || !selectedSlot) return null;
        return (
          <div className="container mx-auto px-4 py-6">
            <BookingSuccess 
              barberName={selectedBarber.name}
              date={selectedSlot.date}
              startTime={selectedSlot.startTime}
              endTime={selectedSlot.endTime}
              onDone={handleDone}
            />
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Campus Cuts" />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};