
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

const SecuritySection: React.FC = () => {
  const [email, setEmail] = useState('brian.freedm@example.com');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [supportAccessEnabled, setSupportAccessEnabled] = useState(true);

  return (
    <div>
      <div className="settings-card">
        <h2 className="text-lg font-semibold mb-6">Account Security</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Button variant="link" size="sm" className="h-auto p-0">
                Change email
              </Button>
            </div>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Button variant="link" size="sm" className="h-auto p-0">
                Change password
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              value="••••••••"
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">2-Step Verification</h3>
                <p className="text-sm text-gray-500">
                  Add an additional layer of security to your account during login.
                </p>
              </div>
              <Switch 
                checked={twoFactorEnabled} 
                onCheckedChange={setTwoFactorEnabled} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-card">
        <h2 className="text-lg font-semibold mb-6">Support Access</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Support access</h3>
              <p className="text-sm text-gray-500">
                You have granted us access to your account for support purposes until Aug 31, 2023, 9:40 PM.
              </p>
            </div>
            <Switch 
              checked={supportAccessEnabled} 
              onCheckedChange={setSupportAccessEnabled} 
            />
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Log out of all devices</h3>
                <p className="text-sm text-gray-500">
                  Log out of all other active sessions on other devices besides this one.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Log out
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-red-600">Delete my account</h3>
                <p className="text-sm text-gray-500">
                  Permanently delete the account and remove access from all workspaces.
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:border-red-200">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;
