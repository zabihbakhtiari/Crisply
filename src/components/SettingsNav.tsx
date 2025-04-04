
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Users, Bell, Globe, LineChart, UserPlus, CreditCard } from 'lucide-react';

interface NavSection {
  title: string;
  items: {
    name: string;
    icon: JSX.Element;
    path: string;
  }[];
}

const SettingsNav: React.FC = () => {
  const location = useLocation();
  
  const navSections: NavSection[] = [
    {
      title: 'General Settings',
      items: [
        { name: 'Apps', icon: <Settings size={18} />, path: '/settings/apps' },
        { name: 'Account', icon: <Users size={18} />, path: '/settings' },
        { name: 'Notification', icon: <Bell size={18} />, path: '/settings/notification' },
        { name: 'Language & Region', icon: <Globe size={18} />, path: '/settings/language' },
      ]
    },
    {
      title: 'Workspace Settings',
      items: [
        { name: 'General', icon: <Settings size={18} />, path: '/settings/general' },
        { name: 'Members', icon: <UserPlus size={18} />, path: '/settings/members' },
        { name: 'Billing', icon: <CreditCard size={18} />, path: '/settings/billing' },
      ]
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 border-r border-gray-200 pr-4">
      {navSections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xs font-medium uppercase text-gray-500 mb-2">{section.title}</h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
                  isActive(item.path) 
                    ? 'bg-gray-100 text-black font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsNav;
