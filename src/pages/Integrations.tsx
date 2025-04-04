
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Integrations = () => {
  const activeIntegrations = [
    {
      id: 1,
      name: 'Google Workspace',
      description: 'Connect your Google Workspace account to sync emails, calendar, and contacts.',
      category: 'Productivity',
      status: 'Active',
      image: '🌐'
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Receive notifications and updates from your team in real-time.',
      category: 'Communication',
      status: 'Active',
      image: '💬'
    },
    {
      id: 3,
      name: 'Stripe',
      description: 'Process payments and manage subscriptions securely.',
      category: 'Payments',
      status: 'Active',
      image: '💳'
    }
  ];
  
  const availableIntegrations = [
    {
      id: 4,
      name: 'Zoom',
      description: 'Schedule and join meetings directly from the platform.',
      category: 'Communication',
      image: '📹'
    },
    {
      id: 5,
      name: 'Dropbox',
      description: 'Sync files and documents with your Dropbox account.',
      category: 'Storage',
      image: '📁'
    },
    {
      id: 6,
      name: 'Salesforce',
      description: 'Connect your CRM to manage customer relationships.',
      category: 'CRM',
      image: '📊'
    },
    {
      id: 7,
      name: 'HubSpot',
      description: 'Manage marketing, sales, and customer service in one place.',
      category: 'Marketing',
      image: '📣'
    },
    {
      id: 8,
      name: 'GitHub',
      description: 'Integrate code repositories and manage development workflows.',
      category: 'Development',
      image: '💻'
    },
    {
      id: 9,
      name: 'Trello',
      description: 'Organize projects and track progress with boards and cards.',
      category: 'Project Management',
      image: '📝'
    }
  ];

  const allCategories = [...new Set([
    ...activeIntegrations.map(i => i.category),
    ...availableIntegrations.map(i => i.category)
  ])];

  return (
    <DashboardLayout title="Integrations">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Integrate Your Workflow</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Browse Integrations
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search integrations..." className="pl-9" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="max-w-[85vw] overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {allCategories.map(category => (
            <TabsTrigger key={category} value={category.toLowerCase()}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="all">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Active Integrations</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {activeIntegrations.map(integration => (
                  <Card key={integration.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{integration.image}</div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <CardDescription className="text-xs">{integration.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                      <div className="flex justify-between items-center">
                        <Badge className="bg-green-100 text-green-800">Connected</Badge>
                        <Button variant="outline" size="sm">Settings</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Available Integrations</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableIntegrations.map(integration => (
                  <Card key={integration.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{integration.image}</div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <CardDescription className="text-xs">{integration.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                      <Button size="sm" className="w-full">Connect</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        {allCategories.map(category => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...activeIntegrations, ...availableIntegrations]
                  .filter(i => i.category === category)
                  .map(integration => (
                    <Card key={integration.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{integration.image}</div>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <CardDescription className="text-xs">{integration.category}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                        {'status' in integration ? (
                          <div className="flex justify-between items-center">
                            <Badge className="bg-green-100 text-green-800">Connected</Badge>
                            <Button variant="outline" size="sm">Settings</Button>
                          </div>
                        ) : (
                          <Button size="sm" className="w-full">Connect</Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
};

export default Integrations;
