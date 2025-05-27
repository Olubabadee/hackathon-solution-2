import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Barber, WorkingHours } from '../../types';
import { Calendar, Clock, MapPin, Phone, Scissors, Star, Zap, ZapOff, ArrowLeft } from 'lucide-react';
import { workingHours as mockWorkingHours } from '../../utils/mockData';

interface BarberProfileProps {
  barber: Barber;
  onBack: () => void;
  onBookAppointment: (barberId: string) => void;
}

export const BarberProfile: React.FC<BarberProfileProps> = ({ 
  barber, 
  onBack,
  onBookAppointment 
}) => {
  const workingHours: WorkingHours[] = mockWorkingHours[barber.id] || [];
  
  // Format day name
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        leftIcon={<ArrowLeft size={16} />} 
        onClick={onBack}
      >
        Back to Barbers
      </Button>
      
      <Card>
        <div className="sm:flex">
          <div className="sm:w-1/3">
            <img 
              src={barber.profileImage || 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800'} 
              alt={barber.name} 
              className="w-full h-64 sm:h-full object-cover"
            />
          </div>
          
          <div className="sm:w-2/3">
            <CardHeader className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">{barber.name}</h2>
                <div className="flex items-center text-amber-500 mt-1">
                  <Star size={18} className="fill-current" />
                  <span className="ml-1">{barber.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div>
                {barber.powerStatus === 'available' ? (
                  <Badge variant="success\" className="flex items-center">
                    <Zap size={14} className="mr-1" />
                    Power Available
                  </Badge>
                ) : (
                  <Badge variant="warning" className="flex items-center">
                    <ZapOff size={14} className="mr-1" />
                    Power Outage
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardBody>
              <p className="text-gray-700 mb-4">{barber.bio}</p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {barber.specialties.map((specialty, index) => (
                    <Badge key={index} variant="primary" className="flex items-center">
                      <Scissors size={14} className="mr-1" />
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>Campus Center, Room 105</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </div>
        </div>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Calendar size={20} className="mr-2 text-blue-800" />
            <h3 className="text-xl font-semibold">Working Hours</h3>
          </div>
        </CardHeader>
        
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {workingHours.map((hours) => (
              <div key={hours.day} className="flex justify-between p-3 border rounded-md">
                <span className="font-medium">{formatDay(hours.day)}</span>
                {hours.isWorking ? (
                  <div className="flex items-center text-green-600">
                    <Clock size={16} className="mr-1" />
                    <span>{hours.startTime} - {hours.endTime}</span>
                  </div>
                ) : (
                  <span className="text-gray-500">Closed</span>
                )}
              </div>
            ))}
          </div>
        </CardBody>
        
        <CardFooter>
          <Button 
            variant="primary" 
            fullWidth
            onClick={() => onBookAppointment(barber.id)}
            disabled={barber.powerStatus === 'outage'}
          >
            Book an Appointment
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};