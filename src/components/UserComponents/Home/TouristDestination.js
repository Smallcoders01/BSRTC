import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const destinations = [
  {
    name: "Bodh Gaya",
    imgUrl: "/Routes/bg.jpeg",
    alt: "Bodh Gaya",
  },
  {
    name: "Vaishali",
    imgUrl: "/Routes/vaishali.jpg",
    alt: "Vaishali",
  },
  {
    name: "Nalanda",
    imgUrl: "/Routes/nalanda.jpeg",
    alt: "Nalanda",
  },
  {
    name: "Patna",
    imgUrl: "/Routes/patna.jpeg",
    alt: "Patna",
  },
];

const TouristDestination = () => {
  return (
    <div className="container my-5  border-secondary rounded-4 p-4 shadow-lg bg-light">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-10">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Tourists Destination</h2>
            <p className="text-muted">
              Planning to explore Bihar this season? Whether you're heading home or off on an adventure, we have the travel resources to get you to your destination.
            </p>
            <button className="btn btn-outline-dark">View All</button>
          </div>

          <div className="row">
            {/* Left column */}
            <div className="col-md-6 mb-4">
              <div className="card text-white  p-4 h-100 border border-secondary rounded-3 shadow-sm"style={{ backgroundColor: '#86469C', color: 'white', padding: '16px' }}>
                <h3 className="fw-bold">Discover Bihar: A Treasure Trove of History and Culture</h3>
                <p>
                  Bihar is home to numerous architectural wonders, from the ancient stupas and monasteries to the grand forts and palaces. The ruins of Nalanda University, the Ashokan Pillar in Vaishali, and the Rajgir hills' ancient caves offer glimpses into the state's glorious past. The Golghar in Patna and the Barabar Caves near Gaya are also significant attractions that showcase the state's architectural prowess.
                </p>
              </div>
            </div>

            {/* Right column with images */}
            <div className="col-md-6">
              <div className="row">
                {destinations.map((destination, index) => (
                  <div className="col-sm-6 mb-4" key={index}>
                    <div className="card h-100 border-0 shadow-lg position-relative overflow-hidden rounded-3">
                      <img
                        src={destination.imgUrl}
                        className="card-img-top img-fluid rounded-3"
                        alt={destination.alt}
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                      <div className="card-overlay d-flex justify-content-between align-items-end p-3 rounded-3">
                        <h5 className="card-title text-white">{destination.name}</h5>
                        <a href="#" className="btn btn-light btn-sm shadow-sm">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDestination;
