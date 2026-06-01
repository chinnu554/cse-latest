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
      <div className='footer-content'>
        <div className='footer-section brand'>
            <h2>Department of CSE</h2>
            <p>Empowering graduates to be technologically adept, innovative, and responsible citizens.</p>
             <div className="social-icons">
                 <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                     <FaInstagram />
                 </a>
                 <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">
                     <FaFacebook />
                 </a>
                  <a href="https://www.youtube.com/@GKCESP" target="_blank" rel="noreferrer" aria-label="YouTube">
                      <FaYoutube />
                  </a>
            </div>
        </div>

        <div className='footer-section contact'>
             <h3>Contact Us</h3>
             <p>Behind RTC Depot., Sullurpet,</p>
             <p>Tirupati District, Andhra Pradesh-524121</p>
             <p><a href="mailto:c">suresh@gkce.edu.in</a></p>

        </div>

        <div className='footer-section links'>
            <h3>Important Links</h3>
            <ul>
                <li><a href="https://gkce.edu.in/" target='_blank'>Gokula Krishna IOE</a></li>
                <li><a href="https://swayam.gov.in/" target='_blank'>Swayam</a></li>
                <li><a href="https://ndl.iitkgp.ac.in/" target='_blank'>National Digital Library</a></li>
                <li><a href="https://www.nptel.ac.in/" target='_blank'>NPTEL</a></li>
            </ul>
        </div>

        <div className='footer-section map'>
            <h3>Locate Us</h3>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.974401872983!2d79.98870317431525!3d13.71999959803057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d0cb73aac9f9b%3A0x7f0bcfc9c0287a5b!2sGokula%20Krishna%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1766907748050!5m2!1sen!2sin"  
            style={{border:"0"}} 
            allowFullScreen="" // Fixed property name
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade" // Fixed property name
            title="College Map"
            ></iframe>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>© {year} Gokula Krishna College of Engineering. All Rights Reserved.</p>
        <p>Designed and maintained by <a className='devsparks' href="https://eswar.devsparks.online/" target='_blank'><b>ESWAR GKCE</b></a></p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
