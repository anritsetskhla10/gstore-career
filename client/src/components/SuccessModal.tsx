import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  title?: string;
  message?: string;
}

export const SuccessModal = ({ 
  title = "Success!", 
  message = "Operation completed successfully." 
}: SuccessModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#0C1220]/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform scale-100 transition-all">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <CheckCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-[#0C1220] mb-2">{title}</h3>
        <p className="text-gray-500 mt-2">{message}</p>
      </div>
    </div>
  );
};