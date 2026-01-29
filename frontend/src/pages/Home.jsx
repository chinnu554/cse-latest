import "./Home.css"
import Form from '../components/Form.jsx'
import SwiperImg from '../components/ImageSlider.jsx'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useState, useEffect } from 'react';
import SEO from '../components/SEO';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
function Home() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, { threshold: 0.1 }); // Trigger slightly earlier

        const animatedElements = document.querySelectorAll(
            ".hod-img, .hod-details, .hod-text, .home-page h1, .form-container, .vision h1, .vision p, .mission h1, .mission ul li"
        );

        animatedElements.forEach((el) => observer.observe(el));

    }, [])

    return (
        <>
            <SEO
                title="Home"
                description="Welcome to the Computer Science Department of Gokula Krishna College of Engineering."
                keywords="Home, CSE, Engineering, GKCE, Sullurpet"
            />
            <div className="home-page">
                <div>
                    <div className="showcase">
                    </div>
                    <section>
                        <div className="vision">
                            <h1>Vision</h1>
                            <p>To empower the graduates to be technologically adept, innovative, self-motivated and responsible citizens, possessing human values and contribute significantly towards being a centre of excellence in providing globally standard education, through a conducive Teaching and Research environment, that responds swiftly to the challenges of the ever-changing world.</p>
                        </div>
                        <div className="mission">
                            <h1>Mission</h1>
                            <ul>
                                <li>To achieve academic excellence by imparting in-depth knowledge to the students through effective trainings and hands on experience on latest tools and technologies.</li>
                                <li>To pursue interdisciplinary research that will serve the needs of the entire global community..</li>
                                <li>To prepare students to be continuous learners in a connected world and imbibe professional skills and ethical responsibilities in them.</li>
                                <li>To strengthen the industry-Academia interface that will help the graduates to emerge as leaders in academics or an inspiring revolutionary in entrepreneurship.</li>
                            </ul>

                        </div>
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
                                    <li>E-mail ID: suresh@gkce.edu.in</li>
                                </ul>
                                <hr />
                                <p>Mr. T. Suresh Tiruvalluru is an Associate Professor and Head of the Department of Computer Science and Engineering at Gokula Krishna College of Engineering, Sullurpeta. He is currently pursuing his Ph.D. in Artificial Intelligence and IoT-based Smart Irrigation Systems for Precision Agriculture at Bharath Institute of Higher Education and Research, Chennai. He completed his M.Tech from Acharya Nagarjuna University in 2010 and his B.Tech in 2006 from Gokula Krishna College of Engineering under JNTUH. With over 15 years of teaching experience, he has published more than eight research articles in reputed international journals and has strong research interests in Artificial Intelligence, Internet of Things, and smart agricultural systems.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>Photos</h1>
                        <SwiperImg />
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