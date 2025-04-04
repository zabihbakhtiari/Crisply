
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Search, Filter, MoreHorizontal, MapPin, Globe, Users } from 'lucide-react';

const Companies = () => {
  const companies = [
    {
      id: 1,
      name: 'Acme Corporation',
      industry: 'Technology',
      location: 'San Francisco, CA',
      employees: '100-250',
      website: 'acme.com',
      status: 'Client',
      revenue: '$10M+'
    },
    {
      id: 2,
      name: 'TechNova',
      industry: 'Software',
      location: 'Austin, TX',
      employees: '50-100',
      website: 'technova.io',
      status: 'Lead',
      revenue: '$5-10M'
    },
    {
      id: 3,
      name: 'Global Dynamics',
      industry: 'Manufacturing',
      location: 'Chicago, IL',
      employees: '500+',
      website: 'globaldynamics.com',
      status: 'Client',
      revenue: '$50M+'
    },
    {
      id: 4,
      name: 'Prestige Consulting',
      industry: 'Business Services',
      location: 'New York, NY',
      employees: '25-50',
      website: 'prestigeconsulting.com',
      status: 'Prospect',
      revenue: '$1-5M'
    },
    {
      id: 5,
      name: 'InnovateX',
      industry: 'Technology',
      location: 'Seattle, WA',
      employees: '100-250',
      website: 'innovatex.tech',
      status: 'Lead',
      revenue: '$10-25M'
    },
    {
      id: 6,
      name: 'Summit Industries',
      industry: 'Manufacturing',
      location: 'Detroit, MI',
      employees: '250-500',
      website: 'summitind.com',
      status: 'Client',
      revenue: '$25-50M'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Client': return 'bg-green-100 text-green-800';
      case 'Lead': return 'bg-blue-100 text-blue-800';
      case 'Prospect': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Companies">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Company Management</h2>
        <Button>
          <Building className="mr-2 h-4 w-4" /> Add Company
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search companies..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">Export</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map(company => (
          <Card key={company.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <div className="bg-gray-100 rounded-md p-1">
                    <Building className="h-4 w-4" />
                  </div>
                  {company.name}
                </CardTitle>
                <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Location</p>
                    <p className="text-gray-500">{company.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Company Size</p>
                    <p className="text-gray-500">{company.employees} employees</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700">Website</p>
                    <p className="text-gray-500">{company.website}</p>
                  </div>
                </div>
                
                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500">Industry: </span>
                    <span className="text-xs font-medium">{company.industry}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Companies;
