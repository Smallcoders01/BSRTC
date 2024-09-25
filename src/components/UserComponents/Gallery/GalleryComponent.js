import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css'; // Custom CSS file
import Footer from '../Footer/footer';
import axios from 'axios';
import config from '../../../config';

const CACHE_KEY = 'galleryImages';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour in milliseconds

const GalleryComponent = ({ onDataLoaded }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

      if (cachedData && cachedTimestamp) {
        const now = new Date().getTime();
        if (now - parseInt(cachedTimestamp) < CACHE_EXPIRATION) {
          console.log('GalleryComponent: Using cached data');
          setImages(JSON.parse(cachedData));
          setLoading(false);
          onDataLoaded();
          return;
        }
      }

      console.log('GalleryComponent: Fetching fresh data');
      try {
        const response = await axios.get(`${config.apiBaseUrl}/gallery`, { timeout: 10000 });
        setImages(response.data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, new Date().getTime().toString());
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('GalleryComponent: Error fetching data', error);
        setError('Error fetching images');
        setLoading(false);
        onDataLoaded();
      }
    };

    fetchImages();
  }, [onDataLoaded]);

  console.log('GalleryComponent: Render cycle', { loading, error });

  if (loading || error) {
    return null;
  }

  return (
    <>
      <div className="container my-5" style={{ width: '80%' }}>
        <h1 className='text-center mb-5'>Gallery</h1>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={`${config.baseUrl}${image.photo}`}
                alt={image.name}
                className="gallery-img" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryComponent;