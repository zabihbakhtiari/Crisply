
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Search, Filter, Building, Users, Globe, MapPin, Phone, Mail, ExternalLink, MoreHorizontal, Trash2, Edit, Building2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Company {
  id: number;
  name: string;
  industry: string;
  website: string;
  location: string;
  employees: string;
  phone: string;
  email: string;
  status: string;
  description: string;
  logoUrl?: string;
}

const Companies = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: 'Acme Corporation',
      industry: 'Technology',
      website: 'acmecorp.com',
      location: 'San Francisco, CA',
      employees: '1000-5000',
      phone: '+1 (555) 123-4567',
      email: 'info@acmecorp.com',
      status: 'Customer',
      description: 'A leading technology company specializing in innovative software solutions for enterprise clients.'
    },
    {
      id: 2,
      name: 'Globex Industries',
      industry: 'Manufacturing',
      website: 'globex-ind.com',
      location: 'Chicago, IL',
      employees: '5000+',
      phone: '+1 (555) 987-6543',
      email: 'contact@globex-ind.com',
      status: 'Lead',
      description: 'Global manufacturing company with operations in 15 countries, focusing on sustainable production practices.'
    },
    {
      id: 3,
      name: 'Oceanic Airlines',
      industry: 'Travel',
      website: 'oceanic-air.com',
      location: 'Los Angeles, CA',
      employees: '10000+',
      phone: '+1 (555) 456-7890',
      email: 'reservations@oceanic-air.com',
      status: 'Customer',
      description: 'International airline with routes connecting major cities worldwide.'
    },
    {
      id: 4,
      name: 'Sterling Cooper',
      industry: 'Marketing',
      website: 'sterlingcooper.com',
      location: 'New York, NY',
      employees: '50-200',
      phone: '+1 (555) 789-0123',
      email: 'info@sterlingcooper.com',
      status: 'Prospect',
      description: 'Award-winning advertising and marketing agency specializing in brand development and creative campaigns.'
    },
    {
      id: 5,
      name: 'Initech',
      industry: 'Software',
      website: 'initech.com',
      location: 'Austin, TX',
      employees: '200-500',
      phone: '+1 (555) 234-5678',
      email: 'support@initech.com',
      status: 'Lead',
      description: 'Software development company focused on business process automation and efficiency solutions.'
    }
  ]);
  
  const [newCompany, setNewCompany] = useState({
    name: '',
    industry: '',
    website: '',
    location: '',
    employees: '',
    phone: '',
    email: '',
    status: 'Lead',
    description: ''
  });
  
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCompany((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setNewCompany((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCompany = () => {
    if (!newCompany.name.trim()) {
      toast({
        title: "Company name required",
        description: "Please add a name for the company",
        variant: "destructive"
      });
      return;
    }

    const newCompanyObject = {
      id: Date.now(),
      name: newCompany.name,
      industry: newCompany.industry || 'Other',
      website: newCompany.website || '',
      location: newCompany.location || '',
      employees: newCompany.employees || 'Unknown',
      phone: newCompany.phone || '',
      email: newCompany.email || '',
      status: newCompany.status,
      description: newCompany.description || ''
    };

    setCompanies([...companies, newCompanyObject]);
    setNewCompany({
      name: '',
      industry: '',
      website: '',
      location: '',
      employees: '',
      phone: '',
      email: '',
      status: 'Lead',
      description: ''
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Company added",
      description: "New company has been added successfully"
    });
  };

  const deleteCompany = (id: number) => {
    setCompanies(companies.filter(company => company.id !== id));
    if (selectedCompanyId === id) {
      setSelectedCompanyId(null);
    }
    toast({
      title: "Company deleted",
      description: "Company has been removed successfully"
    });
  };

  // Filter companies based on search term and active tab
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'customers') {
      return matchesSearch && company.status === 'Customer';
    } else if (activeTab === 'leads') {
      return matchesSearch && company.status === 'Lead';
    } else if (activeTab === 'prospects') {
      return matchesSearch && company.status === 'Prospect';
    }
    
    return matchesSearch;
  });

  const selectedCompany = selectedCompanyId ? companies.find(company => company.id === selectedCompanyId) : null;

  return (
    <DashboardLayout title="Companies">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Companies</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search companies..." 
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
              <SelectItem value="all">All Industries</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
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
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Company</th>
                      <th className="text-left py-3 px-4">Industry</th>
                      <th className="text-left py-3 px-4">Location</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-10 text-gray-500">
                          No companies found. Try adjusting your search or filters.
                        </td>
                      </tr>
                    ) : (
                      filteredCompanies.map((company) => (
                        <tr 
                          key={company.id} 
                          className={`border-b hover:bg-gray-50 cursor-pointer ${selectedCompanyId === company.id ? 'bg-gray-50' : ''}`}
                          onClick={() => setSelectedCompanyId(company.id)}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
                                <Building className="h-4 w-4 text-gray-500" />
                              </div>
                              <div>
                                <div className="font-medium">{company.name}</div>
                                <div className="text-xs text-gray-500">{company.website}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{company.industry}</td>
                          <td className="py-3 px-4">{company.location}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className={
                              company.status === 'Customer' ? 'bg-green-50 text-green-700 border-green-200' :
                              company.status === 'Lead' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-yellow-50 text-yellow-700 border-yellow-200'
                            }>
                              {company.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
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
                                    <Mail className="mr-2 h-4 w-4" /> Contact
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Users className="mr-2 h-4 w-4" /> View Contacts
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteCompany(company.id);
                                    }}
                                  >
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
        </div>
        
        <div>
          {selectedCompany ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedCompany.name}</CardTitle>
                    <CardDescription>{selectedCompany.industry}</CardDescription>
                  </div>
                  <Badge variant="outline" className={
                    selectedCompany.status === 'Customer' ? 'bg-green-50 text-green-700 border-green-200' :
                    selectedCompany.status === 'Lead' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-yellow-50 text-yellow-700 border-yellow-200'
                  }>
                    {selectedCompany.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                      <p className="text-sm">{selectedCompany.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a href={`https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedCompany.website}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{selectedCompany.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedCompany.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${selectedCompany.email}`} className="text-blue-600 hover:underline">
                          {selectedCompany.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{selectedCompany.employees} employees</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Associated Contacts</h3>
                      <div className="text-sm text-gray-500 italic">No contacts associated yet.</div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Recent Activities</h3>
                      <div className="space-y-2">
                        <div className="text-xs text-gray-500">
                          <span className="text-gray-700 font-medium">Today</span> - Company added to the database
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => deleteCompany(selectedCompany.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-10 flex flex-col items-center justify-center text-center">
                <Building2 className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No company selected</h3>
                <p className="text-gray-500 mb-4">Select a company from the list to view details</p>
                <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Company
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Company</DialogTitle>
            <DialogDescription>
              Add company information to your database.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input 
                id="name" 
                name="name"
                value={newCompany.name}
                onChange={handleInputChange}
                placeholder="Company name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="industry">Industry</Label>
                <Input 
                  id="industry" 
                  name="industry"
                  value={newCompany.industry}
                  onChange={handleInputChange}
                  placeholder="e.g., Technology, Retail"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  name="website"
                  value={newCompany.website}
                  onChange={handleInputChange}
                  placeholder="e.g., example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location"
                  value={newCompany.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="employees">Size</Label>
                <Select 
                  value={newCompany.employees} 
                  onValueChange={(value) => handleSelectChange(value, 'employees')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  value={newCompany.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email"
                  value={newCompany.email}
                  onChange={handleInputChange}
                  placeholder="Contact email"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newCompany.status} 
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
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                name="description"
                value={newCompany.description}
                onChange={handleInputChange}
                placeholder="Brief description of the company"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCompany}>Add Company</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Companies;
