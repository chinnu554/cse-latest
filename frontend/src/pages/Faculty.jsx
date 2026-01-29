import { useState, useEffect } from 'react';
import Fcard from '../components/Fcard';
import "./Faculty.css";
import SEO from "../components/SEO";

function Faculty() {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            async function fetchTeachers() {
                const response = await fetch("http://localhost:5000/faculty/all-teaching");
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
                title="Faculty"
                description="Meet our experienced and dedicated faculty members in the CSE department."
                keywords="Faculty, Professors, Teachers, GKCE, CSE Department"
            />
            <div className='teaching-matter'>
                <h1>Faculty</h1>
            </div>
            {
                loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading faculty...</p>
                    </div>
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