import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer'; 
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { VacancyDetailsPage } from './pages/VacancyDetailsPage';

function App() {
  return (
    <div className="font-sans text-gray-900 bg-[#F8FAFC] flex flex-col min-h-screen">
      <Header />
      
      {/* Main Content Area */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vacancy/:id" element={<VacancyDetailsPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;