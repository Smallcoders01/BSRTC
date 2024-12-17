import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';
import Footer from '../Footer/footer';
import axios from 'axios';
import config from '../../../config';
import { Button, Typography, Box, ImageList, ImageListItem } from '@mui/material';

const GalleryComponent = ({ onDataLoaded }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const language = localStorage.getItem('language') || 'en';
  const [galleryEvents, setGalleryEvents] = useState([]);
  const [eventIndices, setEventIndices] = useState({});

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

  // Modify the getImagesPerView function to return 1 for mobile
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

  // Add new useEffect to fetch gallery events
  useEffect(() => {
    const fetchGalleryEvents = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/gallery-events`);
        setGalleryEvents(response.data);
      } catch (error) {
        console.error('Error fetching gallery events:', error);
      }
    };

    fetchGalleryEvents();
  }, []);

  // Initialize indices for events when they are loaded
  useEffect(() => {
    if (galleryEvents.length > 0) {
      const indices = {};
      galleryEvents.forEach(event => {
        indices[event._id] = 0;
      });
      setEventIndices(indices);
    }
  }, [galleryEvents]);

  const handleEventNext = useCallback((eventId, totalPhotos) => {
    setEventIndices(prev => ({
      ...prev,
      [eventId]: prev[eventId] + 3 >= totalPhotos ? 0 : prev[eventId] + 3
    }));
  }, []);

  const handleEventPrev = useCallback((eventId, totalPhotos) => {
    setEventIndices(prev => ({
      ...prev,
      [eventId]: prev[eventId] - 3 >= 0 
        ? prev[eventId] - 3 
        : Math.floor((totalPhotos - 1) / 3) * 3
    }));
  }, []);

  if (loading || error) {
    return null;
  }

  return (
    <>
      <div className="gallery-section" style={{ 
        padding: window.innerWidth <= 768 ? '10px 0' : '20px 10px',
        position: 'relative',
        background: 'white',
        minHeight: 'auto',
        marginBottom: 1
      }}>
        {/* Filter Buttons - Make them stack on mobile */}
        <div style={{
          display: 'flex',
          justifyContent: 'center', // Changed to center for mobile
          marginBottom: '30px',
          gap: '10px',
          flexWrap: 'wrap',
          padding: '0 20px',
          maxWidth: '1400px',
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

        {/* Image Slider Section */}
        <div style={{ 
          position: 'relative', 
          margin: '20px auto',
          maxWidth: '1400px',
          background: 'white'
        }}>
          {shuffledImages.length > 0 ? (
            <>
              {/* Navigation Buttons */}
              <button onClick={handlePrev} 
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: window.innerWidth <= 768 ? 40 : 70, // Smaller on mobile
                  height: window.innerWidth <= 768 ? 40 : 70,
                  cursor: 'pointer',
                  zIndex: 2,
                  fontSize: window.innerWidth <= 768 ? '24px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                ‹
              </button>

              {/* Images Container */}
              <div style={{ 
                display: 'flex',
                gap: window.innerWidth <= 768 ? '0' : '20px',
                justifyContent: 'center',
                padding: '0',
                background: 'white',
                height: window.innerWidth <= 768 ? '250px' : '500px', // Smaller height on mobile
                overflow: 'hidden'
                
              }}>
                {(() => {
                  let imagesToShow = [];
                  const imagesPerView = getImagesPerView();
                  
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
                      margin: window.innerWidth <= 768 ? '0' : '0 10px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px'
                    }}>
                      <img
                        src={`${config.baseUrl}${image.photo}`}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: window.innerWidth <= 768 ? 'contain' : 'fill',
                        }}
                      />
                    </div>
                  ));
                })()}
              </div>

              {/* Next Button */}
              <button onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: window.innerWidth <= 768 ? 40 : 70, // Smaller on mobile
                  height: window.innerWidth <= 768 ? 40 : 70,
                  cursor: 'pointer',
                  zIndex: 2,
                  fontSize: window.innerWidth <= 768 ? '24px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
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

      {/* Gallery Events Section */}
      <Box 
        className="gallery-events-section"
        sx={{ 
          padding: window.innerWidth <= 768 ? '0' : '20px 10px',
          background: 'white',
          mt: window.innerWidth <= 768 ? 0 : 2
        }}
      >
        {galleryEvents.map((event) => (
          <Box 
            key={event._id} 
            className="event-card"
            sx={{ 
              margin: window.innerWidth <= 768 ? '10px 0' : '40px auto',
              maxWidth: '1400px',
              background: 'white'
            }}
          >
            {/* Event Category Title */}
            <div style={{
              display: 'flex',
              justifyContent: 'center', // Centered on mobile
              marginBottom: '20px',
              padding: '0 20px',
            }}>
              <Button 
                variant="contained"
                style={{
                  backgroundColor: '#9c27b0',
                  color: 'white',
                }}
              >
                {event.category}
              </Button>
            </div>

            {/* Event Images Container */}
            <div style={{ position: 'relative' }}>
              {/* Previous Button */}
              <button 
                onClick={() => handleEventPrev(event._id, event.photos.length)}
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: window.innerWidth <= 768 ? 40 : 70,
                  height: window.innerWidth <= 768 ? 40 : 70,
                  cursor: 'pointer',
                  zIndex: 2,
                  fontSize: window.innerWidth <= 768 ? '24px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                ‹
              </button>

              {/* Event Images */}
              <div style={{ 
                display: 'flex',
                gap: window.innerWidth <= 768 ? '0' : '20px',
                justifyContent: 'center',
                padding: '0',
                background: 'white',
                height: window.innerWidth <= 768 ? '250px' : '500px',
                overflow: 'hidden'
              }}>
                {(() => {
                  const startIndex = eventIndices[event._id] || 0;
                  const photosToShow = window.innerWidth <= 768 
                    ? [event.photos[startIndex]] // Show only one photo on mobile
                    : event.photos.slice(startIndex, startIndex + 3);

                  return photosToShow.map((photo, index) => (
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
                      margin: window.innerWidth <= 768 ? '0' : '0 10px',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px'
                    }}>
                      <img
                        src={`${config.baseUrl}${photo}`}
                        alt={`Event ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: window.innerWidth <= 768 ? 'contain' : 'fill',
                        }}
                      />
                    </div>
                  ));
                })()}
              </div>

              {/* Next Button */}
              <button 
                onClick={() => handleEventNext(event._id, event.photos.length)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  width: window.innerWidth <= 768 ? 40 : 70,
                  height: window.innerWidth <= 768 ? 40 : 70,
                  cursor: 'pointer',
                  zIndex: 2,
                  fontSize: window.innerWidth <= 768 ? '24px' : '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                ›
              </button>
            </div>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default GalleryComponent;