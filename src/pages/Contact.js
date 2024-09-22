import React, { useState, useEffect } from 'react';
import HelplineNumbers from '../components/UserComponents/Contact/ContactUs';
import Banner from '../components/UserComponents/Banner';
import Footer from '../components/UserComponents/Footer/footer';
import Booking from '../components/UserComponents/Contact/Booking';
import Loading from '../components/UserComponents/Loading';

const Contact = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [contactReady, setContactReady] = useState(false);

  useEffect(() => {
    console.log('Contact: Initial loading started');
    const timer = setTimeout(() => {
      setInitialLoading(false);
      console.log('Contact: Initial loading finished');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleContactLoaded = () => {
    console.log('Contact: HelplineNumbers component data loaded');
    setContactReady(true);
  };

  console.log('Contact: Render cycle', { initialLoading, contactReady });

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner />
      <HelplineNumbers onDataLoaded={handleContactLoaded} />
      {!contactReady && <Loading />}
      <Booking />
      <Footer />
    </div>
  );
};

export default Contact;