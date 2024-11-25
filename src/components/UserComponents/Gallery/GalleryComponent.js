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

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Use shuffled images for rendering
  const shuffledImages = shuffleArray(filteredImages);

  // Modify the getImagesPerView function to return 3 for desktop
  const getImagesPerView = () => {
    return window.innerWidth <= 768 ? 1 : 3;
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
    if (currentIndex + imagesPerView < shuffledImages.length) {
      setCurrentIndex(currentIndex + imagesPerView);
    } else {
      // When we reach the end, we need to handle the circular display
      const remainingImages = shuffledImages.length - currentIndex;
      if (remainingImages < imagesPerView) {
        // Show images from the beginning to complete the view
        const imagesToShow = shuffledImages.slice(currentIndex)
          .concat(shuffledImages.slice(0, imagesPerView - remainingImages));
        setCurrentIndex(0);
      } else {
        setCurrentIndex(0);
      }
    }
  }, [currentIndex, shuffledImages.length, imagesPerView]);

  const handlePrev = useCallback(() => {
    if (currentIndex - imagesPerView >= 0) {
      setCurrentIndex(currentIndex - imagesPerView);
    } else {
      // When going backwards from the start, jump to the appropriate position at the end
      setCurrentIndex(Math.floor((shuffledImages.length - 1) / imagesPerView) * imagesPerView);
    }
  }, [currentIndex, shuffledImages.length, imagesPerView]);

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
    }, 3000);

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
        justifyContent: 'flex-end',
        marginBottom: '30px',
        gap: '10px',
        flexWrap: 'wrap',
        paddingRight: '20px',
        maxWidth: window.innerWidth <= 768 ? '100%' : '1400px',
        margin: '0 auto'
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
          onClick={() => setFilter('CNG')}
          variant={filter === 'CNG' ? 'contained' : 'outlined'}
          style={{
            backgroundColor: filter === 'CNG' ? '#9c27b0' : 'transparent',
            color: filter === 'CNG' ? 'white' : 'black',
            borderColor: '#9c27b0'
          }}
        >
          CNG
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

      {/* Remove conditional rendering and use slider for all cases */}
      <div style={{ 
        position: 'relative', 
        margin: '20px auto',
        maxWidth: window.innerWidth <= 768 ? '100%' : '1400px',
        background: 'white'
      }}>
        {shuffledImages.length > 0 ? (
          <>
            {/* Previous button */}
            <button onClick={handlePrev} 
              style={{
                position: 'absolute',
                left: window.innerWidth <= 768 ? '10px' : '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: window.innerWidth <= 768 ? 50 : 70,
                height: window.innerWidth <= 768 ? 50 : 70,
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: currentIndex === 0 ? 0.5 : 1,
                zIndex: 2,
                fontSize: window.innerWidth <= 768 ? '30px' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
              disabled={currentIndex === 0}
            >
              ‹
            </button>
            
            {/* Slider container */}
            <div style={{ 
              display: 'flex',
              gap: '20px',  // Added gap between images
              justifyContent: 'center',
              padding: window.innerWidth <= 768 ? '0' : '0',
              background: 'white',
              height: window.innerWidth <= 768 ? '300px' : '500px'
            }}>
              {(() => {
                let imagesToShow = [];
                if (shuffledImages.length > 0) {
                  const remainingImages = shuffledImages.length - currentIndex;
                  if (remainingImages >= imagesPerView) {
                    imagesToShow = shuffledImages.slice(currentIndex, currentIndex + imagesPerView);
                  } else {
                    imagesToShow = [
                      ...shuffledImages.slice(currentIndex),
                      ...shuffledImages.slice(0, imagesPerView - remainingImages)
                    ];
                  }
                }
                return imagesToShow.map((image, index) => (
                  <div key={index} style={{
                    flex: '1',
                    width: window.innerWidth <= 768 ? '100%' : '33.33%',
                    height: '100%',
                    overflow: 'hidden',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0',
                    margin: '0 10px',  // Added horizontal margin
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',  // Optional: added shadow for better separation
                    borderRadius: '8px'  // Optional: added rounded corners
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
                ));
              })()}
            </div>

            {/* Next button */}
            <button onClick={handleNext}
              style={{
                position: 'absolute',
                right: window.innerWidth <= 768 ? '10px' : '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: window.innerWidth <= 768 ? 50 : 70,
                height: window.innerWidth <= 768 ? 50 : 70,
                cursor: currentIndex + imagesPerView >= shuffledImages.length ? 'not-allowed' : 'pointer',
                opacity: currentIndex + imagesPerView >= shuffledImages.length ? 0.5 : 1,
                zIndex: 2,
                fontSize: window.innerWidth <= 768 ? '30px' : '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}
              disabled={currentIndex + imagesPerView >= shuffledImages.length}
            >
              ›
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: 'black' }}>
            <h3>No images found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryComponent;