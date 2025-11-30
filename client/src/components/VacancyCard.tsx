import { Vacancy } from "../types";
import { getTimeAgo } from "../utils/helper";
import Logo from "../assets/logo.webp";
import { Calendar, MapPin } from "lucide-react";

const VacancyCard: React.FC<{
  vac: Vacancy;
  companyName: string;
  navigate: (path: string) => void;
}> = ({ 
  vac, 
  navigate,
  companyName = "Gstore", 
}) => {
  
  const calculatedPostedAgo = getTimeAgo(vac.createdAt);

  const startDate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '.');
  const endDate = vac.deadline 
    ? new Date(vac.deadline).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' }).replace('/', '.')
    : 'Open';

  return (
    <div key={vac.id} className="bg-[linear-gradient(219deg,#DDE2E9_60%,#F5C96B_100%)] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all flex flex-col relative overflow-hidden group w-full max-w-sm border">
      
      {/*  HEADER*/}
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-extrabold text-gstore-midnight uppercase tracking-tight">
            {vac.title}
        </h3>
        <span className="text-gray-500 text-sm font-medium whitespace-nowrap ml-2">
            {calculatedPostedAgo}
        </span>
      </div>

      {/* Logo & Info  */}
      <div className="flex items-start gap-4 mb-4">
        {/* Logo Container */}
        <div className="w-20 h-20 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-white/50">
             <img src={Logo} alt="Logo" className="w-16 h-16 object-contain opacity-90" />
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-1.5 mt-1">
            <span className="font-bold text-gstore-midnight text-lg leading-none">{companyName}</span>
            
            {/* Location */}
            <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={16} className="mr-1.5 text-gstore-midnight" />
                {vac.location}
            </div>

            {/* Date Range / Deadline */}
            <div className="flex items-center text-gray-600 text-sm">
                <Calendar size={16} className="mr-1.5 text-gstore-midnight" />
                {startDate} - {endDate}
            </div>
        </div>
      </div>

      {/* TAGS  */}
      <div className="mb-8">
        <span className="bg-gstore-blue/10 text-gstore-blue px-4 py-1.5 rounded-full text-sm font-bold inline-block">
          {vac.type}
        </span>
      </div>

      {/* FOOTER: Salary & Button */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-2xl font-extrabold text-gstore-midnight">
          {vac.salary} ₾
        </span>

        <button
          onClick={() => navigate(`/vacancy/${vac.id}`)}
          className="bg-gstore-blue text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-gstore-blue/30 hover:bg-gstore-midnight transition-all active:scale-95"
        >
          Apply Now
        </button>
      </div>

    </div>
  );
};

export default VacancyCard;