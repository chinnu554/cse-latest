import { useState, useEffect, Suspense, lazy } from 'react';
import './Responsive.css';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, useLocation } from "react-router-dom"
import ScrollToTopButton from './components/ScrollButton/scrollButton.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Faculty = lazy(() => import('./pages/Faculty.jsx'));
const Students = lazy(() => import('./pages/Students.jsx'));
const Admin = lazy(() => import('./pages/Admin.jsx'));
const Academic = lazy(() => import('./pages/Academic.jsx'));
const DeptFac = lazy(() => import('./pages/DeptFac.jsx'));
const Photo = lazy(() => import('./pages/Photo.jsx'));
const Materials = lazy(() => import('./pages/Materials.jsx'));
const Syllabus = lazy(() => import('./pages/Syllabus.jsx'));
const PYQs = lazy(() => import('./pages/PYQs.jsx'));
const LabManuals = lazy(() => import('./pages/LabManuals.jsx'));

import Loading from './components/Loading';

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return (
    <>
      <Header />
      <Navbar />
      <Suspense fallback={<Loading minHeight="100vh" />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/faculty' element={<Faculty />} />
          <Route path='/students' element={<Students />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/dept-facility' element={<DeptFac />} />
          <Route path='/academic' element={<Academic />} />
          <Route path='/Photo-gallery' element={<Photo />} />
          <Route path='/resources/materials' element={<Materials />} />
          <Route path='/resources/syllabus' element={<Syllabus />} />
          <Route path='/resources/pyqs' element={<PYQs />} />
          <Route path='/resources/lab-manuals' element={<LabManuals />} />
        </Routes>
      </Suspense>
      <ScrollToTopButton></ScrollToTopButton>
      <Footer />
    </>
  )
}

export default App
