import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Scissors, 
  Zap, 
  ZapOff, 
  CheckCircle, 
  XCircle,
  BarChart,
  Users
} from 'lucide-react';

export const BarberDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { appointments, updateBarberPowerStatus, cancelAppointment } = useBooking();
  const [isPowerAvailable, setIsPowerAvailable] = useState(true);
  
  // We're simulating a barber view, so we'll filter appointments for this barber
  // In a real app, this would be based on the logged-in barber's ID
  const barberAppointments = appointments.filter(a => a.barberId === '1');
  
  // Get today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = barberAppointments.filter(a => a.date === today && a.status !== 'cancelled');
  
  // Get upcoming appointments (excluding today)
  const upcomingAppointments = barberAppointments.filter(
    a => a.date > today && a.status !== 'cancelled'
  );
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Format time for display
  const formatTime = (timeString: string) => {
    const [hour] = timeString.split(':');
    const hourNum = parseInt(hour, 10);
    return `${hourNum % 12 === 0 ? 12 : hourNum % 12}:00 ${hourNum >= 12 ? 'PM' : 'AM'}`;
  };
  
  // Handle power status toggle
  const handlePowerStatusToggle = async () => {
    try {
      const newStatus = isPowerAvailable ? 'outage' : 'available';
      await updateBarberPowerStatus('1', newStatus);
      setIsPowerAvailable(!isPowerAvailable);
    } catch (error) {
      console.error('Error updating power status:', error);
    }
  };
  
  // Handle appointment cancellation
  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment(appointmentId);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Barber Dashboard" />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Stats Card: Today's Appointments */}
            <Card>
              <CardBody className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Today's Appointments</h3>
                  <p className="text-2xl font-bold">{todayAppointments.length}</p>
                </div>
              </CardBody>
            </Card>
            
            {/* Stats Card: Total Clients */}
            <Card>
              <CardBody className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-800" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Total Clients</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </CardBody>
            </Card>
            
            {/* Stats Card: Completion Rate */}
            <Card>
              <CardBody className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <BarChart className="h-6 w-6 text-amber-800" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Completion Rate</h3>
                  <p className="text-2xl font-bold">95%</p>
                </div>
              </CardBody>
            </Card>
          </div>
          
          {/* Power Status Toggle */}
          <Card className="mb-8">
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Power Status</h2>
              <Button
                variant={isPowerAvailable ? 'success' : 'warning'}
                onClick={handlePowerStatusToggle}
                leftIcon={isPowerAvailable ? <Zap size={16} /> : <ZapOff size={16} />}
              >
                {isPowerAvailable ? 'Power Available' : 'Power Outage'}
              </Button>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600">
                {isPowerAvailable 
                  ? 'Your status is set to available. Students can book appointments with you.'
                  : 'Your status is set to power outage. New bookings are disabled, but existing appointments are maintained.'}
              </p>
            </CardBody>
          </Card>
          
          {/* Today's Appointments */}
          <Card className="mb-8">
            <CardHeader>
              <h2 className="text-xl font-semibold">Today's Appointments</h2>
            </CardHeader>
            <CardBody>
              {todayAppointments.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {todayAppointments.map((appointment) => (
                    <div key={appointment.id} className="py-4 flex flex-col sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="font-medium">Client #{appointment.clientId.slice(-4)}</span>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <Clock className="h-5 w-5 text-gray-400 mr-2" />
                          <span>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</span>
                        </div>
                        
                        {appointment.notes && (
                          <div className="ml-7 text-sm text-gray-500 mt-1">
                            Note: {appointment.notes}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 sm:mt-0 flex">
                        <Button
                          variant="success"
                          size="sm"
                          className="mr-2"
                          leftIcon={<CheckCircle size={16} />}
                        >
                          Complete
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<XCircle size={16} />}
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No appointments scheduled for today</p>
                </div>
              )}
            </CardBody>
          </Card>
          
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            </CardHeader>
            <CardBody>
              {upcomingAppointments.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="py-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="font-medium">{formatDate(appointment.date)}</span>
                        </div>
                        
                        <Badge variant="primary">
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center mb-2 ml-7">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}</span>
                      </div>
                      
                      <div className="flex items-center ml-7">
                        <User className="h-5 w-5 text-gray-400 mr-2" />
                        <span>Client #{appointment.clientId.slice(-4)}</span>
                      </div>
                      
                      {appointment.notes && (
                        <div className="ml-7 text-sm text-gray-500 mt-1">
                          Note: {appointment.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No upcoming appointments</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
};