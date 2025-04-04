
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Plus, Search, Edit, Trash2, Tag, Pencil, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
}

const Notes = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([
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
  ]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleCreateNote = () => {
    if (!newNote.title.trim()) {
      toast({
        title: "Note title required",
        description: "Please add a title for your note",
        variant: "destructive"
      });
      return;
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });

    const newNoteObject = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      date: formattedDate,
      category: newNote.category || 'General'
    };

    setNotes([newNoteObject, ...notes]);
    setNewNote({ title: '', content: '', category: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Note created",
      description: "Your note has been added successfully"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewNote((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredNotes = notes.filter(note => {
    const searchLower = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(searchLower) ||
      note.content.toLowerCase().includes(searchLower) ||
      note.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <DashboardLayout title="Notes">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Notes</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search notes..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No notes found. Create a new note to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
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
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{note.date}</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Note</DialogTitle>
            <DialogDescription>
              Add information to create a new note.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input 
                id="title" 
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Note title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input 
                id="category" 
                name="category"
                value={newNote.category}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="e.g. Work, Personal, Ideas"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea 
                id="content" 
                name="content"
                value={newNote.content}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Write your note content here..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateNote}>Create Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Notes;
