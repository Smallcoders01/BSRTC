import React, { useState, useEffect, Suspense } from 'react';
import HomeSection from '../components/UserComponents/Home/HomeSection';
import Loading from '../components/UserComponents/Loading';
import axios from 'axios';
import config from '../config'; // Adjust the path as needed

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    popularRoutes: [],
    touristDestinations: []
  });
  const [error, setError] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const popularRoutesResponse = await axios.get(`${config.apiBaseUrl}/popular-routes`);
        const touristDestinationsResponse = await axios.get(`${config.apiBaseUrl}/tourist-destinations`);

        setData({
          popularRoutes: popularRoutesResponse.data,
          touristDestinations: touristDestinationsResponse.data,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookNow = (destination) => {
    console.log('handleBookNow called with:', destination);
    setSelectedDestination(destination);
    // Scroll to the booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Booking form element not found');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  console.log('Rendering HomePage with data:', data);
  console.log('Selected destination:', selectedDestination);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <HomeSection 
          popularRoutes={data.popularRoutes}
          touristDestinations={data.touristDestinations}
          onBookNow={handleBookNow}
          selectedDestination={selectedDestination}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
