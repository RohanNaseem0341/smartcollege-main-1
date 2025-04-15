import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents } from '../services/api';
import '../styles/StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const data = await fetchStudents();
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    getStudents();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <div className="student-list-header">
        <div className="container py-4">
          <h1 className="display-5 fw-bold">Students</h1>
          <p className="lead text-muted">Browse and manage students</p>
        </div>
      </div>
    
      <div className="container mt-4">
        <div className="row">
          {students.map((student) => (
            <div className="col-md-4 mb-4" key={student.std_id}>
              <div className="student-card">
                <div className="student-card-body">
                  <div className="student-avatar">
                    {student.username.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="student-card-title">{student.username}</h5>
                  <p className="student-card-text">Department: {student.department}</p>
                  
                  <div className="student-card-actions">
                    <Link to={`/dashboard/${student.std_id}`} className="btn btn-primary me-2">
                      <i className="bi bi-speedometer2 me-1"></i> Dashboard
                    </Link>
                    <Link to={`/students/${student.std_id}`} className="btn btn-outline-primary">
                      <i className="bi bi-info-circle me-1"></i> Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList; 