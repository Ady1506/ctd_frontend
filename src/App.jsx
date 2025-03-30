import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './Pages/Dashboard';
import Forms from './Pages/Forms';
import Students from './Pages/Students';
import Ssetting from './Pages/Ssetting';
import Courses from './Pages/Courses';
import Attendance from './Pages/Attendance';
import CourseDescription from './components/CourseS/CourseDescription';
import Login from './Pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <Login setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div className="bg-[#EBEFF2] body flex flex-row">
          <Navbar />
          <div className="sub-body flex w-[85%]">
            <Routes>
              <Route path="*" element={<h1>404 Not Found</h1>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/students" element={<Students />} />
              <Route path="/settings" element={<Ssetting />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/courseDescription" element={<CourseDescription />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;