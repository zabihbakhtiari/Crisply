
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useWorkspaceSettings } from '@/hooks/use-workspace-settings';

const WorkspaceGeneralSection: React.FC = () => {
  const { toast } = useToast();
  const { workspaceSettings, loading, updateWorkspaceSettings } = useWorkspaceSettings();
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceUrl, setWorkspaceUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (workspaceSettings) {
      setWorkspaceName(workspaceSettings.workspace_name);
      setWorkspaceUrl(workspaceSettings.workspace_url);
    }
  }, [workspaceSettings]);

  const handleSave = async () => {
    setSaving(true);
    
    try {
      await updateWorkspaceSettings({
        workspace_name: workspaceName,
        workspace_url: workspaceUrl,
      });
    } catch (error) {
      console.error('Error saving workspace settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
          <CardDescription>Loading your workspace settings...</CardDescription>
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
