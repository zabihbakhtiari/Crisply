
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Search, Filter, Mail, Phone, Star, Trash2, Edit, MoreHorizontal, User, UserCheck, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  status: string;
  tags: string[];
  favorite: boolean;
  avatar?: string;
}

const Contacts = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Inc.',
      position: 'Marketing Director',
      status: 'Customer',
      tags: ['Enterprise', 'Marketing'],
      favorite: true
    },
    {
      id: 2,
      firstName: 'Jordan',
      lastName: 'Lee',
      email: 'jordan.lee@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Tech Solutions',
      position: 'CTO',
      status: 'Lead',
      tags: ['Tech', 'Executive'],
      favorite: false
    },
    {
      id: 3,
      firstName: 'Taylor',
      lastName: 'Smith',
      email: 'taylor.smith@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Retail',
      position: 'Sales Manager',
      status: 'Customer',
      tags: ['Retail', 'Sales'],
      favorite: false
    },
    {
      id: 4,
      firstName: 'Casey',
      lastName: 'Johnson',
      email: 'casey.johnson@example.com',
      phone: '+1 (555) 789-0123',
      company: 'Innovative Design',
      position: 'Product Designer',
      status: 'Prospect',
      tags: ['Design', 'Product'],
      favorite: true
    },
    {
      id: 5,
      firstName: 'Riley',
      lastName: 'Williams',
      email: 'riley.williams@example.com',
      phone: '+1 (555) 234-5678',
      company: 'Finance Pro',
      position: 'Financial Analyst',
      status: 'Lead',
      tags: ['Finance'],
      favorite: false
    }
  ]);
  
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    status: 'Lead'
  });
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setNewContact((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddContact = () => {
    if (!newContact.firstName.trim() || !newContact.lastName.trim() || !newContact.email.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields (Name and Email)",
        variant: "destructive"
      });
      return;
    }

    const newContactObject = {
      id: Date.now(),
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      email: newContact.email,
      phone: newContact.phone || '',
      company: newContact.company || '',
      position: newContact.position || '',
      status: newContact.status,
      tags: [],
      favorite: false
    };

    setContacts([...contacts, newContactObject]);
    setNewContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      status: 'Lead'
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Contact added",
      description: "New contact has been added successfully"
    });
  };

  const toggleFavorite = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id 
        ? { ...contact, favorite: !contact.favorite } 
        : contact
    ));
  };
  
  const handleContactSelect = (id: number) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
  };

  const deleteSelected = () => {
    setContacts(contacts.filter(contact => !selectedContacts.includes(contact.id)));
    toast({
      title: `${selectedContacts.length} contacts deleted`,
      description: "Selected contacts have been removed"
    });
    setSelectedContacts([]);
  };

  // Filter contacts based on search term and active tab
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'customers') {
      return matchesSearch && contact.status === 'Customer';
    } else if (activeTab === 'leads') {
      return matchesSearch && contact.status === 'Lead';
    } else if (activeTab === 'prospects') {
      return matchesSearch && contact.status === 'Prospect';
    } else if (activeTab === 'favorites') {
      return matchesSearch && contact.favorite;
    }
    
    return matchesSearch;
  });

  return (
    <DashboardLayout title="Contacts">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Contacts</h2>
        <div className="flex gap-2">
          {selectedContacts.length > 0 ? (
            <>
              <Button variant="destructive" size="sm" onClick={deleteSelected}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete Selected
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedContacts([])}>
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contacts</SelectItem>
              <SelectItem value="recent">Recently Added</SelectItem>
              <SelectItem value="company">Company</SelectItem>
              <SelectItem value="tags">Tags</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <Checkbox
                      checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Company</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Tags</th>
                  <th className="text-left py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-gray-500">
                      No contacts found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr key={contact.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={() => handleContactSelect(contact.id)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {contact.firstName.charAt(0) + contact.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                            <div className="text-xs text-gray-500">{contact.position}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">{contact.email}</div>
                        <div className="text-xs text-gray-500">{contact.phone}</div>
                      </td>
                      <td className="py-3 px-4">{contact.company}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={
                          contact.status === 'Customer' ? 'bg-green-50 text-green-700 border-green-200' :
                          contact.status === 'Lead' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }>
                          {contact.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end items-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => toggleFavorite(contact.id)}
                            className={contact.favorite ? "text-yellow-400" : "text-gray-400"}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" /> Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" /> Call
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Add contact information to your address book.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  value={newContact.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  value={newContact.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={newContact.email}
                onChange={handleInputChange}
                placeholder="Email address"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone"
                value={newContact.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  name="company"
                  value={newContact.company}
                  onChange={handleInputChange}
                  placeholder="Company name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position">Position</Label>
                <Input 
                  id="position" 
                  name="position"
                  value={newContact.position}
                  onChange={handleInputChange}
                  placeholder="Job title"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newContact.status} 
                onValueChange={(value) => handleSelectChange(value, 'status')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddContact}>Add Contact</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Contacts;
