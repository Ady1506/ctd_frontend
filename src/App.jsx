import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './Pages/Dashboard';
import Forms from './Pages/Forms';
import Students from './Pages/Students';
import Ssetting from './Pages/Ssetting';
import Courses from './Pages/Courses';
import Attendance from './Pages/Attendance';
import CourseDescription from './components/CourseS/CourseDescription';
import Login from './Pages/Login';
import ProtectedRoute from './components/ProtectedRoutes';

function LayoutWithNavbar() {
  return (
    <div className='bg-[#EBEFF2] body flex flex-row'>
      <Navbar />
      <div className='sub-body flex w-full h-[100vh]'>
        <Routes>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/adminCourses' element={<Forms />} />
          <Route path='/students' element={<Students />} />
          <Route path='/profile' element={<Ssetting />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/attendance' element={<Attendance />} />
          <Route path="/CourseDescription/:id" element={<CourseDescription />} />
          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path='/' element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/*' element={<LayoutWithNavbar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
