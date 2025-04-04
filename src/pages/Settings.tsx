
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import SettingsNav from '../components/SettingsNav';
import ProfileSection from '../components/ProfileSection';
import SecuritySection from '../components/SecuritySection';

const Settings = () => {
  return (
    <DashboardLayout title="Account Settings">
      <div className="flex">
        <SettingsNav />
        <div className="flex-1 pl-6">
          <ProfileSection />
          <SecuritySection />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
