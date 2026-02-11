import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import SEO from "../components/SEO";
import "./Resources.css";
import { FaDownload, FaBook } from "react-icons/fa";

function Syllabus() {
    const [year, setYear] = useState("2");
    const [syllabus, setSyllabus] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSyllabus();
    }, [year]);

    const fetchSyllabus = async () => {
        setLoading(true);

        const yearMap = {
            "2": "second-year",
            "3": "third-year",
            "4": "fourth-year",
        };

        const yearPath = yearMap[year] || "second-year";

        try {
            const response = await fetch(
                `https://backend.devsparks.online/resources/syllabus/${yearPath}`
            );

            if (!response.ok) throw new Error("Failed to fetch syllabus");

            const json = await response.json();

            setSyllabus(Array.isArray(json) ? json : json.data || []);
        } catch (error) {
            console.error("Error fetching syllabus:", error);
            setSyllabus([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="CSE Syllabus | GKCE CSE Department"
                description="Download the latest Computer Science and Engineering (CSE) syllabus for all years and semesters. Get updated curriculum, subjects, and course structure details."
                keywords="CSE syllabus GKCE, Computer Science syllabus, GKCE CSE curriculum, engineering CSE subjects, B.Tech CSE syllabus"
                canonicalUrl="https://gkce-cse.in/syllabus"
            />


            <div className="resources-page">
                <div className="page-header">
                    <h1>Syllabus</h1>
                    <p>Stay updated with the latest curriculum and course structure</p>
                </div>

                <div className="year-selector">
                    {["2", "3", "4"].map((y) => (
                        <button
                            key={y}
                            className={`year-btn ${year === y ? "active" : ""}`}
                            onClick={() => setYear(y)}
                        >
                            {y === "2" ? "2nd Year" : y === "3" ? "3rd Year" : "4th Year"}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <Loading message="Loading syllabus..." />
                ) : (
                    <div className="resources-grid">
                        {syllabus.length > 0 ? (
                            syllabus.map((item) => (
                                <div key={item._id} className="resource-card">
                                    <div className="card-header">
                                        <div className="subject-code">
                                            {item.subject?.toUpperCase() || "SYLLABUS"}
                                        </div>
                                        <FaBook color="#3f87c2" size={20} />
                                    </div>

                                    <h3>{item.subject || "Course"} Syllabus</h3>

                                    <div className="resource-info">
                                        <p>
                                            <strong>Semester:</strong> {item.semester || "—"}
                                        </p>
                                        <p>
                                            <strong>Updated:</strong>{" "}
                                            {item.createdAt
                                                ? new Date(item.createdAt).toLocaleDateString()
                                                : "—"}
                                        </p>
                                    </div>

                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="download-btn"
                                    >
                                        <FaDownload /> Download
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="no-resources">
                                <h3>
                                    No syllabus found for{" "}
                                    {year === "2" ? "2nd" : year === "3" ? "3rd" : "4th"} Year
                                </h3>
                                <p>Please check back later or select a different year.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Syllabus;
