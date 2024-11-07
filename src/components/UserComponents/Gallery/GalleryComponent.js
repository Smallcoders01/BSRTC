import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';
import Footer from '../Footer/footer';
import axios from 'axios';
import config from '../../../config';
import { Carousel } from 'react-bootstrap';
import { ButtonGroup, Button } from '@mui/material';

const GalleryComponent = ({ onDataLoaded }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/gallery`);
        console.log('Fetched images:', response.data); // Debug log
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

  const filteredImages = images.filter(image => {
    console.log('Filtering image:', image.type, 'Current filter:', filter); // Debug log
    return filter === 'all' ? true : image.type === filter;
  });

  if (loading || error) {
    return null;
  }

  return (
    <div className="gallery-section">
      {/* Filter Buttons */}
      <div className="gallery-filter-buttons">
        <ButtonGroup 
          orientation={window.innerWidth <= 600 ? "vertical" : "horizontal"}
          size={window.innerWidth <= 600 ? "small" : "medium"}
        >
          <Button 
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'contained' : 'outlined'}
            className={filter === 'all' ? 'active' : ''}
          >
            ALL
          </Button>
          <Button 
            onClick={() => setFilter('EV')}
            variant={filter === 'EV' ? 'contained' : 'outlined'}
            className={filter === 'EV' ? 'active' : ''}
          >
            EV
          </Button>
          <Button 
            onClick={() => setFilter('petrol')}
            variant={filter === 'petrol' ? 'contained' : 'outlined'}
            className={filter === 'petrol' ? 'active' : ''}
          >
            PETROL
          </Button>
          <Button 
            onClick={() => setFilter('diesel')}
            variant={filter === 'diesel' ? 'contained' : 'outlined'}
            className={filter === 'diesel' ? 'active' : ''}
          >
            DIESEL
          </Button>
        </ButtonGroup>
      </div>

      {/* Carousel */}
      <div className="gallery-carousel-container">
        {filteredImages.length > 0 ? (
          <Carousel 
            controls={false}
            indicators={false}
            interval={3000}
            pause={false}
            className="gallery-carousel"
          >
            {filteredImages.map((image, index) => (
              <Carousel.Item key={index}>
                <div className="gallery-image-wrapper">
                  <img
                    src={`${config.baseUrl}${image.photo}`}
                    alt=""
                    className="gallery-image"
                  />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="no-images">
            <h3>No images found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryComponent;