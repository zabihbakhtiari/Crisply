
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfileSection: React.FC = () => {
  const [firstName, setFirstName] = useState('Brian');
  const [lastName, setLastName] = useState('Freedom');

  return (
    <div className="settings-card">
      <h2 className="text-lg font-semibold mb-6">My Profile</h2>
      
      <div className="flex items-center mb-6">
        <Avatar className="h-20 w-20 mr-4">
          <img src="https://github.com/shadcn.png" alt="Profile" />
        </Avatar>
        <div className="flex flex-col">
          <div className="flex gap-2 mb-2">
            <Button variant="outline" size="sm">
              Change Image
            </Button>
            <Button variant="outline" size="sm">
              Remove Image
            </Button>
          </div>
          <p className="text-sm text-gray-500">We support PNGs, JPEGs and GIFs under 2MB</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
