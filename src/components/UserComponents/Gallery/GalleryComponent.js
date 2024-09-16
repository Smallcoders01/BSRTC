import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css'; // Custom CSS file

// Import images from the correct path
import b1 from '../../../img/b1.jpg';
import b2 from '../../../img/b2.jpg';
import b3 from '../../../img/b3.jpg';
import b4 from '../../../img/b4.webp';
import b5 from '../../../img/b5.jpg';
import b6 from '../../../img/b6.jpg';
import b7 from '../../../img/b7.webp';
import b8 from '../../../img/b8.jpg';
import b9 from '../../../img/b9.jpeg';
import b10 from '../../../img/b10.avif';
import b11 from '../../../img/b11.jpeg';
import b12 from '../../../img/b12.avif';

const images = [
  { src: b1, alt: "Bus 1" },
  { src: b2, alt: "Bus 2" },
  { src: b3, alt: "Bus 3" },
  { src: b4, alt: "Bus 4" },
  { src: b5, alt: "Bus 5" },
  { src: b6, alt: "Bus 6" },
  { src: b7, alt: "Bus 7" },
  { src: b8, alt: "Bus 8" },
  { src: b9, alt: "Bus 9" },
  { src: b10, alt: "Bus 10" },
  { src: b11, alt: "Bus 11" },
  { src: b12, alt: "Bus 12" }
];

const Gallery = () => {
  return (
    <div className="container my-5" style={{ width: '80%' }}> {/* Set width to 80% */}
        <h1 className='text-center mb-5'>Gallery</h1>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
