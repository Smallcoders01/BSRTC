import React from 'react';
import { Card, Button, Carousel } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import './SneakPeek.css'; // Import a CSS file for extra styling if needed

const features = [
  {
    title: "Comfortable Seating",
    image: process.env.PUBLIC_URL + "/Routes/cs.jpg",
    alt: "Comfortable Seating",
  },
  {
    title: "Air Conditioning",
    image: process.env.PUBLIC_URL + "/Routes/ac.png",
    alt: "Air Conditioning",
  },
  {
    title: "Luggage Storage",
    image: process.env.PUBLIC_URL + "/Routes/lb.jpg",
    alt: "Luggage Storage",
  },
  {
    title: "Eco-Friendly Buses",
    image: process.env.PUBLIC_URL + "/Routes/eb.jpg",
    alt: "Eco-Friendly Buses",
  },
  {
    title: "Onboard Entertainment",
    image: process.env.PUBLIC_URL + "/Routes/tv.jpg",
    alt: "Onboard Entertainment",
  },
  {
    title: "Free Wi-Fi",
    image: process.env.PUBLIC_URL + "/Routes/wifi.jpg",
    alt: "Free Wi-Fi",
  },
];

const SneakPeek = () => {
  return (
    <div className="text-center mt-5" style={{ width: '100%', padding: '40px 60px', backgroundColor: '#fff' }}>
      <h2 className="mb-3" style={{ color: '#552e9a', fontWeight: 'bold' }}>A Sneak Peek Into Our World</h2>
      <p>Experience the lavish amenities of BSRTC!</p>

      {/* Carousel for sliding cards */}
      <Carousel
        slidesToShow={4} // Show 4 items at a time
        slidesToScroll={1} // Scroll one at a time
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        autoplay
        style={{ margin: '20px 0', padding: '0 20px' }} // Add margin for the carousel
      >
        {features.map((feature, index) => (
          <div key={index} style={{ padding: '0 15px' }}> {/* Padding around the slide */}
            <Card
              cover={
                <div style={{ position: 'relative' }}>
                  {/* Image */}
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    style={{
                      height: '250px',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '12px',
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.5))', // Light to dark gradient
                      borderRadius: '12px', // Ensure gradient follows the border radius
                    }}
                  ></div>
                  {/* Title over the image */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px', // Position text at the bottom
                      left: '0',
                      right: '0',
                      color: '#fff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '16px',
                    }}
                  >
                    {feature.title}
                  </div>
                </div>
              }
              bordered={false}
              bodyStyle={{ display: 'none' }} // Hide card body
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                textAlign: 'center',
                margin: '0', // No margin inside the card
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* "View All" button */}
      <Button type="primary" className="mt-4" style={{ backgroundColor: 'white', borderColor: '#552e9a', borderRadius: '10px', padding: '20px 20px', border: '2px solid #6f42c1', fontWeight: 'bold', color: '#6f42c1' }}>
        View All
      </Button>
    </div>
  );
};

export default SneakPeek;