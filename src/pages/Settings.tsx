
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import SettingsNav from '../components/SettingsNav';
import ProfileSection from '../components/ProfileSection';
import SecuritySection from '../components/SecuritySection';
import AppsSection from '../components/AppsSection';
import NotificationSection from '../components/NotificationSection';
import LanguageSection from '../components/LanguageSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');

  // Check if there is a specific section in the URL path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/settings/apps')) {
      setActiveTab('apps');
    } else if (path.includes('/settings/notification')) {
      setActiveTab('notification');
    } else if (path.includes('/settings/language')) {
      setActiveTab('language');
    } else {
      setActiveTab('account');
    }
  }, [location]);

  // Update the URL when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'account') {
      navigate('/settings');
    } else {
      navigate(`/settings/${value}`);
    }
  };

  return (
    <DashboardLayout title="Account Settings">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-64 mb-6 md:mb-0">
          <SettingsNav />
        </div>
        <div className="flex-1 md:pl-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="apps">Apps</TabsTrigger>
              <TabsTrigger value="notification">Notification</TabsTrigger>
              <TabsTrigger value="language">Language & Region</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <ProfileSection />
              <SecuritySection />
            </TabsContent>
            
            <TabsContent value="apps">
              <AppsSection />
            </TabsContent>
            
            <TabsContent value="notification">
              <NotificationSection />
            </TabsContent>
            
            <TabsContent value="language">
              <LanguageSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
