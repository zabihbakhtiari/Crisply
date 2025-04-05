
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Search, Check, X, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Integration {
  id: number;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  logoUrl: string;
}

const Integrations = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 1,
      name: 'Slack',
      description: 'Connect with your Slack workspace for team notifications.',
      category: 'Communication',
      connected: true,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/slack-226533.png'
    },
    {
      id: 2,
      name: 'Google Drive',
      description: 'Access and manage your documents from Google Drive.',
      category: 'Storage',
      connected: false,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/google-drive-2923656-2416658.png'
    },
    {
      id: 3,
      name: 'Dropbox',
      description: 'Sync your files with Dropbox for cloud storage.',
      category: 'Storage',
      connected: false,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/dropbox-173-569418.png'
    },
    {
      id: 4,
      name: 'GitHub',
      description: 'Integrate with your GitHub repositories for development.',
      category: 'Development',
      connected: true,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/github-153-675523.png'
    },
    {
      id: 5,
      name: 'Zapier',
      description: 'Automate workflows between your apps and services.',
      category: 'Automation',
      connected: false,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/zapier-3521475-2944919.png'
    },
    {
      id: 6,
      name: 'Trello',
      description: 'Manage your tasks and projects with Trello boards.',
      category: 'Project Management',
      connected: false,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/trello-226534.png'
    }
  ]);
  
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    apiKey: '',
    category: '',
    description: ''
  });
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIntegration((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddIntegration = () => {
    if (!newIntegration.name.trim()) {
      toast({
        title: "Integration name required",
        description: "Please add a name for your integration",
        variant: "destructive"
      });
      return;
    }

    const newIntegrationObject = {
      id: Date.now(),
      name: newIntegration.name,
      description: newIntegration.description || 'Custom integration',
      category: newIntegration.category || 'Other',
      connected: true,
      logoUrl: 'https://cdn.iconscout.com/icon/free/png-256/api-134-288388.png'
    };

    setIntegrations([...integrations, newIntegrationObject]);
    setNewIntegration({ name: '', apiKey: '', category: '', description: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Integration added",
      description: "Your integration has been configured successfully"
    });
  };

  const toggleConnection = (id: number) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, connected: !integration.connected } 
        : integration
    ));
    
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      toast({
        title: integration.connected ? "Integration disconnected" : "Integration connected",
        description: `${integration.name} has been ${integration.connected ? "disconnected" : "connected"} successfully`
      });
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const searchLower = searchTerm.toLowerCase();
    return (
      integration.name.toLowerCase().includes(searchLower) ||
      integration.description.toLowerCase().includes(searchLower) ||
      integration.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <DashboardLayout title="Integrations">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Connected Services</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Integration
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3 flex flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={integration.logoUrl} 
                  alt={integration.name} 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://cdn.iconscout.com/icon/free/png-256/api-134-288388.png';
                  }}
                />
              </div>
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  {integration.name}
                  {integration.connected && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      Connected
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-xs mt-1">{integration.category}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600">{integration.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t">
              <Button 
                variant={integration.connected ? "destructive" : "default"} 
                size="sm"
                onClick={() => toggleConnection(integration.id)}
              >
                {integration.connected ? (
                  <>
                    <X className="h-3 w-3 mr-1" /> Disconnect
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 mr-1" /> Connect
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-3 w-3 mr-1" /> Settings
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Integration</DialogTitle>
            <DialogDescription>
              Configure a new integration with your API keys.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Integration Name
              </Label>
              <Input 
                id="name" 
                name="name"
                value={newIntegration.name}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="e.g., Stripe, Custom API"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="apiKey" className="text-right">
                API Key
              </Label>
              <Input 
                id="apiKey" 
                name="apiKey"
                type="password"
                value={newIntegration.apiKey}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Your API key or token"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input 
                id="category" 
                name="category"
                value={newIntegration.category}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="e.g., Payment, Storage, Social"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input 
                id="description" 
                name="description"
                value={newIntegration.description}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Brief description of what this integration does"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddIntegration}>Add Integration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Integrations;
