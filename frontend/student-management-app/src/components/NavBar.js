import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const params = useParams();
  const [collapsed, setCollapsed] = useState(true);
  
  // Extract the studentId from the URL if present
  const studentId = params.studentId || 
    (location.pathname.includes('/students/') ? 
      location.pathname.split('/students/')[1] : null);
  
  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Student Portal
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
              >
                <i className="bi bi-people me-1"></i>
                Students
              </Link>
            </li>
            
            {studentId && (
              <li className="nav-item">
                <Link 
                  className={`nav-link ${location.pathname.includes('/dashboard/') ? 'active' : ''}`}
                  to={`/dashboard/${studentId}`}
                >
                  <i className="bi bi-speedometer2 me-1"></i>
                  Dashboard
                </Link>
              </li>
            )}
            
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/teachers' ? 'active' : ''}`}
                to="/teachers"
              >
                <i className="bi bi-person-workspace me-1"></i>
                Teachers
              </Link>
            </li>
            
            <li className="nav-item">
              <a 
                className="nav-link nav-action"
                href="https://easypaisa.com.pk/" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-credit-card me-1"></i>
                Pay Fees
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 