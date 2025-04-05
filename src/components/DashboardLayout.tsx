
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar />
      </div>
      
      {/* Mobile sidebar - conditionally rendered based on state */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={toggleSidebar}>
          <div className="absolute left-0 top-0 h-full w-[var(--sidebar-width)]" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header title={title}>
          {/* Mobile menu button */}
          {isMobile && (
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
        </Header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
