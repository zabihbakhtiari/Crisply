import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Bell, CheckCircle, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
        <h2 className="text-2xl font-semibold dark:text-white">All Notifications</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="dark:text-white dark:hover:bg-gray-800 dark:hover:text-white dark:border-gray-600"
          >
            Mark all as read
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="dark:text-white dark:hover:bg-gray-800 dark:hover:text-white dark:border-gray-600"
            onClick={() => setIsSettingsOpen(true)}
          >
            <SettingsIcon className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`${notification.read 
              ? 'bg-white dark:bg-gray-800' 
              : 'bg-blue-50 dark:bg-blue-950 border-l-4 border-l-blue-500'}`}
          >
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className={`p-2 rounded-full ${
                notification.read 
                  ? 'bg-gray-100 dark:bg-gray-700' 
                  : 'bg-blue-100 dark:bg-blue-900'
              }`}>
                <Bell 
                  size={16} 
                  className={notification.read 
                    ? 'text-gray-500 dark:text-white' 
                    : 'text-blue-500 dark:text-white'} 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base dark:text-white">{notification.title}</CardTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-300">{notification.time}</span>
                </div>
                <CardDescription className="mt-1 dark:text-white">{notification.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex justify-end">
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Mark as read
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Notification Settings</DialogTitle>
            <DialogDescription className="dark:text-gray-400">
              Customize how you receive notifications.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive browser push notifications
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notification Sound</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Play sound for new notifications
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Desktop Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Show notifications on desktop
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsSettingsOpen(false)}
              className="dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsSettingsOpen(false)}
              className="dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Notifications;
