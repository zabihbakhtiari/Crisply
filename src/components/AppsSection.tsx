
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Globe, MessageSquare, Bell, GitBranch, Github } from 'lucide-react';

interface AppIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
}

const AppsSection: React.FC = () => {
  const [integrations, setIntegrations] = React.useState<AppIntegration[]>([
    {
      id: '1',
      name: 'GitHub',
      description: 'Connect your GitHub account to sync repositories',
      icon: <Github className="h-8 w-8" />,
      connected: true,
    },
    {
      id: '2',
      name: 'Slack',
      description: 'Get notifications from your workspace',
      icon: <MessageSquare className="h-8 w-8" />,
      connected: false,
    },
    {
      id: '3',
      name: 'GitLab',
      description: 'Connect your GitLab account to sync repositories',
      icon: <GitBranch className="h-8 w-8" />,
      connected: false,
    },
    {
      id: '4',
      name: 'Google',
      description: 'Connect for calendar and drive integrations',
      icon: <Globe className="h-8 w-8" />,
      connected: true,
    },
  ]);

  const toggleConnection = (id: string) => {
    setIntegrations(
      integrations.map((app) => 
        app.id === id ? { ...app, connected: !app.connected } : app
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Apps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {integrations.map((app) => (
            <div key={app.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-md dark:bg-gray-800">
                  {app.icon}
                </div>
                <div>
                  <h3 className="font-medium">{app.name}</h3>
                  <p className="text-sm text-gray-500">{app.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={app.connected} 
                  onCheckedChange={() => toggleConnection(app.id)} 
                  id={`app-${app.id}`} 
                />
                <Button variant="outline" size="sm">
                  {app.connected ? 'Configure' : 'Connect'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppsSection;
