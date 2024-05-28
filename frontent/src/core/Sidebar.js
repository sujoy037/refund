import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css'; // Import your sidebar CSS file here if needed
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem('authToken');
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="sidebar bg-primary text-white">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="menu list-unstyled">
        <li>
          <a href="/home" className="text-white">
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </li>
        <li>
          <a href="/home" className="text-white">
            <FontAwesomeIcon icon={faHome} />All user
          </a>
        </li>
        <li>
          <a href="/profile" className="text-white">
            <FontAwesomeIcon icon={faUser} /> Profile
          </a>
        </li>
        <li>
          <a href="/settings" className="text-white">
            <FontAwesomeIcon icon={faCog} /> Settings
          </a>
        </li>
      </ul>
      <div className="logout mt-auto">
        <button className="logout-btn btn btn-link text-white" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
