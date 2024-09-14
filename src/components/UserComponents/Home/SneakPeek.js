import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const features = [
  {
    title: "Comfortable Seating",
    image: "/Routes/cs.jpg",
    alt: "Comfortable Seating"
  },
  {
    title: "Air Conditioning",
    image: "/Routes/ac.png",
    alt: "Air Conditioning"
  },
  {
    title: "Luggage Storage",
    image: "/Routes/lb.jpeg",
    alt: "Luggage Storage"
  },
  {
    title: "Eco-Friendly Buses",
    image: "/Routes/eb.webp",
    alt: "Eco-Friendly Buses"
  },
];

const SneakPeek = () => {
  return (
    <div className="text-center mt-5 bg-light" style={{ width: '100%', padding: '40px 60px' }}>
      <h2 className="mb-3">A Sneak Peek Into Our World</h2>
      <p>Experience the lavish amenities of BSRTC!</p>
      
      <Row gutter={[16, 16]} justify="center">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card
              cover={
                <img 
                  src={feature.image} 
                  alt={feature.alt} 
                  style={{ 
                    height: '250px', 
                    objectFit: 'cover', 
                    borderRadius: '12px 12px 0 0' // Rounded corners only at the top
                  }} 
                />
              }
              bordered={false}
              bodyStyle={{ padding: '10px 0' }}
              style={{ 
                borderRadius: '12px', // Rounded corners for the entire card
                overflow: 'hidden', // Ensure content stays within rounded borders
                textAlign: 'center' // Center text within the card
              }}
            >
              <Card.Meta title={<span style={{ fontSize: '16px', fontWeight: 'bold' }}>{feature.title}</span>} />
            </Card>
          </Col>
        ))}
        <Col xs={24} sm={12} md={6} className="d-flex align-items-center justify-content-center">
          <Button shape="circle" icon={<RightOutlined />} size="large" />
        </Col>
      </Row>
      
      <Button type="primary" className="mt-4" style={{backgroundColor:'#86469C'}}>View All</Button>
    </div>
  );
};

export default SneakPeek;
