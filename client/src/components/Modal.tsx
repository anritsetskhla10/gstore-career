import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  title: React.ReactNode; 
  subTitle?: string;
  onClose: () => void;
}

export const Modal = ({ children, title, subTitle, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#0C1220]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0C1220] p-6 text-white flex justify-between items-center shrink-0">
          <div>
            <div className="text-xl font-bold text-[#F5C96B] flex items-center gap-2">
              {title}
            </div>
            {subTitle && <p className="text-sm text-gray-400 mt-1">{subTitle}</p>}
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};