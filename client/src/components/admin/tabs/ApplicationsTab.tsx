import { useState } from 'react';
import { Download } from 'lucide-react';
import { useApplications } from '../../../api/hooks/applications/useApplications';
import { useAllVacancies } from '../../../api/hooks/vacancies/useVacancies';

export const ApplicationsTab = () => {
  const [appFilter, setAppFilter] = useState({ vacancyId: '', sort: 'newest' });
  const { data: applications = [], isLoading } = useApplications({ filter: appFilter.vacancyId, sort: appFilter.sort });
  const { data: vacancies = [] } = useAllVacancies();

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#0C1220]">Incoming Applications</h2>
        
        <div className="flex gap-3">
          <select 
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A6FF8] shadow-sm"
            onChange={(e) => setAppFilter({...appFilter, vacancyId: e.target.value})}
          >
            <option value="">All Vacancies</option>
            {vacancies.map(v => <option key={v.id} value={v.id}>{v.title}</option>)}
          </select>
          
          <select 
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3A6FF8] shadow-sm"
            onChange={(e) => setAppFilter({...appFilter, sort: e.target.value})}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Vacancy</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Applied Date</th>
                <th className="px-6 py-4">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading applications...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No applications found</td></tr>
              ) : (
                applications.map((app: any) => (
                  <tr key={app.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                        <p className="font-bold text-[#0C1220]">{app.fullName}</p>
                    </td>
                    <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100">
                            {app.vacancy?.title || 'Unknown Vacancy'}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-700">{app.email}</span>
                            <span className="text-xs text-gray-400">{app.phone}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                        {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`http://localhost:3001${app.cvPath}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#3A6FF8] hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 transition text-sm font-medium"
                      >
                        <Download size={16}/> Download
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};