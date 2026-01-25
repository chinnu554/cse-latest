import{useState,useEffect} from 'react';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Faculty from "./pages/Faculty.jsx";
import Students from './pages/Students.jsx';
import Admin from './pages/Admin.jsx';
import Academic from './pages/Academic.jsx';
import DeptFac from './pages/DeptFac.jsx';
import {Routes,Route} from "react-router-dom"
import ScrollToTopButton from './components/ScrollButton/scrollButton.jsx';
import Photo from './pages/Photo.jsx';
function App() {
 
  useEffect(()=>{
      window.scrollTo(0,0);
    },[])

  return (
    <>
    <Header/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/faculty' element={<Faculty/>}/>
      <Route path='/students' element={<Students/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/dept-facility' element={<DeptFac/>}/>
      <Route path='/academic' element={<Academic/>}/>
      <Route path='/Photo-gallery' element={<Photo/>}/>
    </Routes>
    <ScrollToTopButton></ScrollToTopButton>
    <Footer/>
    </>
  )
}

export default App
