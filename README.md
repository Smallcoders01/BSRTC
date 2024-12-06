# BSRTC - Bihar State Bus Booking Portal

Official bus booking application for Bihar State Road Transport Corporation (BSRTC). This web application allows users to book government bus tickets across Bihar easily and securely.

## 🚀 Features

### Bus Operations
- Depot information and management
- Division-wise bus operations
- Popular route tracking
- Tourist destination services
- Real-time bus tracking

### User Management
- User authentication and authorization
- Profile management
- Multi-language support (English & Hindi)
- Personalized user dashboard

### News & Information
- Latest news and announcements
- Flash news updates
- Photo gallery
- Event galleries
- Tender notifications

### Policy Management
- Comprehensive booking policies
- Cancellation policies
- Privacy policy
- Terms and conditions
- FAQ support

### Support Services
- Contact form submission
- Directory information
- Phone directory access
- Customer support

### Administrative Features
- Admin panel for content management
- Document upload and management
- News and event management
- Policy updates
- User management
- Gallery management

### Technical Features
- Secure JWT authentication
- File upload capabilities
- Multi-language content
- Mobile responsive design
- Real-time updates

## 🛠 Tech Stack

- Frontend: React.js
- Backend: Node.js/Express
- Database: MongoDB
- Authentication: JWT
- Styling: Bootstrap & Custom CSS
- State Management: Context API

## ⚙️ Configuration

The application uses a configuration file located at `src/config.js`:

## 🔑 API Endpoints

### Authentication
- `/api/auth/*` - Authentication and user management

### Bus Operations
- `/api/depots/*` - Depot management and information
- `/api/divisions/*` - Division management
- `/api/popular-routes/*` - Popular bus routes information
- `/api/tourist-destinations/*` - Tourist destination routes

### Content Management
- `/api/about-us/*` - About BSRTC information
- `/api/about-profile/*` - Profile management
- `/api/news/*` - News and announcements
- `/api/flash-news/*` - Flash news updates
- `/api/gallery/*` - Photo gallery
- `/api/gallery-events/*` - Event gallery
- `/api/tenders/*` - Tender notices

### Policies and Information
- `/api/policies/*` - General policies
- `/api/booking-policy/*` - Booking related policies
- `/api/cancellation-policy/*` - Cancellation related policies
- `/api/privacy/*` - Privacy policy
- `/api/terms/*` - Terms and conditions
- `/api/faq/*` - Frequently asked questions

### Contact and Support
- `/api/contact/*` - Contact form submissions
- `/api/contact-info/*` - Contact information
- `/api/phone-directory/*` - Phone directory

### File Management
- `/uploads/*` - Static file serving for uploaded content

### API Features
- CORS enabled with specific origin restrictions
- JWT Authentication
- File upload capability
- Error handling middleware
- Morgan logging
- Body parsing for JSON
- Static file serving
