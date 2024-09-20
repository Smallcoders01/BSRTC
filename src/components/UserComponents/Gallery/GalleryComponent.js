import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css'; // Custom CSS file
import Footer from '../Footer/footer';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch images from the backend API
    axios.get('http://localhost:5000/api/gallery')
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching images');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="container my-5" style={{ width: '80%' }}> {/* Set width to 80% */}
        <h1 className='text-center mb-5'>Gallery</h1>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={`http://localhost:5000${image.photo}`}
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

export default Gallery;