
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Search, Filter, MoreHorizontal, Phone, Mail, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Contacts = () => {
  const contacts = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      phone: '+1 (555) 123-4567',
      title: 'Marketing Director',
      company: 'Acme Inc.',
      favorite: true,
      avatar: null
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 234-5678',
      title: 'Product Manager',
      company: 'TechCorp',
      favorite: false,
      avatar: null
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 (555) 345-6789',
      title: 'Sales Representative',
      company: 'Global Sales Inc.',
      favorite: true,
      avatar: null
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 456-7890',
      title: 'UX Designer',
      company: 'DesignWorks',
      favorite: false,
      avatar: null
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      title: 'Software Engineer',
      company: 'CodeTech',
      favorite: false,
      avatar: null
    },
    {
      id: 6,
      name: 'Jennifer Taylor',
      email: 'jennifer@example.com',
      phone: '+1 (555) 678-9012',
      title: 'HR Manager',
      company: 'People First',
      favorite: true,
      avatar: null
    }
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <DashboardLayout title="Contacts">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Contact Management</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search contacts..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Contacts ({contacts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 bg-muted/50 font-medium text-sm">
              <div className="col-span-2">Name</div>
              <div className="hidden md:block">Company</div>
              <div className="hidden md:block">Title</div>
              <div>Contact</div>
              <div className="text-right">Actions</div>
            </div>
            <div className="divide-y">
              {contacts.map(contact => (
                <div key={contact.id} className="grid grid-cols-6 p-4 items-center">
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={contact.avatar ?? undefined} />
                      <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium flex items-center">
                        {contact.name}
                        {contact.favorite && (
                          <Star className="ml-1 h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500 hidden sm:block">{contact.email}</div>
                    </div>
                  </div>
                  <div className="hidden md:block text-sm text-gray-500">{contact.company}</div>
                  <div className="hidden md:block text-sm text-gray-500">{contact.title}</div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail size={16} />
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Contacts;
