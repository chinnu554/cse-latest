import "./Home.css"
import Form from '../components/Form.jsx'
import SwiperImg from '../components/ImageSlider.jsx'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import{useState,useEffect} from 'react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Home(){
    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add("active");
            }
        });
    });
    const hodImg = document.querySelector(".hod-img");
    observer.observe(hodImg);
    const hodDetails = document.querySelector(".hod-text");
    observer.observe(hodDetails);
    const headings = document.querySelectorAll(".home-page h1");
    headings.forEach((heading)=>{
        observer.observe(heading);
    });
    const formContainer = document.querySelector(".form-container");
    observer.observe(formContainer);
    },[])
    
    return(
        <>
        <div className="home-page">
            <div>
            <div className="showcase">
        </div>
        <section>
        </section>
        
            <div className="hod-card">
                <h1>Head OF Department - CSE</h1>
                <div className="hod-details" >
                <div >
                    <img className="hod-img" src="https://gkce.edu.in/wp-content/uploads/2024/10/1722845463535.jpg" alt="hod-img" />
                </div>
                
                <div className="hod-text">
                    <ul>
                        <li>MR.T.SURESH</li>
                        <li>Associate Professor & HOD</li>
                        <li>Department of CSE</li>
                        <li>Gokula Krishna College of Engineering, Sullurpeta.</li>
                        <li>E-mail ID: suresh@gkce.edu.in</li>
                    </ul>
                    <hr />
                    <p>Mr. T. Suresh Tiruvalluru is an Associate Professor and Head of the Department of Computer Science and Engineering at Gokula Krishna College of Engineering, Sullurpeta. He is currently pursuing his Ph.D. in Artificial Intelligence and IoT-based Smart Irrigation Systems for Precision Agriculture at Bharath Institute of Higher Education and Research, Chennai. He completed his M.Tech from Acharya Nagarjuna University in 2010 and his B.Tech in 2006 from Gokula Krishna College of Engineering under JNTUH. With over 15 years of teaching experience, he has published more than eight research articles in reputed international journals and has strong research interests in Artificial Intelligence, Internet of Things, and smart agricultural systems.</p>
                </div>
            </div>
            </div>
            <div>
                <h1>Photos</h1>
                <SwiperImg/>
            </div>
            <div>
                    <h1>Feedback</h1>
                    <div className="form-container">
                        <Form />
                    </div>
            </div>
        </div>
        </div>
        </>
    );
}
export default Home