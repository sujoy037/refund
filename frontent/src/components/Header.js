import React from 'react';
import logo from './logo.png'; // Update the path to your logo file

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
            <a className="navbar-brand d-flex align-items-center" href="#">
                <img src={logo} alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                Refund Monitoring System
            </a>
        </nav>
    )
}

export default Header;
