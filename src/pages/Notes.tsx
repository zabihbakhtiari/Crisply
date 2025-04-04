
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Notes = () => {
  const notes = [
    {
      id: 1,
      title: 'Marketing Strategy',
      content: 'Focus on SEO optimization and social media campaigns for Q2.',
      date: 'Apr 2, 2025',
      category: 'Marketing'
    },
    {
      id: 2,
      title: 'Project Timeline',
      content: 'Website redesign: wireframes by April 15, design by April 30, development starts May 1.',
      date: 'Apr 1, 2025',
      category: 'Project'
    },
    {
      id: 3,
      title: 'Meeting Notes',
      content: 'Discussed budget allocation for Q2. Need to follow up with finance team about marketing expenses.',
      date: 'Mar 28, 2025',
      category: 'Meetings'
    },
    {
      id: 4,
      title: 'Product Feedback',
      content: 'Users requesting better mobile experience and faster load times. Add to next sprint.',
      date: 'Mar 25, 2025',
      category: 'Product'
    },
    {
      id: 5,
      title: 'Ideas',
      content: 'Consider implementing a customer loyalty program to increase retention rates.',
      date: 'Mar 20, 2025',
      category: 'Ideas'
    }
  ];

  return (
    <DashboardLayout title="Notes">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Notes</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search notes..." className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Card key={note.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{note.title}</CardTitle>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{note.category}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-600 line-clamp-3">{note.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-xs text-gray-500 pt-2 border-t">
              <span>{note.date}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">Open</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Notes;
