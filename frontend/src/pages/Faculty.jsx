import { useState, useEffect } from 'react';
import Fcard from '../components/Fcard';
import "./Faculty.css";
import SEO from "../components/SEO";
import { API_BASE_URL } from "../config/api";

const FacultySkeleton = () => (
    <div className="teacher-section" aria-label="Loading faculty">
        {Array.from({ length: 6 }).map((_, index) => (
            <div className="f-card faculty-skeleton-card" key={index}>
                <div className="skeleton faculty-skeleton-img"></div>
                <div className="faculty-skeleton-content">
                    <div className="skeleton faculty-skeleton-name"></div>
                    <div className="skeleton faculty-skeleton-role"></div>
                </div>
            </div>
        ))}
    </div>
);

function Faculty() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTeachers() {
            try {
                const response = await fetch(`${API_BASE_URL}/faculty/all-teaching`);
                const data = await response.json();
                setTeachers(data);
            } catch (err) {
                console.log("Error occurred while fetching faculty details", err);
            } finally {
                setLoading(false);
            }
        }

        fetchTeachers();
    }, []);

    return (
        <>
            <SEO
                title="CSE Faculty | GKCE CSE Department"
                description="Meet the experienced and dedicated faculty members of the Computer Science and Engineering (CSE) Department at Gokula Krishna College of Engineering, Sullurpet."
                keywords="GKCE CSE faculty, CSE professors GKCE, Gokula Krishna College faculty CSE, engineering teachers GKCE, GKCE Sullurpet CSE department"
                canonicalUrl="https://gkce-cse.in/faculty"
            />

            <div className='teaching-matter'>
                <h1>Faculty</h1>
            </div>
            {
                loading ? (
                    <FacultySkeleton />
                ) : (
                    <div className='teacher-section'>
                        {
                            teachers.length > 0 ? (
                                teachers.map((user, index) => (
                                    <Fcard key={index} user={user} />
                                ))
                            ) : (
                                <p>No faculty members found.</p>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}

export default Faculty;
