
import './App.css';
import BusBookingHeader from './components/UserComponents/Home/BusBookingHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import PopularRoutes from './components/UserComponents/Home/PopularRoutes';
import TouristDestination from './components/UserComponents/Home/TouristDestination';
import SneakPeek from './components/UserComponents/Home/SneakPeek';
import FAQSection from './components/UserComponents/Home/FAQSection';


function App() {
  return (
   <>
   <BusBookingHeader/>
   <div className='routes'>
   <PopularRoutes/>
  
   </div>
   <TouristDestination/>
   <SneakPeek/>
    <FAQSection/>
   </>
  );
}

export default App;
