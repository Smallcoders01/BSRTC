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
import Tender from './pages/Tender';
import AllRoutes from './pages/AllRoutes';
import AllTourist from './pages/AllTourist';
import AdminPanel from './components/AdminComponents/AdminPanel';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ViewProfile from './components/UserComponents/Profile/ViewProfile';
import MyBooking from './components/UserComponents/Mybooking/MyBooking'; // Ensure the import is correct

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
          <Route path="/tender" element={<Tender />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/admin/*" element={<ProtectedRoute element={<AdminPanel />} />} />
          <Route path="/profile" element={<ViewProfile />} />
          <Route path="/my-booking" element={<MyBooking />} /> {/* Corrected here */}
          {/* Add more routes as needed */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;