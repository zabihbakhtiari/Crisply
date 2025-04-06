
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const NotificationSection: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState<NotificationSetting[]>([
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive email notifications for important updates',
      enabled: true,
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Receive push notifications on your device',
      enabled: true,
    },
    {
      id: 'mentions',
      title: 'Mentions',
      description: 'Get notified when someone mentions you',
      enabled: true,
    },
    {
      id: 'reminders',
      title: 'Task Reminders',
      description: 'Get reminded about your upcoming tasks',
      enabled: false,
    },
    {
      id: 'updates',
      title: 'Product Updates',
      description: 'Get notified about new features and updates',
      enabled: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(
      settings.map((setting) => 
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div>
                <Label htmlFor={setting.id} className="font-medium">
                  {setting.title}
                </Label>
                <p className="text-sm text-gray-500">{setting.description}</p>
              </div>
              <Switch 
                id={setting.id} 
                checked={setting.enabled} 
                onCheckedChange={() => toggleSetting(setting.id)}
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={saveSettings}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSection;
