
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { useNotificationSettings } from '@/hooks/use-notification-settings';

const NotificationSection: React.FC = () => {
  const { toast } = useToast();
  const { 
    notificationSettings: settings, 
    isLoading: loading, 
    updateNotificationSetting: updateSetting 
  } = useNotificationSettings();
  
  const getSettingValue = (type: string): boolean => {
    const setting = settings.find(s => s.type === type);
    return setting ? setting.enabled : false;
  };

  const handleToggleSetting = async (type: string) => {
    const currentValue = getSettingValue(type);
    await updateSetting({ type, enabled: !currentValue });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Loading your notification settings...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-40">
            <p>Loading...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.type} className="flex items-center justify-between">
              <div>
                <Label htmlFor={setting.type} className="font-medium">
                  {setting.type.charAt(0).toUpperCase() + setting.type.slice(1)} Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  {setting.type === 'email' && "Receive email notifications for important updates"}
                  {setting.type === 'push' && "Receive push notifications on your device"}
                  {setting.type === 'mentions' && "Get notified when someone mentions you"}
                  {setting.type === 'reminders' && "Get reminded about your upcoming tasks"}
                  {setting.type === 'updates' && "Get notified about new features and updates"}
                </p>
              </div>
              <Switch 
                id={setting.type} 
                checked={setting.enabled} 
                onCheckedChange={() => handleToggleSetting(setting.type)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
