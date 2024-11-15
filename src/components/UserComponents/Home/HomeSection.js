import React, { useState, useRef } from 'react'
import BusBookingHeader from './BusBookingHeader'
import PopularRoutes from './PopularRoutes';
import TouristDestination from './TouristDestination';
import SneakPeek from './SneakPeek';
import Footer from '../Footer/footer';

const HomeSection = ({ popularRoutes, touristDestinations, onBookNow, selectedDestination }) => {
  const [bookingInfo, setBookingInfo] = useState({ from: '', to: '' });
  const busBookingHeaderRef = useRef(null);

  console.log('HomeSection rendered with:', { popularRoutes, touristDestinations, selectedDestination, bookingInfo });
  
  const handleBookNow = (from, to) => {
    console.log('handleBookNow called with:', from, to);
    setBookingInfo({ from, to });
    
    if (busBookingHeaderRef.current) {
      busBookingHeaderRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <>
      <div>
        <div ref={busBookingHeaderRef}>
          <BusBookingHeader bookingInfo={bookingInfo} />
        </div>
        <div className='routes'>
          <PopularRoutes routes={popularRoutes} onBookNow={handleBookNow} />
        </div>
        <TouristDestination 
          destinations={touristDestinations} 
          onBookNow={(destination) => handleBookNow('', destination)} 
        />
        <SneakPeek />
      </div>
      <Footer />
    </>
  )
}

export default HomeSection
