
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Bell, 
  FileText, 
  Clipboard, 
  Mail, 
  Calendar, 
  BarChart, 
  Users, 
  Building, 
  Box, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const mainMenuItems = [
    { name: 'Dashboard', icon: <BarChart2 size={20} />, path: '/' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/notifications' },
    { name: 'Notes', icon: <FileText size={20} />, path: '/notes' },
    { name: 'Tasks', icon: <Clipboard size={20} />, path: '/tasks' },
    { name: 'Emails', icon: <Mail size={20} />, path: '/emails' },
    { name: 'Calendars', icon: <Calendar size={20} />, path: '/calendars' },
  ];

  const databaseMenuItems = [
    { name: 'Analytics', icon: <BarChart size={20} />, path: '/analytics' },
    { name: 'Contacts', icon: <Users size={20} />, path: '/contacts' },
    { name: 'Companies', icon: <Building size={20} />, path: '/companies' },
    { name: 'Integrations', icon: <Box size={20} />, path: '/integrations' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside 
      className={`h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[var(--sidebar-width-collapsed)]' : 'w-[var(--sidebar-width)]'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          {!collapsed && <span className="font-bold text-lg text-sidebar-foreground">Crisply</span>}
          {collapsed && <span className="font-bold text-lg text-sidebar-foreground">C</span>}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="mt-2">
        {mainMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-6 border-t border-sidebar-border pt-4">
        {!collapsed && <p className="px-4 py-1 text-xs font-medium uppercase text-sidebar-foreground/60">Database</p>}
        {databaseMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md flex items-center justify-center bg-sidebar-accent text-sidebar-accent-foreground">
            M
          </div>
          {!collapsed && <span className="ml-3 text-sm font-medium text-sidebar-foreground">Marketing Team's</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
