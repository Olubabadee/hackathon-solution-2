import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';
import { Scissors, Clock, Calendar, User, Zap, CheckCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                No More Long Waits for Campus Haircuts
              </h1>
              <p className="text-xl text-blue-100 mb-6">
                Book appointments with student barbers, check availability in real-time, and skip the long queues.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleGetStarted}
                >
                  Book an Appointment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-blue-700"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Campus Barber"
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a Barber</h3>
              <p className="text-gray-600">
                Browse profiles of student barbers on campus, check their specialties and ratings.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Select a Time Slot</h3>
              <p className="text-gray-600">
                View real-time availability and book an appointment that fits your schedule.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Haircut</h3>
              <p className="text-gray-600">
                Show up at your scheduled time, skip the queue, and enjoy your fresh haircut.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Campus Cuts?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mr-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-gray-600">
                  No more waiting in long queues. Book your slot and arrive just in time for your appointment.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mr-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Support Fellow Students</h3>
                <p className="text-gray-600">
                  All barbers are students who provide affordable haircuts while building their skills.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mr-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Power Status Updates</h3>
                <p className="text-gray-600">
                  Get real-time updates about power availability to avoid wasted trips during outages.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="mr-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Find appointments that fit your class schedule, with options throughout the week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for a Fresh Look?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of students who've already discovered the easiest way to get a haircut on campus.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white transform transition-all duration-300 hover:scale-105"
            onClick={handleGetStarted}
          >
            Book Your Appointment Now
          </Button>
        </div>
      </section>
    </div>
  );
};