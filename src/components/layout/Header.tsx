import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Bell, Menu, X, LogOut, User } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { Badge } from '../ui/Badge';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();
  const { notifications } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.isRead && n.userId === user?.id);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    // Close the menu if it's open
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold">{title}</h1>
          
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="p-2 rounded-full hover:bg-blue-700 transition-colors relative"
                  >
                    <Bell size={20} />
                    {unreadNotifications.length > 0 && (
                      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </button>
                  
                  {isNotificationsOpen && (
                    <NotificationDropdown 
                      onClose={() => setIsNotificationsOpen(false)} 
                    />
                  )}
                </div>
                
                <div className="flex items-center">
                  <span className="mr-2">{user.name}</span>
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-blue-700"
                  leftIcon={<LogOut size={16} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
            
            {!user && (
              <Button
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-blue-700"
                leftIcon={<User size={16} />}
              >
                Login
              </Button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-blue-900 bg-opacity-95">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {user && (
                <>
                  <div className="flex items-center justify-between py-3 border-b border-blue-700">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                        <span className="text-sm font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-blue-200">{user.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center justify-between py-3 border-b border-blue-700"
                    onClick={toggleNotifications}
                  >
                    <div className="flex items-center">
                      <Bell size={20} className="mr-3" />
                      <span>Notifications</span>
                    </div>
                    {unreadNotifications.length > 0 && (
                      <Badge variant="danger">{unreadNotifications.length}</Badge>
                    )}
                  </div>
                  
                  <div 
                    className="flex items-center py-3 border-b border-blue-700"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} className="mr-3" />
                    <span>Logout</span>
                  </div>
                </>
              )}
              
              {!user && (
                <div className="flex items-center py-3 border-b border-blue-700">
                  <User size={20} className="mr-3" />
                  <span>Login</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile notifications */}
      {isNotificationsOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-900"
              >
                <X size={24} />
              </button>
            </div>
            
            <NotificationDropdown 
              isMobile={true}
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </div>
        </div>
      )}
    </header>
  );
};