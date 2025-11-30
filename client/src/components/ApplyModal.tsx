import React, { useState, useRef } from 'react';
import { Upload, Loader2, FileText } from 'lucide-react';
import { Vacancy } from '../types';
import { useSubmitApplication } from '../api/hooks/applications/useApplications';
import { Modal } from './Modal';
import { SuccessModal } from './SuccessModal';
import { ErrorModal } from './ErrorModal'; 

interface ApplyModalProps {
  vacancy: Vacancy;
  onClose: () => void;
}

export const ApplyModal = ({ vacancy, onClose }: ApplyModalProps) => {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '' });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [showError, setShowError] = useState(false); 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useSubmitApplication(() => {
    setTimeout(onClose, 2500);
  });

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const nameParts = formData.fullName.trim().split(/\s+/);
    if (nameParts.length < 2) newErrors.fullName = "Please enter your full name";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
    const phoneClean = formData.phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 9) newErrors.phone = "Please enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") setFile(droppedFile);
      else {
        setShowError(true);
        return;
      };
    }
  };

  // Handle file selection via input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        setShowError(true);
        if (fileInputRef.current) fileInputRef.current.value = ''; 
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    if (!file) {
      setShowError(true);
      return;
    }

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('vacancyId', vacancy.id.toString());
    data.append('resume', file);

    mutation.mutate(data);
  };

  if (mutation.isSuccess) {
    return <SuccessModal title="Success!" message="Your application has been received." />;
  }

  if (showError) {
    return (
      <ErrorModal 
        title="Invalid File Format" 
        message="Please upload your CV in PDF format only." 
        onClose={() => setShowError(false)} 
      />
    );
  }

  //Main Form
  return (
    <Modal
      title={<><Upload size={20}/> Application</>}
      subTitle={vacancy.title}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input 
              placeholder="e.g. John Doe" 
              className={`w-full mt-1 px-4 py-2.5 bg-gray-50 border rounded-lg focus:ring-2 outline-none ${errors.fullName ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-[#3A6FF8]'}`}
              value={formData.fullName} 
              onChange={e => { setFormData({...formData, fullName: e.target.value}); setErrors({...errors, fullName: ''}); }} 
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                className={`w-full mt-1 px-4 py-2.5 bg-gray-50 border rounded-lg focus:ring-2 outline-none ${errors.email ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-[#3A6FF8]'}`}
                value={formData.email} 
                onChange={e => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: ''}); }} 
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Phone</label>
              <input 
                placeholder="+995 5XX..." 
                className={`w-full mt-1 px-4 py-2.5 bg-gray-50 border rounded-lg focus:ring-2 outline-none ${errors.phone ? 'border-red-500 ring-red-200' : 'border-gray-200 focus:ring-[#3A6FF8]'}`}
                value={formData.phone} 
                onChange={e => { setFormData({...formData, phone: e.target.value}); setErrors({...errors, phone: ''}); }} 
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
        </div>
        
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragging ? 'border-[#3A6FF8] bg-blue-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-[#3A6FF8]'}`}
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
          {file ? (
            <div className="text-green-700"><FileText className="mx-auto h-8 w-8 mb-2"/>{file.name}</div>
          ) : (
            <div className="text-gray-500"><Upload className="mx-auto h-8 w-8 mb-2"/><p>Drop your resume here (PDF)</p></div>
          )}
        </div>

        <button disabled={mutation.isPending} className="w-full bg-[#3A6FF8] hover:bg-blue-600 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex justify-center items-center">
          {mutation.isPending ? <Loader2 className="animate-spin"/> : "Submit Application"}
        </button>
      </form>
    </Modal>
  );
};