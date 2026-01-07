import './Footer.css';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"
import{useState,useEffect} from 'react';
function Footer() {
    const year = new Date().getFullYear();
    useEffect(()=>{
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
          if(entry.isIntersecting){
            entry.target.classList.add('active');
          }
          else{
            entry.target.classList.remove('active');
          }
        });
      });
      const appearElements = document.querySelectorAll('.footer-things , .footer-links, .footer-maps');
      appearElements.forEach((el)=>{
        observer.observe(el);
      });
    },[])
  return (
    <>
    <footer>
      <div className='footer-img'>
        <h1>Department of Computer Science and Engineering</h1>
        <div className='footer-details'>
          <div className='footer-things'>
            <p>Behind RTC Depot., Sullurpet, Tirupati District, AndraPradesh-524121</p>
            <p><a href="mailto:suresh@gkce.edu.in">suresh@gkce.edu.in</a></p>
             <div className="social-icons">
                 <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                     <FaInstagram />
                 </a>

                 <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                     <FaFacebook />
                 </a>

                  <a href="https://www.youtube.com/@GKCESP" target="_blank" rel="noreferrer">
                      <FaYoutube />
                  </a>
            </div>
          </div>
          <div className='footer-links'>
            <h3>Important Links</h3>
          
            <a href="https://swayam.gov.in/" target='_blank'>Swayam</a><br />
            <a href="https://ndl.iitkgp.ac.in/" target='_blank'>National Digital Library</a><br />
            <a href="https://nad.gov.in/" target='_blank'>National Academic Depository</a><br />
            <a href="https://gkce.edu.in/" target='_blank'>Gokula Krishna College of Engineering</a><br />

          </div>
          <div className='footer-maps'>
            <h3>Map link</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.974401872983!2d79.98870317431525!3d13.71999959803057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d0cb73aac9f9b%3A0x7f0bcfc9c0287a5b!2sGokula%20Krishna%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1766907748050!5m2!1sen!2sin"  
            style={{border:"0"}} 
            allowfullscreen=""
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            className='map'></iframe>
          </div>
        </div>
      </div>
      <div className='college-footer'>
        <p>© {year} Your College Name. All Rights Reserved.</p>
        <p>Designed and mataining by <b>Dev Sparks</b></p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
