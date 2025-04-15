import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeachers } from '../services/api';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const data = await fetchTeachers();
        console.log('Teachers data:', data); // Add logging to inspect the API response
        setTeachers(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Failed to fetch teachers');
        setLoading(false);
      }
    };

    getTeachers();
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
    <div className="container mt-4">
      <h2 className="mb-4">Teachers</h2>
      <div className="row">
        {teachers.map((teacher) => (
          <div className="col-md-4 mb-4" key={teacher.teacher_id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{teacher.name}</h5>
                <p className="card-text">Username: {teacher.username}</p>
                <p className="card-text">
                  Course: {teacher.course_name || 'Not assigned'}
                </p>
                <Link to={`/teachers/${teacher.teacher_id}`} className="btn btn-primary">
                  View Students
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList; 