import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';
import { TimeSlot, Barber } from '../../types';
import { Calendar, Clock } from 'lucide-react';

interface BookingCalendarProps {
  barber: Barber;
  timeSlots: TimeSlot[];
  onSelectSlot: (slot: TimeSlot) => void;
  onBack: () => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  barber,
  timeSlots,
  onSelectSlot,
  onBack,
}) => {
  // Get unique dates from the time slots
  const dates = [...new Set(timeSlots
    .filter(slot => slot.barberId === barber.id)
    .map(slot => slot.date)
  )];
  
  const [selectedDate, setSelectedDate] = useState<string>(dates[0] || '');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  
  // Update available slots when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const slots = timeSlots.filter(
        slot => slot.barberId === barber.id && slot.date === selectedDate
      );
      setAvailableSlots(slots);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, barber.id, timeSlots]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Check if date is today
  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return date.toDateString() === today.toDateString();
  };
  
  // Format time for display
  const formatTime = (timeString: string) => {
    const [hour] = timeString.split(':');
    const hourNum = parseInt(hour, 10);
    return `${hourNum % 12 === 0 ? 12 : hourNum % 12}:00 ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={onBack}
      >
        Back to Profile
      </Button>
      
      <Card>
        <CardHeader className="flex items-center border-b">
          <Calendar size={20} className="mr-2 text-blue-800" />
          <h3 className="text-xl font-semibold">Select a Date</h3>
        </CardHeader>
        
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`py-3 px-4 rounded-md border transition-colors 
                  ${selectedDate === date 
                    ? 'bg-blue-800 text-white border-blue-800' 
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                  }`}
              >
                <div className="text-center">
                  <div className={`font-medium ${selectedDate === date ? 'text-white' : 'text-gray-900'}`}>
                    {formatDate(date)}
                  </div>
                  {isToday(date) && (
                    <div className={`text-xs mt-1 ${selectedDate === date ? 'text-blue-100' : 'text-blue-500'}`}>
                      Today
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>
      
      {selectedDate && (
        <Card>
          <CardHeader className="flex items-center border-b">
            <Clock size={20} className="mr-2 text-blue-800" />
            <h3 className="text-xl font-semibold">Select a Time</h3>
          </CardHeader>
          
          <CardBody>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => onSelectSlot(slot)}
                    disabled={slot.isBooked}
                    className={`py-3 px-4 rounded-md border transition-colors
                      ${slot.isBooked 
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed' 
                        : 'bg-white hover:bg-blue-50 hover:border-blue-300 border-gray-200'
                      }`}
                  >
                    <div className="text-center">
                      <div className="font-medium">
                        {formatTime(slot.startTime)}
                      </div>
                      {slot.isBooked && (
                        <div className="text-xs mt-1 text-red-500">
                          Booked
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No available slots for this date
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};