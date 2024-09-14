
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/UserComponents/NavbarComponent';
import HomePage from './pages/HomePage'; // Adjust the path accordingly
import AboutPage from './pages/AboutPage'; // Adjust the path accordingly
import ContactPage from './pages/ContactPage'; // Adjust the path accordingly
import LoginComponent from './pages/Login';
import SignUpComponent from './pages/Signup';
import AdminPanel from './components/AdminComponents/AdminPanel';


function App() {
  return (
   <>
   
  
   <NavbarComponent/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/admin/*" element={<AdminPanel />} />
        {/* Add more routes as needed */}
      </Routes>
    
   </>
  );
}

export default App;