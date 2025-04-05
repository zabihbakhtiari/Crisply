
import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { CheckCircle, Circle, Clock, Plus, Archive, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  priority: string;
  project: string;
}

const Tasks = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);
  
  const [newTask, setNewTask] = useState({
    title: '',
    dueDate: '',
    priority: 'Medium',
    project: ''
  });
  
  const { toast } = useToast();

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

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Task title required",
        description: "Please add a title for your task",
        variant: "destructive"
      });
      return;
    }

    const currentDate = new Date();
    const dueDate = newTask.dueDate ? newTask.dueDate : 'Today';

    const newTaskObject = {
      id: Date.now(),
      title: newTask.title,
      completed: false,
      dueDate: dueDate,
      priority: newTask.priority,
      project: newTask.project || 'General'
    };

    setTasks([newTaskObject, ...tasks]);
    setNewTask({ title: '', dueDate: '', priority: 'Medium', project: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Task created",
      description: "Your task has been added successfully"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setNewTask((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, dueDate: !task.completed ? 'Completed' : 'Today' } 
        : task
    ));
    
    toast({
      title: "Task updated",
      description: "Task status has been updated"
    });
  };

  const inProgressTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const dueTodayTasks = tasks.filter(task => !task.completed && task.dueDate === 'Today').length;

  return (
    <DashboardLayout title="Tasks">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Tasks</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
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
            <span className="text-2xl font-bold">{dueTodayTasks}</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <Circle className="mr-2 h-4 w-4" /> In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{inProgressTasks}</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <CheckCircle className="mr-2 h-4 w-4" /> Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-bold">{completedTasks}</span>
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
                      <CheckCircle className="h-5 w-5 text-green-500 cursor-pointer" onClick={() => toggleTaskStatus(task.id)} />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-300 cursor-pointer" onClick={() => toggleTaskStatus(task.id)} />
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
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Archive size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Add information to create a new task.
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
                value={newTask.title}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="Task title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input 
                id="dueDate" 
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="e.g. Today, Tomorrow, Apr 15"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select 
                value={newTask.priority} 
                onValueChange={(value) => handleSelectChange(value, 'priority')}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project" className="text-right">
                Project
              </Label>
              <Input 
                id="project" 
                name="project"
                value={newTask.project}
                onChange={handleInputChange}
                className="col-span-3" 
                placeholder="e.g. Marketing, Development"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateTask}>Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Tasks;
