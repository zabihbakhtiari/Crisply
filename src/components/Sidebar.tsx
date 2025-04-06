
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
  Search,
  User,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

// Add custom CSS variables to properly define sidebar width for responsive design
document.documentElement.style.setProperty('--sidebar-width', '240px');
document.documentElement.style.setProperty('--sidebar-width-collapsed', '64px');

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { activeSection, navigateToSection } = useSidebar();
  
  const mainMenuItems = [
    { name: 'Dashboard', icon: <BarChart2 size={20} />, path: '/' },
    { 
      name: 'Notifications', 
      icon: <Bell size={20} />, 
      path: '/notifications',
      section: 'notifications' as const
    },
    { name: 'Notes', icon: <FileText size={20} />, path: '/notes' },
    { name: 'Tasks', icon: <Clipboard size={20} />, path: '/tasks' },
    { 
      name: 'Emails', 
      icon: <Mail size={20} />, 
      path: '/emails',
      section: 'messages' as const
    },
    { name: 'Calendars', icon: <Calendar size={20} />, path: '/calendars' },
  ];

  const databaseMenuItems = [
    { name: 'Analytics', icon: <BarChart size={20} />, path: '/analytics' },
    { name: 'Contacts', icon: <Users size={20} />, path: '/contacts' },
    { name: 'Companies', icon: <Building size={20} />, path: '/companies' },
    { name: 'Integrations', icon: <Box size={20} />, path: '/integrations' },
    { 
      name: 'Settings', 
      icon: <Settings size={20} />, 
      path: '/settings',
      section: 'settings' as const
    },
  ];

  const helpMenuItems = [
    { 
      name: 'Help & Support', 
      icon: <HelpCircle size={20} />, 
      path: '/',
      section: 'help' as const
    },
    { 
      name: 'Messages', 
      icon: <MessageSquare size={20} />, 
      path: '/emails',
      section: 'messages' as const
    },
    { 
      name: 'Profile', 
      icon: <User size={20} />, 
      path: '/settings',
      section: 'profile' as const
    },
  ];

  const isActive = (item: any) => {
    if (item.section && item.section === activeSection) {
      return true;
    }
    return location.pathname === item.path;
  };

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
      
      <div className="mt-2 overflow-y-auto">
        {mainMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => item.section && navigateToSection(item.section)}
            className={`sidebar-item ${isActive(item) ? 'active' : ''}`}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-6 border-t border-sidebar-border pt-4">
        {!collapsed && <p className="px-4 py-1 text-xs font-medium uppercase text-sidebar-foreground/60">Database</p>}
        {databaseMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => item.section && navigateToSection(item.section)}
            className={`sidebar-item ${isActive(item) ? 'active' : ''}`}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto border-t border-sidebar-border pt-4">
        {!collapsed && <p className="px-4 py-1 text-xs font-medium uppercase text-sidebar-foreground/60">Quick Access</p>}
        {helpMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => item.section && navigateToSection(item.section)}
            className={`sidebar-item ${isActive(item) ? 'active' : ''}`}
          >
            {item.icon}
            {!collapsed && <span className="truncate">{item.name}</span>}
          </Link>
        ))}
      </div>
      
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md flex items-center justify-center bg-sidebar-accent text-sidebar-accent-foreground">
            M
          </div>
          {!collapsed && <span className="ml-3 text-sm font-medium text-sidebar-foreground truncate">Marketing Team's</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
