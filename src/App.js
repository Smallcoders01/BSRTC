import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import LoginComponent from './pages/Login';
import SignUpComponent from './pages/Signup';
import Gallery from './pages/Gallery';
import Directory from './pages/Directory';
import Ticket from './pages/Ticket';
import Tender from './pages/Tender';
import AllRoutes from './pages/AllRoutes';
import AllTourist from './pages/AllTourist';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import CancellationPolicy from './pages/CancellationPolicy';
import BookingPolicy from './pages/BookingPolicy';
import NewsPage from './pages/newspage';
import AdminPanel from './components/AdminComponents/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ViewProfile from './components/UserComponents/Profile/ViewProfile';
import MyBooking from './components/UserComponents/Mybooking/MyBooking';
import LanguageSelector from './components/LanguageSelector';
import NewsDetail from './pages/NewsDetail';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  if (!language) {
    return <LanguageSelector onSelectLanguage={handleLanguageSelect} />;
  }

  return (
    <div className={isMobile ? 'mobile-view' : 'desktop-view'}>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/all-routes" element={<AllRoutes />} />
          <Route path="/all-tourist" element={<AllTourist />} />
          <Route path="/tender" element={<Tender />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/booking-policy" element={<BookingPolicy />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news-detail/:id" element={<NewsDetail />} />
          <Route path="/admin/*" element={<ProtectedRoute element={<AdminPanel />} />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;