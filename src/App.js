import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Contact from './pages/Contact';
import LoginComponent from './pages/Login';
import SignUpComponent from './pages/Signup';
import Gallery from './pages/Gallery';
import Directory from './pages/Directory';
import Ticket from './pages/Ticket';
import Footer from './components/UserComponents/Footer/footer';
import AllRoutes from './pages/AllRoutes';
import AllTourist from './pages/AllTourist';
import AdminPanel from './components/AdminComponents/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  console.log('Rendering App component');
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/all-routes" element={<AllRoutes />} />
          <Route path="/all-tourist" element={<AllTourist />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/admin/*" element={<ProtectedRoute element={<AdminPanel />} />} />
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;