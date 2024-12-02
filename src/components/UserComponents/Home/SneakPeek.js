import React from 'react';
import { Card, Carousel } from 'antd';
import './SneakPeek.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <LeftOutlined
      className={className}
      style={{ ...style, fontSize: '24px', color: '#552e9a', zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <RightOutlined
      className={className}
      style={{ ...style, fontSize: '24px', color: '#552e9a', zIndex: 1 }}
      onClick={onClick}
    />
  );
};

const features = [
  {
    titleEn: "Luggage Storage",
    titleHi: "सामान रखने की जगह",
    image: process.env.PUBLIC_URL + "/Routes/luggage_storage.jpg",
    alt: "Luggage Storage",
  },
  {
    titleEn: "Eco-Friendly Buses",
    titleHi: "पर्यावरण-अनुकूल बसें",
    image: process.env.PUBLIC_URL + "/Routes/eco_friendly_buses.jpg",
    alt: "Eco-Friendly Buses",
  },
  {
    titleEn: "Comfortable Seating",
    titleHi: "आरामदायक सीटें",
    image: process.env.PUBLIC_URL + "/Routes/cs.jpg",
    alt: "Comfortable Seating",
  },
  {
    titleEn: "Air Conditioning",
    titleHi: "वातानुकूलन",
    image: process.env.PUBLIC_URL + "/Routes/ac.png",
    alt: "Air Conditioning",
  },
  {
    titleEn: "Online Ticketing",
    titleHi: "ऑनलाइन टिकटिंग",
    image: process.env.PUBLIC_URL + "/Routes/Online_Ticketing.png",
    alt: "Online Ticketing",
  },
  {
    titleEn: "Mobile Application",
    titleHi: "मोबाइल एप्लिकेशन",
    image: process.env.PUBLIC_URL + "/Routes/Mobile App.png",
    alt: "Mobile Application",
  },
  {
    titleEn: "Bus Tracking System",
    titleHi: "बस ट्रैकिंग सिस्टम",
    image: process.env.PUBLIC_URL + "/Routes/Bus Tracking.png",
    alt: "Bus Tracking System",
  },
  {
    titleEn: "Cashless Transactions",
    titleHi: "कैशलेस लेन-देन",
    image: process.env.PUBLIC_URL + "/Routes/Cashless Transaction.png",
    alt: "Cashless Transactions",
  },
];


const SneakPeek = () => {
  const language = localStorage.getItem('language') || 'en'; // Get the selected language

  const responsiveSettings = [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
  ];

  return (
    <div className="text-center mt-5" style={{ width: '100%', padding: '20px', backgroundColor: '#fff' }}>
      <h2 className="mb-3" style={{ color: '#552e9a', fontWeight: 'bold' }}>
        {language === 'en' ? 'A Sneak Peek Into Our World' : 'हमारी दुनिया की एक झलक'}
      </h2>
      <p>
        {language === 'en' ? 'Experience the lavish amenities of BSRTC!' : 'बीएसआरटीसी की शानदार सुविधाओं का अनुभव करें!'}
      </p>

      <Carousel
        dots={false}
        slidesToShow={4}
        slidesToScroll={1}
        arrows={true} // Enable arrows
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
        autoplay
        autoplaySpeed={1000} // Set autoplay speed to 1 second
        speed={1000} // Set slide transition speed to 1 second
        responsive={responsiveSettings}
        style={{ margin: '20px 0' }}
      >
        {features.map((feature, index) => (
          <div key={index} style={{ padding: '0 5px' }}>
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
                    {language === 'en' ? feature.titleEn : feature.titleHi}
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
    </div>
  );
};

export default SneakPeek;