import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  fetchStudentDetails, 
  fetchStudentGrades, 
  fetchStudentFees, 
  fetchStudentExams,
  fetchStudents,
  fetchStudentJobRecommendations
} from '../services/api';
import PaymentForm from './PaymentForm';
import JobRecommendations from './JobRecommendations';
import '../styles/StudentDetail.css';
import '../styles/JobRecommendations.css';

// React-bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

const StudentDetail = () => {
  const { studentId } = useParams();
  const [studentName, setStudentName] = useState('');
  const [studentDept, setStudentDept] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [fees, setFees] = useState([]);
  const [exams, setExams] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);

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
        
        // Fetch student fees
        const feesData = await fetchStudentFees(studentId);
        setFees(feesData);
        
        // Fetch student exams
        const examsData = await fetchStudentExams(studentId);
        setExams(examsData);
        
        // Fetch job recommendations
        const jobsData = await fetchStudentJobRecommendations(studentId);
        setJobs(jobsData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };

    loadStudentData();
  }, [studentId]);

  const handlePaymentClick = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentComplete = (paymentData) => {
    if (paymentData) {
      setPaymentSuccess(true);
      setPaymentInfo(paymentData);
      
      // In a real application, you would make an API call to update the fee status
      const updatedFees = fees.map(fee => ({
        ...fee,
        status: 'paid'
      }));
      setFees(updatedFees);
    }
    
    setShowPaymentForm(false);
  };

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
    <div className="student-detail-container">
      <div className="student-profile-header">
        <Container>
          <Row>
            <Col className="d-flex align-items-center">
              <div className="student-avatar">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div className="student-info">
                <h1 className="student-name">{studentName}</h1>
                <div className="student-meta">
                  <span className="dept-badge">{studentDept}</span>
                  <span className="id-badge">ID: {studentId}</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <Container>
        <Tab.Container id="student-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="courses">
                <i className="bi bi-book"></i> Courses
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="grades">
                <i className="bi bi-graph-up"></i> Grades
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fees">
                <i className="bi bi-cash-coin"></i> Fees
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="exams">
                <i className="bi bi-calendar-check"></i> Exams
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="jobs">
                <i className="bi bi-briefcase"></i> Career
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Tab.Content>
            <Tab.Pane eventKey="courses">
              <Card>
                <Card.Header>Enrolled Courses</Card.Header>
                <Card.Body>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Attendance</th>
                        <th>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={index}>
                          <td>{course.course}</td>
                          <td>{course.course}</td>
                          <td>{course.attendance}/{course.total_attendance} ({course.attendance_percentage.toFixed(1)}%)</td>
                          <td>{course.mid_marks}/{course.total_marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>
            
            <Tab.Pane eventKey="grades">
              <Card>
                <Card.Header>Academic Performance</Card.Header>
                <Card.Body>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Grade Type</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade, index) => (
                        <tr key={index}>
                          <td>{grade.grade}</td>
                          <td>{grade.gpa1 !== undefined ? grade.gpa1 : 
                           grade.gpa2 !== undefined ? grade.gpa2 : 
                           grade.gpa3 !== undefined ? grade.gpa3 : 
                           grade.gpa4 !== undefined ? grade.gpa4 : 
                           grade.cgpa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>
            
            <Tab.Pane eventKey="fees">
              <Card>
                <Card.Header>Fee Status</Card.Header>
                <Card.Body>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((fee, index) => (
                        <tr key={index}>
                          <td>${fee.ammount}</td>
                          <td>
                            <Badge bg={fee.status === 'paid' ? 'success' : 'danger'}>
                              {fee.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td>
                            {fee.status !== 'paid' && (
                              <Button variant="primary" size="sm" onClick={handlePaymentClick}>
                                Pay Now
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  
                  <div className="mt-4">
                    <h5>Payment Information</h5>
                    <p>
                      <strong>Easypaisa Account:</strong> 03417220826
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Tab.Pane>
            
            <Tab.Pane eventKey="exams">
              <Card>
                <Card.Header>Upcoming Exams</Card.Header>
                <Card.Body>
                  {exams.map((exam, index) => (
                    <div key={index} className="exam-schedule">
                      <h5>{exam.coursename}</h5>
                      <p className="mb-1">
                        <strong className="exam-date">{new Date(exam.date).toLocaleDateString()}</strong> 
                        • {exam.time}
                      </p>
                      <p className="text-muted">Room: {exam.venue}</p>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Tab.Pane>
            
            <Tab.Pane eventKey="jobs">
              <JobRecommendations jobs={jobs} />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
      
      {showPaymentForm && (
        <Container className="mt-4">
          <PaymentForm 
            studentId={studentId} 
            amount={fees[0]?.ammount || 0} 
            onPaymentComplete={handlePaymentComplete} 
          />
        </Container>
      )}
      
      {paymentSuccess && (
        <Container className="mt-4">
          <div className="alert alert-success">
            <h5 className="alert-heading">Payment Successful!</h5>
            <p>Your payment has been processed successfully.</p>
            <hr />
            <p className="mb-0"><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
            <p className="mb-0"><strong>Date:</strong> {new Date(paymentInfo.date).toLocaleString()}</p>
          </div>
        </Container>
      )}
    </div>
  );
};

export default StudentDetail;