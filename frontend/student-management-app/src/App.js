import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

// Components
import NavBar from './components/NavBar';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import TeacherList from './components/TeacherList';
import TeacherDetail from './components/TeacherDetail';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/dashboard/:studentId" element={<Dashboard />} />
            <Route path="/students/:studentId" element={<StudentDetail />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
