import { XCircle } from 'lucide-react';
import { Modal } from './Modal';

interface ErrorModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const ErrorModal = ({ title, message, onClose }: ErrorModalProps) => {
  return (
    <Modal title="" onClose={onClose}>
      <div className="text-center py-8">
        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="text-red-500 w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-[#0C1220] mb-2">{title}</h2>
        <p className="text-gray-500 mb-8 max-w-xs mx-auto">{message}</p>
        
        <button 
          onClick={onClose}
          className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition shadow-lg shadow-red-500/20 active:scale-95"
        >
          Try Again
        </button>
      </div>
    </Modal>
  );
};