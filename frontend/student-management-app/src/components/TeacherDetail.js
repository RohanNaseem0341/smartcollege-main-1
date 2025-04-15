import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTeacherDetails } from '../services/api';

const TeacherDetail = () => {
  const { teacherId } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeacherData = async () => {
      try {
        const data = await fetchTeacherDetails(teacherId);
        setStudents(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch teacher details');
        setLoading(false);
      }
    };

    loadTeacherData();
  }, [teacherId]);

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
      <h2 className="mb-4">Teacher's Students</h2>
      
      {students.length === 0 ? (
        <div className="alert alert-info">
          No students enrolled in this teacher's course.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Username</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.std_id}>
                  <td>{student.std_id}</td>
                  <td>{student.username}</td>
                  <td>
                    <Link to={`/students/${student.std_id}`} className="btn btn-sm btn-primary">
                      View Profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeacherDetail; 