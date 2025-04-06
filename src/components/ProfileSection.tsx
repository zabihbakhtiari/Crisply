
import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProfileSection: React.FC = () => {
  const [firstName, setFirstName] = useState('Brian');
  const [lastName, setLastName] = useState('Freedom');
  const [email, setEmail] = useState('brian@example.com');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
          
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
