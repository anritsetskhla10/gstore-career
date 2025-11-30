import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, LayoutDashboard, Briefcase, Plus, ArrowLeft, Menu, X } from 'lucide-react';

interface AdminSidebarProps {
  activeTab: 'applications' | 'vacancies' | 'create';
  setActiveTab: (tab: 'applications' | 'vacancies' | 'create') => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tab: 'applications' | 'vacancies' | 'create') => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button  */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-[#0C1220] text-white rounded-lg shadow-lg hover:bg-gray-800 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Overlay*/}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          bg-[#0C1220] text-gray-400 w-64 h-screen flex flex-col shrink-0
          fixed md:sticky top-0 left-0 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 text-white font-bold text-xl flex items-center justify-between border-b border-gray-800/50">
          <div className="flex items-center gap-2">
            <Lock size={20} className="text-[#F5C96B]" /> 
            <span>Admin Panel</span>
          </div>
          {/* Close Button (Mobile Only) */}
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 overflow-y-auto">
          <SidebarButton 
            isActive={activeTab === 'applications'} 
            onClick={() => handleTabClick('applications')} 
            icon={<LayoutDashboard size={18}/>} 
            label="Applications" 
          />
          <SidebarButton 
            isActive={activeTab === 'vacancies'} 
            onClick={() => handleTabClick('vacancies')} 
            icon={<Briefcase size={18}/>} 
            label="Manage Vacancies" 
          />
          <SidebarButton 
            isActive={activeTab === 'create'} 
            onClick={() => handleTabClick('create')} 
            icon={<Plus size={18}/>} 
            label="Add Vacancy" 
          />
        </nav>

        <div className="p-4 border-t border-gray-800 mt-auto">
          <Link to="/" className="flex items-center gap-2 text-sm hover:text-white transition group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> 
            Return to Site
          </Link>
        </div>
      </aside>
    </>
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