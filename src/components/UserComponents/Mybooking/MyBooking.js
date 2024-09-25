// src/components/UserComponents/Mybooking/MyBooking.js
import React, { useState } from 'react';
import './MyBooking.css'; // Ensure this path is correct
import Banner from '../Banner';
import Footer from '../Footer/footer';

const MyBooking = () => {
  const [status, setStatus] = useState('Active'); // Default status

  const bookings = [
    {
      id: '3010ATLBHM',
      class: 'A/C Sleeper (2+1)',
      from: { location: 'Patna, BR', code: 'PAT', date: 'Oct 10, 5:50am' },
      to: { location: 'Delhi, DEL', code: 'DEL', date: 'Oct 10, 11:15am' },
      passenger: 'Satoshi, Winlander',
      seat: 'S11,W10',
      fare: '₹ 840',
      status: 'Active',
    },
    {
      id: '3011ATLBHM',
      class: 'A/C Sleeper (2+1)',
      from: { location: 'Mumbai, MH', code: 'MUM', date: 'Oct 11, 6:00am' },
      to: { location: 'Pune, MH', code: 'PUN', date: 'Oct 11, 8:30am' },
      passenger: 'John Doe',
      seat: 'S12,W11',
      fare: '₹ 600',
      status: 'Completed',
    },
    {
      id: '3012ATLBHM',
      class: 'Non-AC Sleeper (2+1)',
      from: { location: 'Bangalore, KA', code: 'BLR', date: 'Oct 12, 7:00pm' },
      to: { location: 'Hyderabad, TG', code: 'HYD', date: 'Oct 12, 11:00pm' },
      passenger: 'Jane Smith',
      seat: 'S15,W12',
      fare: '₹ 500',
      status: 'Cancelled',
    },
  ];

  // Filter bookings based on selected status
  const filteredBookings = bookings.filter(booking => booking.status === status);

  return (
    <>
      <Banner />
      <div className="status-buttons">
        <button 
          className={`status-button ${status === 'Active' ? 'active' : ''}`} 
          onClick={() => setStatus('Active')}
        >
          Active
        </button>
        <button 
          className={`status-button ${status === 'Completed' ? 'active' : ''}`} 
          onClick={() => setStatus('Completed')}
        >
          Completed
        </button>
        <button 
          className={`status-button ${status === 'Cancelled' ? 'active' : ''}`} 
          onClick={() => setStatus('Cancelled')}
        >
          Cancelled
        </button>
      </div>
      <div className="bus-tickets-container">
        {filteredBookings.map((booking, index) => (
          <div className="bus-ticket" key={index}>
            <header>
              <div className="ticket-title">
                <strong>BUS TICKET</strong>
              </div>
              <div className="ticket-id">
                <small>Ticket ID: {booking.id}</small>
              </div>
            </header>
            <section className="route-info">
              <div className="route">
                <strong>{booking.from.location}</strong>
                <small>{booking.from.code}</small>
              </div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC20lEQVR4nO2avWsUQRjGfyqEJMYigo1iEcuAYGeRIqB3EEX0GtHev8JGoyIpEgX9GxSxF6wszBG//gHBCxpW06hnIRoSxRsZeDYsx37c7M7e7YV7YLjbmXfnfZ6Zdz52ZyEZM8B14DnwEfgBdADT5/Qb+AQ8AS7igP3AHeDPAEibHtIzYKIXIcu64R/wFLgKzALTwAH6j3HgOHAN+CJuj7NumlX47AD1FLsF4HNJLR6o/jicAH6K46k0IfdV2YMMwUHJ4ROk+H4om6U0gq9lNJ8hJHRYBkxG3RdU/jKtkq8yOlLQWRGYjLpPqnwjrZJtGY1VOLSOyeZXkdYIsVCimCBlsKOp19r99SFk0DBZPOMMGkATaJccTnGpLd+NokIaA9qWmK7U6RITKyRucQvR1PWyVvZ+YxpYEYfVSH7smIobtCHCcBqEiBCHxeH7bk7CLBcl3y2kKoPfpPDa/T8S0keYUY8IozHiGWYUWsMYWkHKglh1ISa6IMZtyZMqqKKQIG7bP2xCErFnhbQrsGmcEQf7pjO3kHAbv6JdaF7sU2O4ptPAO3F4VETIpYo8WG3opUNuIejJbFXPA3mJdBQaruk9cC8mGnIJqSLMSMhe6JFJ4Dawrrf09nex1zMKR0z26MtZiK3gVcIAXvMsxsWXs5BburZHX2eBg0BN06HNv+lRiIsvZyHruj7TZVdTfsujEBdfzkJ2dD3VZXdI+fbtvS+4+MrdI7aro6gr/0Nx/rl8GVchi5EtQk2tVY/E7Q2PQlx85Zq11hJmkqZOXH3BxVemkG8ysPN5iHHNGC3FcUut41OEi68pcbRcE/FCRpepLq6Io+WaiPMy2tIziD3dPVrSKt4rJsRhXpy2xPFc1o1mSFImQkP78cBbxWJ42juItC0ObyIfNDgJyVteFMaX/00ZzsWUzanMftxSFjZ9+V/qobvv+ufv3/+YKgtbJppsS9hKsr6MKIJc/v8D08kzD2xNskMAAAAASUVORK5CYII="
                alt="Bus"
                className="bus-image"
              />
              <div className="route">
                <strong>{booking.to.location}</strong>
                <small>{booking.to.code}</small>
              </div>
            </section>
            <section className="details">
              <div className="detail">
                <small>Seat</small>
                <strong>{booking.seat}</strong>
              </div>
              <div className="detail">
                <small>Class</small>
                <strong>{booking.class}</strong>
              </div>
              <div className="detail">
                <small>Boarding</small>
                <strong>{booking.from.date}</strong>
              </div>
              <div className="detail">
                <small>Departure</small>
                <strong>{booking.to.date}</strong>
              </div>
            </section>
            <section className="passenger-info">
              <div className="passenger">
                <small>Passenger</small>
                <strong>{booking.passenger}</strong>
              </div>
              <div className="fare">
                <small>Ticket Fare</small>
                <strong>{booking.fare}</strong>
              </div>
            </section>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;