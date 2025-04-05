import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Activity, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChartComponent } from '@/components/BarChartComponent';
import { LineChartComponent } from '@/components/LineChartComponent';
import { PieChartComponent } from '@/components/PieChartComponent';
import { TaskTrackingChart } from '@/components/TaskTrackingChart';

const Dashboard = () => {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$45,231.89', 
      change: '+20.1%', 
      trend: 'up',
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      description: 'from last month'
    },
    { 
      title: 'Subscriptions', 
      value: '+2350', 
      change: '+180.1%', 
      trend: 'up',
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: 'from last month'
    },
    { 
      title: 'Active Users', 
      value: '12,234', 
      change: '+19%', 
      trend: 'up',
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      description: 'from last month'
    },
    { 
      title: 'Conversion Rate', 
      value: '2.4%', 
      change: '-4.1%', 
      trend: 'down',
      icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
      description: 'from last month'
    }
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span className="ml-1">{stat.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              View your monthly analytics and stats
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center border-t pt-4">
            <div className="text-center text-muted-foreground">
              <BarChart className="mx-auto h-16 w-16 mb-2 opacity-50" />
              <p>Analytics charts would be displayed here</p>
              <Button variant="outline" className="mt-4">View detailed reports</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ul className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <li key={item} className="flex items-center gap-3 border-b pb-3 last:border-0">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                    <Activity size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <LineChartComponent />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Task Management</h2>
        <TaskTrackingChart />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Database Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <PieChartComponent />
          <Card>
            <CardHeader>
              <CardTitle>Database Overview</CardTitle>
              <CardDescription>
                Key metrics and performance indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Records</span>
                  <span className="font-medium">12,345</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <span className="font-medium">8,901</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="font-medium">45.2 GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Backup Status</span>
                  <span className="font-medium text-green-500">Up to date</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
