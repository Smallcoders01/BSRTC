
import './App.css';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// import NavbarComponent from './components/UserComponents/NavbarComponent';
import HomePage from './pages/HomePage'; // Adjust the path accordingly
import AboutPage from './pages/AboutPage'; // Adjust the path accordingly
import Contact from './pages/Contact'; // Adjust the path accordingly
import LoginComponent from './pages/Login';
import SignUpComponent from './pages/Signup';
import Gallery from './pages/Gallery';
import Directory from './pages/Directory';
import Ticket from './pages/Ticket';
import Footer from './components/UserComponents/Footer/footer';


function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/ticket" element={<Ticket/>} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        {/* Add more routes as needed */}
      </Routes>
    <Footer/>
   </>
  );
}

export default App;
