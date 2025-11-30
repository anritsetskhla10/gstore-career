import { useState } from 'react';
import { useCreateVacancy } from '../../../api/hooks/vacancies/useVacancies';

interface CreateVacancyFormProps {
  onSuccess: () => void;
}

export const CreateVacancyForm: React.FC<CreateVacancyFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({ 
    title: '', 
    location: '', 
    type: 'Full-time', 
    salary: '', 
    description: '', 
    deadline: '' 
  });
  
  const createMutation = useCreateVacancy();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form, {
      onSuccess: () => {
        alert("Vacancy successfully published!");
        setForm({ title: '', location: '', type: 'Full-time', salary: '', description: '', deadline: '' });
        onSuccess();
      },
      onError: () => alert("Failed to add vacancy. Please try again.")
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#0C1220] mb-6">Create New Vacancy</h2>
      
      <form onSubmit={handleCreate} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Title */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Title</label>
            <input 
                required 
                placeholder="e.g. Senior Frontend Developer"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3A6FF8] focus:border-transparent outline-none transition" 
                value={form.title} 
                onChange={e => setForm({...form, title: e.target.value})} 
            />
        </div>

        {/* Location & Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Location</label>
            <input 
                placeholder="e.g. Tbilisi, Remote"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3A6FF8] focus:border-transparent outline-none transition" 
                value={form.location} 
                onChange={e => setForm({...form, location: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Salary (Optional)</label>
            <input 
                placeholder="e.g. 3000-5000 GEL"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3A6FF8] focus:border-transparent outline-none transition" 
                value={form.salary} 
                onChange={e => setForm({...form, salary: e.target.value})} 
            />
          </div>
        </div>

        {/* Type & Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Employment Type</label>
            <select 
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3A6FF8] outline-none bg-white" 
                value={form.type} 
                onChange={e => setForm({...form, type: e.target.value})}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Remote</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Application Deadline</label>
            <input 
                type="date" 
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3A6FF8] outline-none" 
                value={form.deadline} 
                onChange={e => setForm({...form, deadline: e.target.value})} 
            />
          </div>
        </div>

        {/* Description */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Job Description</label>
            <textarea 
                required 
                rows={8} 
                placeholder="Enter detailed job description, requirements, and benefits..."
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#3A6FF8] focus:border-transparent outline-none transition resize-y" 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
            />
        </div>

        {/* Submit Button */}
        <button 
            disabled={createMutation.isPending} 
            className="w-full bg-[#3A6FF8] text-white font-bold py-3.5 rounded-xl hover:bg-blue-600 transition shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {createMutation.isPending ? "Publishing Vacancy..." : "Publish Vacancy"}
        </button>
      </form>
    </div>
  );
};