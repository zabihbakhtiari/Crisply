
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Bell, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Notifications = () => {
  const notifications = [
    { 
      id: 1, 
      title: 'New team member joined',
      description: 'John Doe joined the Marketing team',
      time: '2 hours ago',
      read: false
    },
    { 
      id: 2, 
      title: 'New comment on your post',
      description: 'Sarah commented on "Q1 Marketing Strategy"',
      time: '3 hours ago',
      read: false
    },
    { 
      id: 3, 
      title: 'Task assigned to you',
      description: 'Complete website redesign by Friday',
      time: '5 hours ago',
      read: true
    },
    { 
      id: 4, 
      title: 'Meeting reminder',
      description: 'Team standup at 10:00 AM tomorrow',
      time: 'Yesterday',
      read: true
    },
    { 
      id: 5, 
      title: 'System update completed',
      description: 'The platform has been updated to version 2.4.0',
      time: '2 days ago',
      read: true
    }
  ];

  return (
    <DashboardLayout title="Notifications">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">All Notifications</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Mark all as read</Button>
          <Button variant="outline" size="sm">Settings</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? 'bg-white' : 'bg-blue-50 border-l-4 border-l-blue-500'}>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
                <Bell size={16} className={notification.read ? 'text-gray-500' : 'text-blue-500'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{notification.title}</CardTitle>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <CardDescription className="mt-1">{notification.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex justify-end">
              {!notification.read && (
                <Button variant="ghost" size="sm" className="text-xs">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Mark as read
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
