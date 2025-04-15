import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function for error logging
const handleApiError = (endpoint, error) => {
  console.error(`API Error (${endpoint}):`, error);
  console.error('Error response:', error.response?.data);
  throw error;
};

// API functions for students
export const fetchStudents = async () => {
  try {
    const response = await apiClient.get('/students/');
    return response.data;
  } catch (error) {
    return handleApiError('fetchStudents', error);
  }
};

export const fetchStudentDetails = async (studentId) => {
  try {
    const response = await apiClient.get(`/students/${studentId}/`);
    return response.data;
  } catch (error) {
    return handleApiError(`fetchStudentDetails(${studentId})`, error);
  }
};

export const fetchStudentGrades = async (studentId) => {
  try {
    const response = await apiClient.get(`/students/grades/${studentId}/`);
    return response.data;
  } catch (error) {
    return handleApiError(`fetchStudentGrades(${studentId})`, error);
  }
};

export const fetchStudentFees = async (studentId) => {
  try {
    const response = await apiClient.get(`/students/fees/${studentId}/`);
    return response.data;
  } catch (error) {
    return handleApiError(`fetchStudentFees(${studentId})`, error);
  }
};

export const fetchStudentExams = async (studentId) => {
  try {
    const response = await apiClient.get(`/students/exam/${studentId}/`);
    return response.data;
  } catch (error) {
    return handleApiError(`fetchStudentExams(${studentId})`, error);
  }
};

// API functions for teachers
export const fetchTeachers = async () => {
  try {
    const response = await apiClient.get('/teachers/');
    console.log('Raw teacher data:', response.data);
    return response.data;
  } catch (error) {
    return handleApiError('fetchTeachers', error);
  }
};

export const fetchTeacherDetails = async (teacherId) => {
  try {
    const response = await apiClient.get(`/teachers/${teacherId}/`);
    return response.data;
  } catch (error) {
    return handleApiError(`fetchTeacherDetails(${teacherId})`, error);
  }
};

// Fee payment API function
export const updateFeePayment = async (studentId, paymentData) => {
  try {
    const response = await apiClient.post(`/students/fees/payment/${studentId}/`, paymentData);
    return response.data;
  } catch (error) {
    return handleApiError(`updateFeePayment(${studentId})`, error);
  }
}; 