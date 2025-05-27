import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Calendar, Bell, Clock } from 'lucide-react';

interface NotificationDropdownProps {
  isMobile?: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ 
  isMobile = false,
  onClose 
}) => {
  const { notifications, markNotificationAsRead } = useBooking();
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 0) {
      return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={18} className="text-blue-600" />;
      case 'reminder':
        return <Clock size={18} className="text-amber-600" />;
      case 'cancellation':
        return <Calendar size={18} className="text-red-600" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };
  
  const handleNotificationClick = (id: string) => {
    markNotificationAsRead(id);
  };
  
  if (isMobile) {
    return (
      <div className="space-y-4">
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${notification.isRead ? 'bg-gray-50' : 'bg-blue-50'}`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="ml-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <Button variant="outline" fullWidth onClick={onClose}>
              Close
            </Button>
          </>
        ) : (
          <div className="text-center py-6">
            <Bell size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">No notifications yet</p>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Card className="absolute right-0 top-10 w-80 mt-2 z-50 shadow-lg">
      <div className="py-2 px-3 bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Notifications</h3>
          {notifications.some(n => !n.isRead) && (
            <Badge variant="primary">New</Badge>
          )}
        </div>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                  notification.isRead ? '' : 'bg-blue-50'
                }`}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {getTimeAgo(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="ml-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Bell size={24} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No notifications yet</p>
          </div>
        )}
      </div>
      
      <div className="py-2 px-3 bg-gray-50 border-t text-center">
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Card>
  );
};