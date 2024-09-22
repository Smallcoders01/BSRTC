import React from 'react'
import TicketDetails from '../components/UserComponents/Tickets/TicketDetails'
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
const Ticket = () => {
  return (
    <div>
        <Banner/>
      <TicketDetails/>
      <Footer/>
    </div>
  )
}

export default Ticket
