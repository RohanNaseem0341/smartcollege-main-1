import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { FaBriefcase, FaMoneyBillWave, FaUserGraduate, FaExternalLinkAlt } from 'react-icons/fa';

const JobRecommendations = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return (
      <Card className="mb-4">
        <Card.Header className="d-flex align-items-center">
          <FaBriefcase className="me-2" /> Job Recommendations
        </Card.Header>
        <Card.Body className="text-center py-5">
          <p className="text-muted mb-0">No job recommendations available for your courses.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mb-4 job-recommendations-card">
      <Card.Header className="d-flex align-items-center">
        <FaBriefcase className="me-2" /> Job Recommendations Based on Your Courses
      </Card.Header>
      <Card.Body>
        {jobs.map((job, index) => (
          <div key={index} className="job-item mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">{job.job_title}</h5>
              <Badge bg="info" className="course-badge">
                {job.course_name}
              </Badge>
            </div>
            
            <p className="job-description mb-3">{job.description}</p>
            
            <div className="d-flex flex-wrap gap-3 mb-3">
              <div className="salary-info">
                <div className="d-flex align-items-center text-success">
                  <FaMoneyBillWave className="me-1" /> 
                  <span className="fw-bold">Entry Salary:</span>
                </div>
                <div>{job.entry_salary}</div>
              </div>
              
              <div className="salary-info">
                <div className="d-flex align-items-center text-success">
                  <FaUserGraduate className="me-1" /> 
                  <span className="fw-bold">Experienced Salary:</span>
                </div>
                <div>{job.experienced_salary}</div>
              </div>
            </div>
            
            <div className="text-end">
              <Button 
                variant="outline-primary" 
                size="sm" 
                href={job.job_website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="job-link-btn"
              >
                View Job Listings <FaExternalLinkAlt className="ms-1" />
              </Button>
            </div>
            
            {index < jobs.length - 1 && <hr className="my-4" />}
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default JobRecommendations; 