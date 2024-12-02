import React, { useState, useContext, useRef } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from '../UserComponents/Login/LoginComp';
import SignupModal from '../UserComponents/Login/SignComp';
import { AuthContext } from '../../context/AuthContext';
import { FaCog, FaUserCircle, FaSignOutAlt, FaTicketAlt } from 'react-icons/fa';
import ReactDOM from 'react-dom';

const NavbarComponent = ({ onToggle }) => {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const toggleRef = useRef(null);

  const language = localStorage.getItem('language') || 'en';

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(!expanded);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleToggleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX - 200,
    });
    setShowDropdown(!showDropdown);
  };

  return (
    <Navbar
      expand="lg"
      bg={expanded ? "custom" : "transparent"}
      variant={expanded ? "light" : "dark"}
      expanded={expanded}
      onToggle={handleToggle}
      style={{
        zIndex: 1030,
        backgroundColor: expanded ? "#F5EFFF" : "transparent",
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{ fontSize: '2rem', color: expanded ? "#000" : "#fff" }}
        >
          B.S.R.T.C
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto justify-content-center w-100">
            <Nav.Link as={Link} to="/" style={navStyle(expanded, isActive('/'))}>
              {language === 'en' ? 'Home' : 'होम'}
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={navStyle(expanded, isActive('/about'))}>
              {language === 'en' ? 'About Us' : 'हमारे बारे में'}
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery" style={navStyle(expanded, isActive('/gallery'))}>
              {language === 'en' ? 'Gallery' : 'गैलरी'}
            </Nav.Link>
            <Nav.Link as={Link} to="/directory" style={navStyle(expanded, isActive('/directory'))}>
              {language === 'en' ? 'Directory' : 'निर्देशिका'}
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={navStyle(expanded, isActive('/contact'))}>
              {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
            </Nav.Link>
            {user ? (
              <>
                <div ref={toggleRef} onClick={handleToggleClick} style={settingsButtonStyle}>
                  <FaCog size={24} />
                </div>
                {showDropdown && ReactDOM.createPortal(
                  <CustomMenu style={{ ...dropdownMenuStyle, top: dropdownPosition.top, left: dropdownPosition.left }}>
                    <div style={userInfoStyle}>
                      <span>{user.name}</span>
                    </div>
                    <Dropdown.Divider />
                    <MenuItem icon={<FaUserCircle />} text={language === 'en' ? 'View Profile' : 'प्रोफ़ाइल देखें'} to="/profile" />
                    {user.role === 'admin' && (
                      <MenuItem icon={<FaCog />} text={language === 'en' ? 'Admin' : 'प्रशासन'} to="/admin" />
                    )}
                    <MenuItem icon={<FaTicketAlt />} text={language === 'en' ? 'My Booking' : 'मेरी बुकिंग'} to="/my-booking" />
                    <MenuItem icon={<FaSignOutAlt />} text={language === 'en' ? 'Logout' : 'लॉग आउट'} onClick={handleLogout} />
                  </CustomMenu>,
                  document.body
                )}
              </>
            ) : (
              <>
                <SignupModal />
                <LoginModal />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const CustomMenu = ({ children, style }) => {
  return (
    <div style={style}>
      {children}
    </div>
  );
};

const MenuItem = ({ icon, text, to, onClick }) => {
  const content = (
    <div style={menuItemStyle}>
      {icon}
      <span style={{ marginLeft: '10px' }}>{text}</span>
    </div>
  );

  return to ? (
    <Link to={to} style={menuItemLinkStyle}>{content}</Link>
  ) : (
    <div onClick={onClick} style={menuItemLinkStyle}>{content}</div>
  );
};

const navStyle = (expanded, isActive) => ({
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  fontFamily: 'Poppins, sans-serif',
  color: isActive ? '#fff' : (expanded ? '#000' : '#fff'),
  fontWeight: '500',
  letterSpacing: '1px',
  padding: isActive ? '8px 20px' : '8px 15px',
  margin: '0 5px',
  backgroundColor: isActive ? '#86469C' : 'transparent',
  borderRadius: '25px',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
});

const dropdownMenuStyle = {
  position: 'absolute',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  padding: '10px 0',
  zIndex: 9999,
  minWidth: '200px',
};

const userInfoStyle = {
  padding: '10px 15px',
  borderBottom: '1px solid #eee',
  fontWeight: 'bold',
};

const menuItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
};

const menuItemLinkStyle = {
  color: '#333',
  textDecoration: 'none',
  display: 'block',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
};

const settingsButtonStyle = {
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
};

export default NavbarComponent;