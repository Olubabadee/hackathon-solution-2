import React from 'react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Barber } from '../../types';
import { Scissors, Star, Zap, ZapOff } from 'lucide-react';

interface BarberCardProps {
  barber: Barber;
  onViewProfile: (barberId: string) => void;
  onBookAppointment: (barberId: string) => void;
}

export const BarberCard: React.FC<BarberCardProps> = ({ 
  barber, 
  onViewProfile, 
  onBookAppointment 
}) => {
  return (
    <Card className="transform transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <img 
          src={barber.profileImage || 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800'} 
          alt={barber.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          {barber.powerStatus === 'available' ? (
            <Badge variant="success\" className="flex items-center">
              <Zap size={12} className="mr-1" />
              Power On
            </Badge>
          ) : (
            <Badge variant="warning" className="flex items-center">
              <ZapOff size={12} className="mr-1" />
              Power Outage
            </Badge>
          )}
        </div>
      </div>
      
      <CardBody>
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-semibold">{barber.name}</h3>
          <div className="ml-auto flex items-center text-amber-500">
            <Star size={16} className="fill-current" />
            <span className="ml-1 text-sm">{barber.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{barber.bio}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {barber.specialties.map((specialty, index) => (
            <Badge key={index} variant="secondary" className="flex items-center">
              <Scissors size={12} className="mr-1" />
              {specialty}
            </Badge>
          ))}
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewProfile(barber.id)}
        >
          View Profile
        </Button>
        
        <Button 
          variant="primary" 
          size="sm" 
          onClick={() => onBookAppointment(barber.id)}
          disabled={barber.powerStatus === 'outage'}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};