// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Dashboard from './Pages/Dashboard';
// import Forms from './Pages/Forms';
// import Students from './Pages/Students';
// import Ssetting from './Pages/Ssetting';
// import Courses from './Pages/Courses';
// import Attendance from './Pages/Attendance';
// import CourseDescription from './components/CourseS/CourseDescription';
// import Login from './Pages/Login';

// function LayoutWithNavbar() {
//   return (
//     <div className='bg-[#EBEFF2] body flex flex-row'>
//       <Navbar />
//       <div className='sub-body flex w-[85%]'>
//         <Routes>
//           <Route path='/Dashboard' element={<Dashboard />} />
//           <Route path='/forms' element={<Forms />} />
//           <Route path='/students' element={<Students />} />
//           <Route path='/settings' element={<Ssetting />} />
//           <Route path='/courses' element={<Courses />} />
//           <Route path='/attendance' element={<Attendance />} />
//           <Route path='/courseDescription' element={<CourseDescription />} />
//           <Route path='*' element={<h1>404 Not Found</h1>} />
//         </Routes>
//       </div>
//     </div>
//   );
// }

// function AppRoutes() {
//   const location = useLocation();

//   return location.pathname === '/' ? (
//     <Routes>
//       <Route path='/' element={<Login />} />
//     </Routes>
//   ) : (
//     <LayoutWithNavbar />
//   );
// }

// function App() {
//   return (
//     <Router>
//       <AppRoutes />
//     </Router>
//   );
// }

// export default App;

// App.jsx
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
      <div className='sub-body flex w-[85%]'>
        <Routes>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/forms' element={<Forms />} />
          <Route path='/students' element={<Students />} />
          <Route path='/profile' element={<Ssetting />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/attendance' element={<Attendance />} />
          {/* <Route path='/courseDescription' element={<CourseDescription />} /> */}
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
