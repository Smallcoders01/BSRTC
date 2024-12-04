import React from 'react';

const Announcement = ({ announcements }) => {
    const language = localStorage.getItem('language') || 'en';

    return (
        <>
            <h3 className="announcement-title">
                {language === 'en' ? 'Announcements' : 'घोषणाएं'}
            </h3>
            {announcements.map((announcement, index) => (
                <div key={index} className="announcement-item">
                    <a href={announcement.url}>
                        {language === 'en' ? announcement.title : announcement.title_hindi}
                    </a>
                </div>
            ))}
        </>
    );
};

export default Announcement; 