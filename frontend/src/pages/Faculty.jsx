import { useState, useEffect } from 'react';
// forcing rebuild
import Loading from '../components/Loading';
import Fcard from '../components/Fcard';
import "./Faculty.css";
import SEO from "../components/SEO";

function Faculty() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            async function fetchTeachers() {
                const response = await fetch("https://backend.devsparks.online/faculty/all-teaching");
                const data = await response.json();
                setTeachers(data);
                setLoading(false);
            }
            fetchTeachers();
        } catch (err) {
            console.log("Error occurred while fetching faculty details", err);
            setLoading(false);
        }
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
                    <Loading message="Loading faculty..." minHeight="50vh" />
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