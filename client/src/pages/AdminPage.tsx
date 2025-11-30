import { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { ApplicationsTab } from '../components/admin/tabs/ApplicationsTab';
import { VacanciesTab } from '../components/admin/tabs/VacanciesTab';
import { CreateVacancyForm } from '../components/admin/tabs/CreateVacancyForm';

type TabType = 'applications' | 'vacancies' | 'create';

export const AdminPage = () => {
  const [tab, setTab] = useState<TabType>('applications');

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      {/* Sidebar Component */}
      <AdminSidebar activeTab={tab} setActiveTab={setTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
            
            {/* Conditional Rendering of Tabs */}
            {tab === 'applications' && <ApplicationsTab />}
            
            {tab === 'vacancies' && <VacanciesTab />}
            
            {tab === 'create' && (
                <CreateVacancyForm onSuccess={() => setTab('vacancies')} />
            )}
            
        </div>
      </main>
    </div>
  );
};