import { Link, useLocation } from 'react-router-dom';
import { Lock, Facebook, Linkedin, Instagram, MapPin } from 'lucide-react';
import Logo from '../assets/logo.webp';

export const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer className="bg-gstore-midnight text-white pt-16 pb-8 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
    
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                    <img src={Logo} alt="Gstore" className="h-16 object-contain" />
                </div>
             </div>
             <div className="flex gap-4">
                <SocialLink icon={<Facebook size={18} />} />
                <SocialLink icon={<Linkedin size={18} />} />
                <SocialLink icon={<Instagram size={18} />} />
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gstore-blue">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/" className="hover:text-white transition">Vacancies</Link></li>
              <li><Link to="/" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-gstore-blue">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gstore-gold mt-0.5 flex-shrink-0" />
                <span>12 Chavchavadze Ave.<br />Tbilisi, Georgia</span>
              </li>
            </ul>
          </div>

          {/* Admin / Internal */}
          <div>
             <h4 className="font-bold text-lg mb-6 text-gstore-blue">For Employees</h4>
             <p className="text-gray-400 text-sm mb-4">
               Access to the administrative panel is restricted to authorized personnel only.
             </p>
             <Link 
                to="/admin" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition text-sm border border-white/10"
              >
                <Lock size={14}/> 
                <span>Admin Login</span>
              </Link>
          </div>
        </div>

        {/* --- Bottom Section: Copyright --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Gstore Career Portal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition">Terms & Conditions</span>
            <span className="hover:text-gray-300 cursor-pointer transition">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
  <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-gstore-blue hover:text-white transition-all duration-300">
    {icon}
  </a>
);

export default Footer;