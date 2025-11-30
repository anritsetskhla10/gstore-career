import { Link } from 'react-router-dom';
import { Lock, LayoutDashboard, Briefcase, Plus, ArrowLeft } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: 'applications' | 'vacancies' | 'create';
  setActiveTab: (tab: 'applications' | 'vacancies' | 'create') => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="w-64 bg-[#0C1220] text-gray-400 flex flex-col shrink-0 sticky top-0 h-screen transition-all">
      <div className="p-6 text-white font-bold text-xl flex items-center gap-2 border-b border-gray-800/50">
        <Lock size={20} className="text-[#F5C96B]" /> 
        <span>Admin Panel</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-6">
        <SidebarButton 
          isActive={activeTab === 'applications'} 
          onClick={() => setActiveTab('applications')} 
          icon={<LayoutDashboard size={18}/>} 
          label="Applications" 
        />
        <SidebarButton 
          isActive={activeTab === 'vacancies'} 
          onClick={() => setActiveTab('vacancies')} 
          icon={<Briefcase size={18}/>} 
          label="Manage Vacancies" 
        />
        <SidebarButton 
          isActive={activeTab === 'create'} 
          onClick={() => setActiveTab('create')} 
          icon={<Plus size={18}/>} 
          label="Add Vacancy" 
        />
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link to="/" className="flex items-center gap-2 text-sm hover:text-white transition group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> 
          Return to Site
        </Link>
      </div>
    </aside>
  );
};

const SidebarButton = ({ isActive, onClick, icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition font-medium ${
      isActive ? 'bg-[#3A6FF8] text-white shadow-lg shadow-blue-900/20' : 'hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    {label}
  </button>
);