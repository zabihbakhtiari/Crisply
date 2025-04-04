
import React from 'react';
import { Search, HelpCircle, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 w-64"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <kbd className="px-1.5 py-0.5 text-xs border border-gray-300 rounded">F</kbd>
          </div>
        </div>
        
        <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
          <HelpCircle size={20} />
          <span>Help Center</span>
        </button>
        
        <div className="flex items-center space-x-2 cursor-pointer">
          <Avatar>
            <img src="https://github.com/shadcn.png" alt="User" />
          </Avatar>
          <span>Brian F.</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
