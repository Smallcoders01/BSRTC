import React from 'react';
import './Announcement.css'; // Import your CSS file

const Announcement = ({ announcements }) => {
    return (
        <div className="announcement-strip">
            <h2 className="announcement-title">Announcements</h2>
            <div className="announcement-container">
                <ul className="announcement-list">
                    {announcements.map((item) => (
                        <li key={item._id} className="announcement-item">
                            <a 
                                href={item.url} // Use the direct URL from the announcement
                                className="announcement-link" 
                                target="_blank" // Open in new tab
                                rel="noopener noreferrer" // Security measure
                            >
                                <span className="announcement-text">{item.title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Announcement; 