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
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">All Notifications</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
          >
            Mark all as read
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
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
            className={`group transition-all duration-200 ${notification.read 
              ? 'bg-white hover:bg-gray-50 dark:bg-gray-800/90 dark:hover:bg-gray-800' 
              : 'bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-750 border-l-4 border-l-blue-500 dark:border-l-blue-400'}`}
          >
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className={`p-2 rounded-full transition-colors duration-200 ${
                notification.read 
                  ? 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600' 
                  : 'bg-blue-100 dark:bg-blue-900 group-hover:bg-blue-200 dark:group-hover:bg-blue-800'
              }`}>
                <Bell 
                  size={16} 
                  className={`transition-colors duration-200 ${notification.read 
                    ? 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300' 
                    : 'text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300'}`} 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-200">
                    {notification.title}
                  </CardTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
                    {notification.time}
                  </span>
                </div>
                <CardDescription className="mt-1 text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200">
                  {notification.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pt-0 flex justify-end">
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
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
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg dark:shadow-gray-900/20">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">Notification Settings</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              Customize how you receive notifications.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {[
              {
                title: "Email Notifications",
                description: "Receive notifications via email",
                defaultChecked: true
              },
              {
                title: "Push Notifications",
                description: "Receive browser push notifications",
                defaultChecked: true
              },
              {
                title: "Notification Sound",
                description: "Play sound for new notifications",
                defaultChecked: false
              },
              {
                title: "Desktop Notifications",
                description: "Show notifications on desktop",
                defaultChecked: true
              }
            ].map((setting, index) => (
              <React.Fragment key={setting.title}>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-gray-100">{setting.title}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {setting.description}
                    </p>
                  </div>
                  <Switch 
                    defaultChecked={setting.defaultChecked}
                    className="bg-gray-200 dark:bg-gray-700 data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-600 transition-colors duration-200" 
                  />
                </div>
                {index < 3 && <Separator className="bg-gray-200 dark:bg-gray-700" />}
              </React.Fragment>
            ))}
          </div>
          <DialogFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsSettingsOpen(false)}
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsSettingsOpen(false)}
              className="bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200"
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
