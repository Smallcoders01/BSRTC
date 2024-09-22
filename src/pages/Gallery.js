import React, { useState, useEffect } from 'react';
import GalleryComponent from '../components/UserComponents/Gallery/GalleryComponent';
import Banner from '../components/UserComponents/Banner';
import Loading from '../components/UserComponents/Loading';

const Gallery = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [galleryReady, setGalleryReady] = useState(false);

  useEffect(() => {
    console.log('Gallery: Initial loading started');
    const timer = setTimeout(() => {
      setInitialLoading(false);
      console.log('Gallery: Initial loading finished');
    }, 1); // Reduced to 1 second

    return () => clearTimeout(timer);
  }, []);

  const handleGalleryLoaded = () => {
    console.log('Gallery: GalleryComponent data loaded');
    setGalleryReady(true);
  };

  console.log('Gallery: Render cycle', { initialLoading, galleryReady });

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Banner />
      <GalleryComponent onDataLoaded={handleGalleryLoaded} />
      {!galleryReady && <Loading />}
    </div>
  );
};

export default Gallery;
