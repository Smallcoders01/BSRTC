import React, { useState, useEffect } from 'react';
import HomeSection from '../components/UserComponents/Home/HomeSection';
import Loading from '../components/UserComponents/Loading';
import axios from 'axios';
import config from '../config'; // Adjust the path as needed

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace these API calls with the actual endpoints you need to fetch data for the home page
        const popularRoutesResponse = await axios.get(`${config.apiBaseUrl}/popular-routes`);
        const touristDestinationsResponse = await axios.get(`${config.apiBaseUrl}/tourist-destinations`);
        // Add more API calls as needed

        setData({
          popularRoutes: popularRoutesResponse.data,
          touristDestinations: touristDestinationsResponse.data,
          // Add more data as needed
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <HomeSection 
        popularRoutes={data.popularRoutes}
        touristDestinations={data.touristDestinations}
        // Pass more props as needed
      />
    </div>
  );
};

export default HomePage;
