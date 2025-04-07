
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Activity, Users, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChartComponent } from '@/components/BarChartComponent';
import { LineChartComponent } from '@/components/LineChartComponent';
import { PieChartComponent } from '@/components/PieChartComponent';
import { TaskTrackingChart } from '@/components/TaskTrackingChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Calendar, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, LineChart as RechartLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RechartBar, Bar } from 'recharts';

const analyticsData = [
  { name: 'Jan', users: 400, sessions: 240, pageviews: 800 },
  { name: 'Feb', users: 300, sessions: 139, pageviews: 500 },
  { name: 'Mar', users: 200, sessions: 980, pageviews: 1200 },
  { name: 'Apr', users: 278, sessions: 390, pageviews: 900 },
  { name: 'May', users: 189, sessions: 480, pageviews: 1000 },
  { name: 'Jun', users: 239, sessions: 380, pageviews: 1100 },
  { name: 'Jul', users: 349, sessions: 430, pageviews: 1300 },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = React.useState('7d');
  
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
          <Card key={index} className="dark:bg-card dark:border-border">
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
      
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-semibold">Performance Metrics</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] dark:bg-card dark:border-border">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="dark:bg-card dark:border-border">
              <SelectItem value="1d">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="1m">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="dark:bg-card dark:border-border dark:hover:bg-accent">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="dark:bg-card dark:border-border dark:hover:bg-accent">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="dark:bg-card dark:border-border dark:hover:bg-accent">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList className="mb-4 dark:bg-card dark:border dark:border-border">
          <TabsTrigger value="overview" className="dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
          <TabsTrigger value="traffic" className="dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground">Traffic</TabsTrigger>
          <TabsTrigger value="engagement" className="dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground">Engagement</TabsTrigger>
          <TabsTrigger value="conversions" className="dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground">Conversions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="dark:bg-card dark:border-border">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User metrics over the selected time period</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartLine
                  data={analyticsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--foreground)" 
                    tick={{ fill: "var(--muted-foreground)" }}
                  />
                  <YAxis 
                    stroke="var(--foreground)" 
                    tick={{ fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)"
                    }}
                    itemStyle={{ color: "var(--foreground)" }}
                    labelStyle={{ color: "var(--foreground)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--chart-1)" 
                    strokeWidth={2} 
                    dot={{ fill: "var(--chart-1)" }}
                    activeDot={{ r: 6, fill: "var(--chart-1)" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="var(--chart-2)" 
                    strokeWidth={2} 
                    dot={{ fill: "var(--chart-2)" }}
                    activeDot={{ r: 6, fill: "var(--chart-2)" }}
                  />
                </RechartLine>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="dark:bg-card dark:border-border">
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: '/dashboard', views: 3245, percent: 24 },
                    { page: '/products', views: 2437, percent: 18 },
                    { page: '/blog/getting-started', views: 1892, percent: 14 },
                    { page: '/pricing', views: 1654, percent: 12 },
                    { page: '/about', views: 1298, percent: 10 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{item.page}</div>
                        <div className="text-sm text-muted-foreground">{item.views.toLocaleString()} views</div>
                      </div>
                      <div className="text-sm font-medium">{item.percent}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark:bg-card dark:border-border">
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Total page views per month</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBar
                    data={analyticsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--foreground)" 
                      tick={{ fill: "var(--muted-foreground)" }}
                    />
                    <YAxis 
                      stroke="var(--foreground)" 
                      tick={{ fill: "var(--muted-foreground)" }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        color: "var(--foreground)"
                      }}
                      itemStyle={{ color: "var(--foreground)" }}
                      labelStyle={{ color: "var(--foreground)" }}
                    />
                    <Bar 
                      dataKey="pageviews" 
                      fill="var(--chart-3)"
                      radius={[4, 4, 0, 0]}
                    />
                  </RechartBar>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic" className="space-y-4">
          <Card className="dark:bg-card dark:border-border">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Traffic sources data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card className="dark:bg-card dark:border-border">
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Engagement data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversions" className="space-y-4">
          <Card className="dark:bg-card dark:border-border">
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Conversion data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChartComponent />
        <TaskTrackingChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartComponent />
        <BarChartComponent />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
