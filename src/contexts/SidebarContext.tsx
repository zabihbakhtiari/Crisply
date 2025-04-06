
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SidebarSection = 'notifications' | 'messages' | 'help' | 'settings' | 'profile' | null;

interface SidebarContextType {
  activeSection: SidebarSection;
  setActiveSection: (section: SidebarSection) => void;
  navigateToSection: (section: SidebarSection) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SidebarSection>(null);
  const navigate = useNavigate();

  const navigateToSection = (section: SidebarSection) => {
    setActiveSection(section);
    
    // Map sections to routes
    const routes: Record<NonNullable<SidebarSection>, string> = {
      notifications: '/notifications',
      messages: '/emails',
      help: '/',
      settings: '/settings',
      profile: '/settings'
    };
    
    if (section && routes[section]) {
      navigate(routes[section]);
    }
  };

  return (
    <SidebarContext.Provider value={{ activeSection, setActiveSection, navigateToSection }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
