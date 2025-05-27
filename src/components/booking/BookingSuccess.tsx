import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { CheckCircle, Calendar, Clock, User } from 'lucide-react';

interface BookingSuccessProps {
  barberName: string;
  date: string;
  startTime: string;
  endTime: string;
  onDone: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({
  barberName,
  date,
  startTime,
  endTime,
  onDone,
}) => {
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

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="bg-green-600 text-white text-center">
        <div className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 mb-2" />
          <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
        </div>
      </CardHeader>
      
      <CardBody className="space-y-6">
        <div className="text-center text-gray-600 mb-4">
          <p>Your appointment has been successfully booked. We've sent a confirmation to your email.</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Barber</h3>
              <p className="text-gray-700">{barberName}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Date</h3>
              <p className="text-gray-700">{formatDate(date)}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <h3 className="font-medium text-gray-900">Time</h3>
              <p className="text-gray-700">{formatTime(startTime)} - {formatTime(endTime)}</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500">
            We'll send you a reminder before your appointment. You can cancel or reschedule up to 2 hours before.
          </p>
        </div>
      </CardBody>
      
      <CardFooter>
        <Button 
          variant="primary" 
          fullWidth
          onClick={onDone}
        >
          Done
        </Button>
      </CardFooter>
    </Card>
  );
};