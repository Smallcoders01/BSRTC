import React, { useState, useEffect } from 'react';
import Banner from '../components/UserComponents/Banner';
import DirectoryComponent from '../components/UserComponents/Directory/DirectoryComponent';
import Loading from '../components/UserComponents/Loading'; // Import the Loading spinner component

const Directory = () => {
  const [loading, setLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    // Simulate loading or a data fetch
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the content is "loaded"
    }, 2000); // Adjust the timeout for your actual loading time

    // Cleanup timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // If loading is true, show the spinner
  if (loading) {
    return <Loading />;
  }

  // Once loading is false, show the actual page content
  return (
    <div>
      <Banner />
      <DirectoryComponent />
    </div>
  );
};

export default Directory;
