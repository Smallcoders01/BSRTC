import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';
import Footer from '../Footer/footer';
import axios from 'axios';
import config from '../../../config';
import { Button } from '@mui/material';

const GalleryComponent = ({ onDataLoaded }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const language = localStorage.getItem('language') || 'en';

  // Define filteredImages before using it
  const filteredImages = images.filter(image => {
    return filter === 'all' ? true : image.type === filter;
  });

  // Modify the getImagesPerView function to return 2 for desktop
  const getImagesPerView = () => {
    return window.innerWidth <= 768 ? 1 : 2;
  };

  const [imagesPerView, setImagesPerView] = useState(getImagesPerView());

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setImagesPerView(getImagesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modify handleNext and handlePrev for responsive behavior
  const handleNext = useCallback(() => {
    if (currentIndex + imagesPerView < filteredImages.length) {
      setCurrentIndex(currentIndex + imagesPerView);
    } else {
      setCurrentIndex(0);
    }
  }, [currentIndex, filteredImages.length, imagesPerView]);

  const handlePrev = () => {
    if (currentIndex - imagesPerView >= 0) {
      setCurrentIndex(currentIndex - imagesPerView);
    }
  };

  // Fetch images effect
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/gallery`);
        setImages(response.data);
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching images');
        setLoading(false);
        onDataLoaded();
      }
    };

    fetchImages();
  }, [onDataLoaded]);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNext]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  if (loading || error) {
    return null;
  }

  return (
    <div style={{ 
      padding: '20px 10px',
      position: 'relative',
      background: 'white',
      minHeight: '100vh'
    }}>
      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '30px',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <Button 
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'contained' : 'outlined'}
          style={{
            backgroundColor: filter === 'all' ? '#9c27b0' : 'transparent',
            color: filter === 'all' ? 'white' : 'black',
            borderColor: '#9c27b0'
          }}
        >
          ALL
        </Button>
        <Button 
          onClick={() => setFilter('AC')}
          variant={filter === 'AC' ? 'contained' : 'outlined'}
          style={{
            backgroundColor: filter === 'AC' ? '#9c27b0' : 'transparent',
            color: filter === 'AC' ? 'white' : 'black',
            borderColor: '#9c27b0'
          }}
        >
          AC BUS
        </Button>
        <Button 
          onClick={() => setFilter('Volvo')}
          variant={filter === 'Volvo' ? 'contained' : 'outlined'}
          style={{
            backgroundColor: filter === 'Volvo' ? '#9c27b0' : 'transparent',
            color: filter === 'Volvo' ? 'white' : 'black',
            borderColor: '#9c27b0'
          }}
        >
          VOLVO
        </Button>
        <Button 
          onClick={() => setFilter('EV')}
          variant={filter === 'EV' ? 'contained' : 'outlined'}
          style={{
            backgroundColor: filter === 'EV' ? '#9c27b0' : 'transparent',
            color: filter === 'EV' ? 'white' : 'black',
            borderColor: '#9c27b0'
          }}
        >
          EV
        </Button>
      </div>

      {/* Conditional rendering based on filter */}
      {filter === 'all' ? (
        // Slider view for 'all' filter
        <div style={{ 
          position: 'relative', 
          margin: '20px auto',
          maxWidth: window.innerWidth <= 768 ? '100%' : '1400px',
          background: 'white'
        }}>
          {filteredImages.length > 0 ? (
            <>
              {/* Previous button */}
              <button onClick={handlePrev} 
                style={{
                  position: 'absolute',
                  left: window.innerWidth <= 768 ? '10px' : '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'white',
                  border: '2px solid #ddd',
                  borderRadius: '50%',
                  width: window.innerWidth <= 768 ? 40 : 60,
                  height: window.innerWidth <= 768 ? 40 : 60,
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentIndex === 0 ? 0.5 : 1,
                  zIndex: 2,
                  fontSize: window.innerWidth <= 768 ? '20px' : '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                disabled={currentIndex === 0}
              >
                ←
              </button>
              
              {/* Slider container */}
              <div style={{ 
                display: 'flex', 
                gap: '0',
                justifyContent: 'center',
                padding: window.innerWidth <= 768 ? '0 20px' : '0 40px',
                background: 'white',
                height: window.innerWidth <= 768 ? '300px' : '500px'
              }}>
                {filteredImages.slice(currentIndex, currentIndex + imagesPerView).map((image, index) => (
                  <div key={index} style={{
                    flex: '1',
                    width: window.innerWidth <= 768 ? '100%' : '50%',
                    height: '100%',
                    overflow: 'hidden',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={`${config.baseUrl}${image.photo}`}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Next button */}
              <button onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: window.innerWidth <= 768 ? '10px' : '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'white',
                  border: '2px solid #ddd',
                  borderRadius: '50%',
                  width: window.innerWidth <= 768 ? 40 : 60,
                  height: window.innerWidth <= 768 ? 40 : 60,
                  cursor: currentIndex + imagesPerView >= filteredImages.length ? 'not-allowed' : 'pointer',
                  opacity: currentIndex + imagesPerView >= filteredImages.length ? 0.5 : 1,
                  zIndex: 2,
                  fontSize: window.innerWidth <= 768 ? '20px' : '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                disabled={currentIndex + imagesPerView >= filteredImages.length}
              >
                →
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'black' }}>
              <h3>No images found</h3>
            </div>
          )}
        </div>
      ) : (
        // Grid view for specific filters
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
          gap: '40px',
          padding: '20px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {filteredImages.map((image, index) => (
            <div key={index} style={{
              width: '100%',
              height: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <img
                src={`${config.baseUrl}${image.photo}`}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;