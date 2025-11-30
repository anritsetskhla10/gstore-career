import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, DollarSign, Calendar, Loader2, Building2, Clock } from 'lucide-react';
import { ApplyModal } from '../components/ApplyModal';
import { useVacancies } from '../api/hooks/vacancies/useVacancies';
import Logo from "../assets/logo.webp"; 
import { getTimeAgo } from '../utils/helper';

export const VacancyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showApply, setShowApply] = useState(false);

  const { data: vacancies, isLoading } = useVacancies();
  const vacancy = vacancies?.find(v => v.id === Number(id));

  const companyName = "Gstore";
  const postedAgo = getTimeAgo(vacancy?.createdAt);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-gstore-blue" size={40} /></div>;
  if (!vacancy) return <div className="text-center py-20 bg-gray-50 text-gray-500 text-xl font-medium">Vacancy not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* STICKY TOP NAV / HEADER  */}
      <div className="bg-gstore-midnight border-b border-gray-200 shadow-sm sticky top-[72px] z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-hidden">
              <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition text-white flex-shrink-0">
                <ArrowLeft size={24} />
              </button>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100">
                   <img src={Logo} alt="Company Logo" className="w-16 h-16 object-contain opacity-80" />
                </div>
                <div className="truncate">
                    <h1 className="text-lg font-bold text-white truncate uppercase">{vacancy.title}</h1>
                    <p className="text-sm text-gray-300 truncate">{companyName} • {vacancy.location}</p>
                </div>
              </div>
          </div>
          
          {/*  resume */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button 
              onClick={() => setShowApply(true)}
              className="bg-gstore-blue text-white px-5 py-2 rounded-xl font-bold hover:bg-gstore-silver hover:text-gstore-midnight transition shadow-lg shadow-gstore-blue/20 active:scale-95"
            >
              Send Resume
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT  */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* HERO SECTION / JOB OVERVIEW  */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
            {/* Header: Company, Title, Posted Time */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-5">
                    <div className="w-16 h-16 bg-gstore-blue/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gstore-blue/10">
                        <img src={Logo} alt="Company Logo" className="h-14 object-contain" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <h2 className="text-gstore-midnight text-lg font-bold flex items-center gap-1.5">
                                <Building2 size={18} className="text-gstore-blue"/>
                                {companyName}
                             </h2>
                             <span className="text-gray-400 text-sm">•</span>
                             <span className="text-gray-500 text-sm flex items-center gap-1">
                                <Clock size={14}/> {postedAgo}
                             </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gstore-midnight mb-3 uppercase">{vacancy.title}</h1>
                    </div>
                </div>
                {/* Deadline Tag*/}
                {vacancy.deadline && (
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold self-start">
                        <Calendar size={16} className="text-red-500"/> 
                        Deadline: {new Date(vacancy.deadline).toLocaleDateString()}
                    </div>
                )}
            </div>

            <hr className="border-gray-100 mb-8" />

            {/*KEY DETAILS GRID*/}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                    <div className="bg-white p-3 rounded-xl text-gstore-blue shadow-sm">
                        <MapPin size={24}/>
                    </div>
                    <div>
                        <p className="text-xs text-gstore-blue font-bold uppercase tracking-wider mb-1">Location</p>
                        <p className="font-bold text-gstore-midnight text-lg">{vacancy.location}</p>
                    </div>
                </div>
                {/* Type */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-yellow-50/50 border border-yellow-100">
                    <div className="bg-white p-3 rounded-xl text-gstore-gold shadow-sm">
                        <Briefcase size={24}/>
                    </div>
                    <div>
                        <p className="text-xs text-gstore-gold font-bold uppercase tracking-wider mb-1">Job Type</p>
                        <p className="font-bold text-gstore-midnight text-lg">{vacancy.type}</p>
                    </div>
                </div>
                {/* Salary */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50/50 border border-green-100">
                    <div className="bg-white p-3 rounded-xl text-green-600 shadow-sm">
                        <DollarSign size={24}/>
                    </div>
                    <div>
                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">Salary</p>
                        <p className="font-bold text-gstore-midnight text-lg">{vacancy.salary} ₾</p>
                    </div>
                </div>
            </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100">
          <h3 className="text-gstore-midnight font-bold text-2xl mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
            About the Job
          </h3>
          <div className="prose prose-lg prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
            {vacancy.description}
          </div>
        </div>

      </div>

      {/* APPLY MODAL */}
      {showApply && <ApplyModal vacancy={vacancy} onClose={() => setShowApply(false)} />}
    </div>
  );
};