
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Star, StarOff, Paperclip, Archive, Trash2, User, Plus, Send, Paperclip as AttachmentIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Email {
  id: number;
  sender: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  starred: boolean;
  hasAttachments: boolean;
}

const Emails = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      sender: 'Alice Johnson',
      email: 'alice@example.com',
      subject: 'Weekly Team Update',
      preview: 'Here are the updates for this week. We have made progress on the following items...',
      time: '10:30 AM',
      read: false,
      starred: true,
      hasAttachments: true
    },
    {
      id: 2,
      sender: 'Bob Smith',
      email: 'bob@example.com',
      subject: 'Project Timeline Update',
      preview: 'I wanted to share the updated timeline for our current project. The new deadline is...',
      time: '9:15 AM',
      read: false,
      starred: false,
      hasAttachments: false
    },
    {
      id: 3,
      sender: 'Marketing Team',
      email: 'marketing@example.com',
      subject: 'Social Media Campaign Draft',
      preview: 'Please review the attached draft for our upcoming social media campaign...',
      time: 'Yesterday',
      read: true,
      starred: true,
      hasAttachments: true
    },
    {
      id: 4,
      sender: 'HR Department',
      email: 'hr@example.com',
      subject: 'Upcoming Training Sessions',
      preview: 'We have scheduled several training sessions for the team next month...',
      time: 'Yesterday',
      read: true,
      starred: false,
      hasAttachments: false
    },
    {
      id: 5,
      sender: 'Sarah Williams',
      email: 'sarah@example.com',
      subject: 'Client Meeting Notes',
      preview: 'Attached are the notes from our meeting with the client yesterday. Key points to follow up on...',
      time: 'Apr 2',
      read: true,
      starred: false,
      hasAttachments: true
    }
  ]);

  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleComposeEmail = () => {
    if (!newEmail.to.trim()) {
      toast({
        title: "Recipient required",
        description: "Please specify a recipient for your email",
        variant: "destructive"
      });
      return;
    }

    if (!newEmail.subject.trim()) {
      toast({
        title: "Subject required",
        description: "Please add a subject for your email",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending an email
    toast({
      title: "Email sent",
      description: "Your email has been sent successfully"
    });

    setNewEmail({ to: '', subject: '', message: '' });
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEmail((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleStarred = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id 
        ? { ...email, starred: !email.starred } 
        : email
    ));
  };

  const markAsRead = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id 
        ? { ...email, read: true } 
        : email
    ));
  };

  return (
    <DashboardLayout title="Emails">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Inbox</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Compose
        </Button>
      </div>
      
      <div className="flex gap-4">
        <div className="w-64 hidden md:block">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  Inbox <span className="ml-auto bg-blue-100 text-blue-800 px-2 rounded-full text-xs">2</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">Sent</Button>
                <Button variant="ghost" className="w-full justify-start">Drafts</Button>
                <Button variant="ghost" className="w-full justify-start">Starred</Button>
                <Button variant="ghost" className="w-full justify-start">Archive</Button>
                <Button variant="ghost" className="w-full justify-start">Spam</Button>
                <Button variant="ghost" className="w-full justify-start">Trash</Button>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-medium mb-2">Labels</h3>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Work</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">Personal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Important</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Messages</CardTitle>
                <Input placeholder="Search emails..." className="max-w-xs" />
              </div>
            </CardHeader>
            <CardContent>
              {emails.map((email) => (
                <div 
                  key={email.id} 
                  className={`p-3 border-b ${!email.read ? 'bg-blue-50' : ''} hover:bg-gray-50 cursor-pointer`}
                  onClick={() => markAsRead(email.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={16} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className={`text-sm font-medium ${!email.read ? 'font-semibold' : ''}`}>
                          {email.sender}
                        </h3>
                        <span className="text-xs text-gray-500">{email.time}</span>
                      </div>
                      <p className="text-sm font-medium truncate">{email.subject}</p>
                      <p className="text-xs text-gray-500 truncate">{email.preview}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {email.hasAttachments && <Paperclip size={14} className="text-gray-400" />}
                      <div onClick={(e) => { e.stopPropagation(); toggleStarred(email.id); }}>
                        {email.starred ? (
                          <Star size={14} className="text-yellow-400" />
                        ) : (
                          <StarOff size={14} className="text-gray-400" />
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Archive size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Compose New Email</DialogTitle>
            <DialogDescription>
              Craft your message and send it to your recipients.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to" className="text-right">
                To
              </Label>
              <Input 
                id="to" 
                name="to"
                value={newEmail.to}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="recipient@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input 
                id="subject" 
                name="subject"
                value={newEmail.subject}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Email subject"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea 
                id="message" 
                name="message"
                value={newEmail.message}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Write your message here..."
                rows={8}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline">
              <AttachmentIcon className="mr-2 h-4 w-4" /> Attach
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleComposeEmail}>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Emails;
