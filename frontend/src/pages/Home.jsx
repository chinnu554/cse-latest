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
        }, { threshold: 0.1 });

        const animatedElements = document.querySelectorAll(
            ".hod-img, .hod-details, .hod-text, .home-page h2, .form-container, .vision h2, .vision p, .mission h2, .mission ul li, .vision, .mission"
        );

        animatedElements.forEach((el) => observer.observe(el));

    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCards((prevActiveCards) =>
                prevActiveCards === features.length - 1 ? 0 : prevActiveCards + 1
            );
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    const [activeCards, setActiveCards] = useState(0);
    const features = [
        {
            title: "Modern Computer Labs",
            description:
                "Well-equipped laboratories with latest software tools.",
            image:
                "https://www.dgu.ac/images/labs/SAP_Lab_2024.jpg"
        },
        {
            title: "Real-Time Projects",
            description:
                "Students work on live web development, AI, and IOT projects.",
            image:
                "https://miro.medium.com/0*nr4KAHNLn3PQ-y5g.jpg"
        },
        {
            title: "Research & Innovation",
            description:
                "Encouraging research activities, mini projects, and innovation programs.",
            image:
                "https://cdn.prod.website-files.com/65097d18d934568ee1611e9a/65097d18d934568ee161239f_research%20and%20innovation.jpg"
        },
        {
            title: "Placement Support",
            description:
                "Training sessions, mock interviews, aptitude classes, and campus recruitment.",
            image:
                "https://sherpact.com/wp-content/uploads/2025/05/f7773610-a438-4fe5-87b8-89161785a528_2-1-scaled.jpg"
        }
    ];
    return (
        <>
            <SEO
                title="GKCE CSE Department | Gokula Krishna College of Engineering"
                description="Official website of the Computer Science and Engineering (CSE) Department at Gokula Krishna College of Engineering, Sullurpet. Access syllabus, study materials, previous papers, lab manuals, and department updates."
                keywords="GKCE CSE, Gokula Krishna College of Engineering CSE, GKCE Sullurpet CSE department, B.Tech CSE GKCE, GKCE CSE study materials, GKCE CSE previous papers"
                canonicalUrl="https://gkce-cse.in/"
            />

            <div className="home-page">
                <h1 className="visually-hidden">Computer Science & Engineering - GKCE</h1>
                <div>
                    <div className="showcase">
                    </div>
                    <section>
                        <div className="vision">
                            <h2>Vision</h2>
                            <p>To empower the graduates to be technologically adept, innovative, self-motivated and responsible citizens, possessing human values and contribute significantly towards being a centre of excellence in providing globally standard education, through a conducive Teaching and Research environment, that responds swiftly to the challenges of the ever-changing world.</p>
                        </div>
                        <div className="mission">
                            <h2>Mission</h2>
                            <ul>
                                <li>To achieve academic excellence by imparting in-depth knowledge to the students through effective trainings and hands on experience on latest tools and technologies.</li>
                                <li>To pursue interdisciplinary research that will serve the needs of the entire global community..</li>
                                <li>To prepare students to be continuous learners in a connected world and imbibe professional skills and ethical responsibilities in them.</li>
                                <li>To strengthen the industry-Academia interface that will help the graduates to emerge as leaders in academics or an inspiring revolutionary in entrepreneurship.</li>
                            </ul>

                        </div>
                    </section>

                    <div className="hod-card">
                        <h2>Head OF Department - CSE</h2>
                        <div className="hod-details" >
                            <div >
                                <img className="hod-img" src="/images/hod.png" alt="hod-img" width="350" height="350" />
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
                    <div className="features">
                        <h2>Why Our Department?</h2>
                        <div className="features-container">
                            <div className="features-grid">
                                {features.map((feature, index) => (
                                    <div key={index} className={`feature-card ${activeCards === index ? 'active' : ''}`} onClick={() => setActiveCards(index)}>
                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginRight: "4px", marginTop: "5px" }}>
                                            <h3>{feature.title}</h3>
                                            <p>{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <img
                                key={features[activeCards].image}
                                src={features[activeCards].image}
                                alt={features[activeCards].title}
                                className="feature-img"
                            />

                        </div>
                    </div>
                    <div>
                        <h2>Photos</h2>
                        <SwiperImg />
                    </div>
                    <div>
                        <h2>Feedback</h2>
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