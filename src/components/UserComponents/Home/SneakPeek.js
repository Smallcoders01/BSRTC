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
  const responsiveSettings = [
    {
      breakpoint: 768, // For tablets
      settings: {
        slidesToShow: 2, // Show 2 items
      },
    },
    {
      breakpoint: 480, // For mobile devices
      settings: {
        slidesToShow: 1, // Show 1 item
      },
    },
    {
      breakpoint: 992, // For larger screens
      settings: {
        slidesToShow: 3, // Show 3 items
      },
    },
    {
      breakpoint: 1200, // Default for desktop
      settings: {
        slidesToShow: 4, // Show 4 items
      },
    },
  ];

  return (
    <div className="text-center mt-5" style={{ width: '100%', padding: '40px 60px', backgroundColor: '#fff' }}>
      <h2 className="mb-3" style={{ color: '#552e9a', fontWeight: 'bold' }}>A Sneak Peek Into Our World</h2>
      <p>Experience the lavish amenities of BSRTC!</p>

      {/* Carousel for sliding cards */}
      <Carousel
        dots={false} // Disable dots if needed
        slidesToShow={4} // Default to 4 items
        slidesToScroll={1}
        arrows
        prevArrow={<LeftOutlined />}
        nextArrow={<RightOutlined />}
        autoplay
        responsive={responsiveSettings} // Apply responsive settings
        style={{ margin: '20px 0', padding: '0 20px' }}
      >
        {features.map((feature, index) => (
          <div key={index} style={{ padding: '0 15px' }}>
            <Card
              cover={
                <div style={{ position: 'relative' }}>
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
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.5))',
                      borderRadius: '12px',
                    }}
                  ></div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
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
              bodyStyle={{ display: 'none' }}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                textAlign: 'center',
                margin: '0',
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* "View All" button */}
      
    </div>
  );
};

export default SneakPeek;