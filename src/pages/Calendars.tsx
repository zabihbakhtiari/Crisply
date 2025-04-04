
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';

const Calendars = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample events data
  const events = [
    { 
      id: 1, 
      title: 'Team Meeting', 
      time: '09:00 - 10:00', 
      location: 'Conference Room A',
      date: new Date(2025, 3, 4), // April 4, 2025
      attendees: 8,
      type: 'meeting'
    },
    { 
      id: 2, 
      title: 'Project Review', 
      time: '11:30 - 12:30', 
      location: 'Zoom Call',
      date: new Date(2025, 3, 4), // April 4, 2025
      attendees: 5,
      type: 'review'
    },
    { 
      id: 3, 
      title: 'Lunch with Client', 
      time: '13:00 - 14:30', 
      location: 'Downtown Cafe',
      date: new Date(2025, 3, 6), // April 6, 2025
      attendees: 2,
      type: 'external'
    },
    { 
      id: 4, 
      title: 'Marketing Strategy Session', 
      time: '15:00 - 16:00', 
      location: 'Meeting Room B',
      date: new Date(2025, 3, 8), // April 8, 2025
      attendees: 6,
      type: 'planning'
    }
  ];

  // Filter events for today
  const today = new Date();
  const todayEvents = events.filter(event => 
    event.date.getDate() === today.getDate() &&
    event.date.getMonth() === today.getMonth() &&
    event.date.getFullYear() === today.getFullYear()
  );

  // Get event type color
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'external': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout title="Calendar">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Calendar</h2>
        <Button>Create Event</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            {todayEvents.length > 0 ? (
              <div className="space-y-4">
                {todayEvents.map(event => (
                  <div key={event.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{event.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm flex gap-2 items-center">
                        <span className="text-gray-500">⏰</span>
                        {event.time}
                      </p>
                      <p className="text-sm flex gap-2 items-center">
                        <span className="text-gray-500">📍</span>
                        {event.location}
                      </p>
                      <p className="text-sm flex gap-2 items-center">
                        <span className="text-gray-500">👥</span>
                        {event.attendees} attendees
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No events scheduled for today</p>
                <Button variant="outline" className="mt-4">Add Event</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {events.map(event => (
              <div key={event.id} className="flex justify-between items-center p-3 border-b last:border-0">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">
                    {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}, {event.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Calendars;
