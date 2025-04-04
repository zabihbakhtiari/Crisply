
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { CheckCircle, Circle, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Complete project proposal',
      completed: false,
      dueDate: 'Today',
      priority: 'High',
      project: 'Marketing'
    },
    {
      id: 2,
      title: 'Review design mockups',
      completed: false,
      dueDate: 'Tomorrow',
      priority: 'Medium',
      project: 'Website Redesign'
    },
    {
      id: 3,
      title: 'Schedule team meeting',
      completed: true,
      dueDate: 'Completed',
      priority: 'Low',
      project: 'Team Management'
    },
    {
      id: 4,
      title: 'Prepare monthly report',
      completed: false,
      dueDate: 'Apr 10',
      priority: 'Medium',
      project: 'Analytics'
    },
    {
      id: 5,
      title: 'Update documentation',
      completed: false,
      dueDate: 'Apr 12',
      priority: 'Low',
      project: 'Development'
    },
    {
      id: 6,
      title: 'Finalize budget for Q2',
      completed: true,
      dueDate: 'Completed',
      priority: 'High',
      project: 'Finance'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Medium':
        return 'text-orange-600 bg-orange-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <DashboardLayout title="Tasks">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      
      <div className="mb-6 flex gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Clock className="mr-2 h-4 w-4" /> Due Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">2</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Circle className="mr-2 h-4 w-4" /> In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">4</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" /> Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">2</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {tasks.map((task) => (
              <div key={task.id}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300" />
                    )}
                    <div>
                      <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</p>
                      <span className="text-xs text-gray-500">{task.project}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">{task.dueDate}</span>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Tasks;
