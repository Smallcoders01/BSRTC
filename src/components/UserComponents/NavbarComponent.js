import React, { useState, useContext, useRef } from 'react';
import { Navbar, Nav, Container, Dropdown, Overlay } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from '../UserComponents/Login/LoginComp';
import SignupModal from '../UserComponents/Login/SignComp';
import { AuthContext } from '../../context/AuthContext';
import { FaCog, FaUser, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const NavbarComponent = ({ onToggle }) => {
  const { user, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const target = useRef(null);

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
            <Nav.Link as={Link} to="/" style={navStyle(expanded, isActive('/'))}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={navStyle(expanded, isActive('/about'))}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/gallery" style={navStyle(expanded, isActive('/gallery'))}>Gallery</Nav.Link>
            <Nav.Link as={Link} to="/directory" style={navStyle(expanded, isActive('/directory'))}>Directory</Nav.Link>
            <Nav.Link as={Link} to="/contact" style={navStyle(expanded, isActive('/contact'))}>Contact Us</Nav.Link>
            <Nav.Link as={Link} to="/ticket" style={navStyle(expanded, isActive('/ticket'))}>Tickets</Nav.Link>
            {user ? (
              <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                  <FaCog size={24} />
                </Dropdown.Toggle>

                <Dropdown.Menu style={dropdownMenuStyle}>
                  <Dropdown.Item as="div">
                    <div style={userInfoStyle}>
                      <span>{user.name}</span>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/profile"><FaUserCircle /> View Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}><FaSignOutAlt /> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={settingsButtonStyle}
  >
    {children}
  </a>
));

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

const settingsButtonStyle = {
  color: '#ffffff',
  backgroundColor: 'transparent',
  border: 'none',
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
};

const dropdownMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  padding: '10px 0',
  zIndex: 1050,
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 15px',
  gap: '10px',
};

export default NavbarComponent;