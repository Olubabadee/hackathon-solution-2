import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { TimeSlot, Barber } from '../../types';
import { Check, Calendar, Clock, Scissors, User, FileText } from 'lucide-react';

interface BookingConfirmationProps {
  barber: Barber;
  selectedSlot: TimeSlot;
  onConfirm: (notes: string) => Promise<void>;
  onBack: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  barber,
  selectedSlot,
  onConfirm,
  onBack,
}) => {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Format time for display
  const formatTime = (timeString: string) => {
    const [hour] = timeString.split(':');
    const hourNum = parseInt(hour, 10);
    return `${hourNum % 12 === 0 ? 12 : hourNum % 12}:00 ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };
  
  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(notes);
    } catch (error) {
      console.error('Error confirming booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="bg-blue-800 text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold">Confirm Your Appointment</h2>
        </div>
      </CardHeader>
      
      <CardBody className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <User className="h-5 w-5 text-blue-800 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Barber</h3>
              <p className="text-gray-700">{barber.name}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Scissors className="h-5 w-5 text-blue-800 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Services</h3>
              <p className="text-gray-700">{barber.specialties.join(', ')}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-blue-800 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Date</h3>
              <p className="text-gray-700">{formatDate(selectedSlot.date)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-blue-800 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Time</h3>
              <p className="text-gray-700">{formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}</p>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            Notes (optional)
          </label>
          <textarea
            id="notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special requests or notes for your barber..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </Button>
        
        <Button 
          variant="primary" 
          onClick={handleConfirm}
          isLoading={isLoading}
          leftIcon={!isLoading ? <Check size={16} /> : undefined}
        >
          Confirm Booking
        </Button>
      </CardFooter>
    </Card>
  );
};