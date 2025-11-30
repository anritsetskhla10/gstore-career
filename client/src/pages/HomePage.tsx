import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; 
import { useVacancies } from '../api/hooks/vacancies/useVacancies';
import VacancyCard from '../components/VacancyCard.tsx'; 

export const HomePage = () => {
  const navigate = useNavigate();
  
  const fixedCardProps = {
    companyName: "Gstore",
    postedAgo: "2 days ago",
  };

  const { data: vacancies, isLoading, isError } = useVacancies();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#3A6FF8]" size={40} /></div>;
  
  if (isError) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
       connection error 
    </div>
  );

  return (
    <div className="min-h-screen bg-gstore-silver">
      {/* Hero Section */}
      <div className="bg-gstore-silver py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gstore-midnight"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gstore-silver">
            Find your place at <span className="text-gstore-blue">Gstore</span>
          </h1>
        </div>
      </div>

      {/* Vacancy List */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(!vacancies || vacancies.length === 0) ? (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-gray-400 mb-2">📭</div>
              <p className="text-gray-500 font-medium">There are currently no active vacancies.</p>
              <p className="text-gray-400 text-sm mt-1">Stay tuned for updates.</p>
            </div>
          ) : (
            vacancies.map((vac) => (
              <VacancyCard 
                key={vac.id} 
                vac={vac} 
                navigate={navigate} 
                {...fixedCardProps} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};