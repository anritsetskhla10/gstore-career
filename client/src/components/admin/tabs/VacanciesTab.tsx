import { Trash2, MapPin, Calendar, Briefcase } from 'lucide-react';
import { useAllVacancies, useDeleteVacancy } from '../../../api/hooks/vacancies/useVacancies';

export const VacanciesTab = () => {
  const { data: vacancies = [], isLoading } = useAllVacancies();
  const deleteMutation = useDeleteVacancy();

  const handleDeleteVacancy = (id: number) => {
    if (window.confirm("Are you sure you want to delete this vacancy? All related applications will be permanently removed.")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading vacancies...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0C1220] mb-6">Manage Vacancies</h2>
      <div className="grid gap-4">
        {vacancies.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-500 border border-gray-200">
                No vacancies created yet.
            </div>
        ) : (
            vacancies.map((vac: any) => {
              const isExpired = vac.deadline && new Date(vac.deadline) < new Date();
              
              return (
                <div key={vac.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-[#0C1220]">{vac.title}</h3>
                        {isExpired && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Expired</span>}
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={14}/> {vac.location}</span>
                        <span className="flex items-center gap-1"><Briefcase size={14}/> {vac.type}</span>
                        {vac.deadline && (
                            <span className={`flex items-center gap-1 font-medium ${isExpired ? 'text-red-500' : 'text-green-600'}`}>
                                <Calendar size={14}/> 
                                {isExpired ? 'Expired' : `Ends: ${new Date(vac.deadline).toLocaleDateString()}`}
                            </span>
                        )}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDeleteVacancy(vac.id)} 
                    className="flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-lg transition font-medium text-sm border border-transparent hover:border-red-100"
                    title="Delete Vacancy"
                  >
                    <Trash2 size={18} />
                    <span className="sm:hidden">Delete</span>
                  </button>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};