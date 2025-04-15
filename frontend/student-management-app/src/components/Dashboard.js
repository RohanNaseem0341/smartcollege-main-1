import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  fetchStudentDetails, 
  fetchStudentGrades, 
  fetchStudentFees, 
  fetchStudentExams,
  fetchStudents
} from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { studentId } = useParams();
  const [studentName, setStudentName] = useState('');
  const [studentDept, setStudentDept] = useState('');
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [fees, setFees] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cgpa, setCgpa] = useState(0);

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        setLoading(true);
        
        // Fetch student basic info
        const studentsData = await fetchStudents();
        const currentStudent = studentsData.find(s => s.std_id.toString() === studentId.toString());
        
        if (currentStudent) {
          setStudentName(currentStudent.username);
          setStudentDept(currentStudent.department);
        }
        
        // Fetch student course details
        const coursesData = await fetchStudentDetails(studentId);
        setCourses(coursesData);
        
        // Fetch student grades
        const gradesData = await fetchStudentGrades(studentId);
        setGrades(gradesData);
        
        // Find CGPA
        const cgpaObj = gradesData.find(grade => grade.grade === "CGPA");
        setCgpa(cgpaObj ? cgpaObj.cgpa : 0);
        
        // Fetch student fees
        const feesData = await fetchStudentFees(studentId);
        setFees(feesData);
        
        // Fetch student exams
        const examsData = await fetchStudentExams(studentId);
        setExams(examsData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading dashboard:', err);
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };

    loadStudentData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-overlay">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading your dashboard...</p>
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

  // Calculate attendance statistics
  const totalAttendance = courses.reduce((total, course) => total + course.attendance, 0);
  const maxAttendance = courses.reduce((total, course) => total + course.total_attendance, 0);
  const attendancePercentage = Math.round((totalAttendance / maxAttendance) * 100) || 0;
  
  // Get upcoming exam
  const upcomingExam = exams.length > 0 ? exams[0] : null;
  
  // Get fee status
  const feeStatus = fees.length > 0 ? fees[0].status : 'unknown';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="container py-4">
          <div className="d-flex align-items-center mb-2">
            <div className="student-dashboard-avatar">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div className="ms-3">
              <h1 className="display-5 fw-bold mb-0">{studentName}</h1>
              <p className="lead text-muted">
                {studentDept} Department
                <span className="ms-2 badge bg-secondary">Student ID: {studentId}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-4">
        <div className="row">
          {/* Stats Cards */}
          <div className="col-md-8">
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="stat-card">
                  <div className="stat-card-body">
                    <h5 className="stat-card-title">CGPA</h5>
                    <div className="d-flex align-items-center">
                      <div className={`cgpa-indicator ${cgpa >= 3.0 ? 'high' : cgpa >= 2.0 ? 'medium' : 'low'}`}>
                        {cgpa.toFixed(2)}
                      </div>
                      <span className="ms-2 text-muted">out of 4.0</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="stat-card">
                  <div className="stat-card-body">
                    <h5 className="stat-card-title">Attendance</h5>
                    <div className="d-flex align-items-center">
                      <div className="attendance-progress">
                        <div 
                          className="attendance-fill" 
                          style={{ width: `${attendancePercentage}%` }}
                        ></div>
                      </div>
                      <span className="ms-2">{attendancePercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="stat-card">
                  <div className="stat-card-body">
                    <h5 className="stat-card-title">Fee Status</h5>
                    <div>
                      <span className={`badge ${feeStatus === 'paid' ? 'bg-success' : 'bg-danger'} p-2`}>
                        {feeStatus === 'paid' ? 'PAID' : 'UNPAID'}
                      </span>
                      {feeStatus !== 'paid' && (
                        <Link to={`/students/${studentId}`} className="ms-2 small text-primary">
                          Pay Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course Progress */}
            <div className="dashboard-card mb-4">
              <div className="dashboard-card-header">
                <h5>Course Progress</h5>
                <Link to={`/students/${studentId}`} className="btn btn-sm btn-outline-primary">View All</Link>
              </div>
              <div className="dashboard-card-body">
                {courses.slice(0, 3).map((course, index) => (
                  <div key={index} className="course-progress-item">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="course-name">{course.course}</span>
                      <span className="course-score">
                        {course.mid_marks}/{course.total_marks} marks
                      </span>
                    </div>
                    <div className="progress">
                      <div 
                        className="progress-bar" 
                        role="progressbar" 
                        style={{ width: `${course.attendance_percentage}%` }}
                        aria-valuenow={course.attendance_percentage} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {Math.round(course.attendance_percentage)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Grades */}
            <div className="dashboard-card mb-4">
              <div className="dashboard-card-header">
                <h5>Recent Grades</h5>
                <Link to={`/students/${studentId}`} className="btn btn-sm btn-outline-primary">View All</Link>
              </div>
              <div className="dashboard-card-body">
                {grades.slice(0, 3).map((grade, index) => (
                  <div key={index} className="grade-item d-flex justify-content-between align-items-center mb-2">
                    <span className="grade-name">{grade.grade}</span>
                    <span className={`grade-value badge ${
                      grade.cgpa >= 3.5 || grade.gpa1 >= 3.5 || grade.gpa2 >= 3.5 || grade.gpa3 >= 3.5 || grade.gpa4 >= 3.5 
                        ? 'bg-success' 
                        : grade.cgpa >= 2.5 || grade.gpa1 >= 2.5 || grade.gpa2 >= 2.5 || grade.gpa3 >= 2.5 || grade.gpa4 >= 2.5
                          ? 'bg-primary'
                          : 'bg-warning'
                    }`}>
                      {grade.cgpa !== undefined 
                        ? grade.cgpa 
                        : grade.gpa1 !== undefined 
                          ? grade.gpa1 
                          : grade.gpa2 !== undefined 
                            ? grade.gpa2 
                            : grade.gpa3 !== undefined 
                              ? grade.gpa3 
                              : grade.gpa4
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Side Widgets */}
          <div className="col-md-4">
            {/* Upcoming Exam */}
            <div className="dashboard-card mb-4">
              <div className="dashboard-card-header">
                <h5>Next Exam</h5>
              </div>
              <div className="dashboard-card-body">
                {upcomingExam ? (
                  <div className="upcoming-exam">
                    <div className="exam-course">{upcomingExam.coursename}</div>
                    <div className="exam-date-time">
                      <i className="bi bi-calendar-event"></i> {new Date(upcomingExam.date).toLocaleDateString()}
                      <i className="bi bi-clock ms-3"></i> {upcomingExam.time}
                    </div>
                    <div className="exam-venue">
                      <i className="bi bi-geo-alt"></i> {upcomingExam.venue}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted">No upcoming exams scheduled</p>
                )}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="dashboard-card mb-4">
              <div className="dashboard-card-header">
                <h5>Quick Actions</h5>
              </div>
              <div className="dashboard-card-body">
                <div className="quick-links">
                  <Link to={`/students/${studentId}`} className="quick-link-item">
                    <i className="bi bi-mortarboard"></i>
                    <span>View Grades</span>
                  </Link>
                  <Link to={`/students/${studentId}`} className="quick-link-item">
                    <i className="bi bi-cash-coin"></i>
                    <span>Pay Fees</span>
                  </Link>
                  <Link to={`/students/${studentId}`} className="quick-link-item">
                    <i className="bi bi-calendar-check"></i>
                    <span>Exam Schedule</span>
                  </Link>
                  <Link to={`/students/${studentId}`} className="quick-link-item">
                    <i className="bi bi-person"></i>
                    <span>Profile</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 