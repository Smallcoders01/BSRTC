import React from 'react'
import BusBookingHeader from './BusBookingHeader'
import PopularRoutes from './PopularRoutes';
import TouristDestination from './TouristDestination';
import SneakPeek from './SneakPeek';
import FAQSection from './FAQSection';

import Footer from '../Footer/footer';

const HomeSection = () => {
  return (
    <><div>
      <BusBookingHeader />
      <div className='routes'>
        <PopularRoutes />
      </div>
      <TouristDestination />
      <SneakPeek />
      <FAQSection />

    </div><Footer /></>
  )
}

export default HomeSection
