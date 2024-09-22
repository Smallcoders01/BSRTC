import React, { useState, useEffect, useCallback } from 'react';
import Banner from '../components/UserComponents/Banner';
import AboutUs from '../components/UserComponents/About/AboutUs';
import Footer from '../components/UserComponents/Footer/footer';
import Loading from '../components/UserComponents/Loading';

const INITIAL_LOAD_TIME = 1; // Reduced to 1 second for better UX

const AboutPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [aboutReady, setAboutReady] = useState(false);

  useEffect(() => {
    console.log('AboutPage: Initial loading started');
    const timer = setTimeout(() => {
      setInitialLoading(false);
      console.log('AboutPage: Initial loading finished');
    }, INITIAL_LOAD_TIME);

    return () => clearTimeout(timer);
  }, []);

  const handleAboutLoaded = useCallback(() => {
    console.log('AboutPage: AboutUs component data loaded');
    setAboutReady(true);
  }, []);

  console.log('AboutPage: Render cycle', { initialLoading, aboutReady });

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner />
      <AboutUs onDataLoaded={handleAboutLoaded} />
      {!aboutReady && <Loading />}
      <Footer />
    </div>
  );
};

export default AboutPage;