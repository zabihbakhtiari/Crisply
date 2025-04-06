
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const WorkspaceGeneralSection: React.FC = () => {
  const { toast } = useToast();
  const [workspaceName, setWorkspaceName] = useState('My Workspace');
  const [workspaceUrl, setWorkspaceUrl] = useState('my-workspace');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your workspace settings have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Workspace Settings</CardTitle>
        <CardDescription>Manage your workspace name and URL</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace Name</Label>
          <Input 
            id="workspace-name" 
            value={workspaceName} 
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <p className="text-sm text-gray-500">This is the name that will be displayed throughout the application.</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="workspace-url">Workspace URL</Label>
          <div className="flex items-center">
            <span className="bg-gray-100 px-3 py-2 text-gray-500 border border-r-0 rounded-l-md">
              app.example.com/
            </span>
            <Input 
              id="workspace-url" 
              value={workspaceUrl} 
              onChange={(e) => setWorkspaceUrl(e.target.value)}
              className="rounded-l-none"
            />
          </div>
          <p className="text-sm text-gray-500">This is your workspace's unique URL.</p>
        </div>
      
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkspaceGeneralSection;
