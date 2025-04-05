
import React, { useState, ReactNode } from 'react';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  User
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background border-border">
      <div className="flex items-center gap-2">
        {children}
        <h1 className="text-lg md:text-xl font-semibold truncate">{title}</h1>
      </div>
      
      <div className="flex items-center gap-1 md:gap-2">
        <Button
          variant="outline"
          className="hidden md:flex items-center text-sm text-muted-foreground"
          onClick={() => setIsCommandOpen(true)}
        >
          <Search className="w-4 h-4 mr-2" />
          <span className="hidden lg:inline">Search...</span>
          <kbd className="ml-2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:inline-flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        
        <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>Dashboard</CommandItem>
              <CommandItem>Notes</CommandItem>
              <CommandItem>Tasks</CommandItem>
              <CommandItem>Emails</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Bell className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <MessageSquare className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hidden lg:flex">
          <HelpCircle className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hidden lg:flex">
          <Settings className="w-5 h-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
