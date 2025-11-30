import { Link, useLocation } from 'react-router-dom';
import { Briefcase} from 'lucide-react';
// @ts-ignore: WebP asset type declaration missing
import Logo from '../assets/logo.webp';

export const Header = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <header 
      className="bg-gstore-silver/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* Logo Section*/}
        <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <img 
                src={Logo} 
                alt="Gstore Logo" 
                className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* - Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gstore-midnight transition-colors relative group">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gstore-blue transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gstore-midnight transition-colors relative group">
                    About Us
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gstore-blue transition-all group-hover:w-full"></span>
                </Link>
                <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gstore-midnight transition-colors relative group">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gstore-blue transition-all group-hover:w-full"></span>
                </Link>
            </nav>
        </div>

        {/*RIGHT*/}
        <div className="flex items-center gap-3 md:gap-4">
            
            <Link 
                to="/"
                className="
                  group
                  flex items-center gap-2 
                  px-3 py-2 md:px-5 md:py-2.5 
                  rounded-xl 
                  text-sm font-bold 
                  bg-gstore-blue/10 text-gstore-blue 
                  border border-gstore-blue/10
                  hover:bg-gstore-blue hover:text-white hover:shadow-lg hover:shadow-gstore-blue/20
                  active:scale-95
                  transition-all duration-300 ease-in-out
                "
            >
                <Briefcase 
                  size={20} 
                  className="transition-transform group-hover:-rotate-12"
                /> 
                <span className="hidden md:block">Current Vacancies</span>
            </Link>
        </div>

      </div>
    </header>
  );
};