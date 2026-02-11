import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import SEO from "../components/SEO";
import "./Resources.css";
import { FaDownload, FaQuestionCircle } from "react-icons/fa";

function PYQs() {
    const [year, setYear] = useState("2");
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPyqs();
    }, [year]);

    const fetchPyqs = async () => {
        setLoading(true);

        const yearMap = {
            "2": "second-year",
            "3": "third-year",
            "4": "fourth-year",
        };

        const yearPath = yearMap[year] || "second-year";

        try {
            const response = await fetch(
                `https://backend.devsparks.online/resources/pyqs/${yearPath}`
            );

            if (!response.ok) throw new Error("Failed to fetch PYQs");

            const json = await response.json();
            setPyqs(Array.isArray(json) ? json : json.data || []);
        } catch (error) {
            console.error("Error fetching PYQs:", error);
            setPyqs([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="CSE Previous Year Question Papers | GKCE CSE"
                description="Download CSE previous year question papers (PYQs) for all years and semesters at GKCE. Access subject-wise old exam papers to prepare effectively."
                keywords="GKCE CSE previous papers, CSE PYQs GKCE, engineering question papers GKCE, B.Tech CSE old papers, GKCE CSE semester papers"
                canonicalUrl="https://gkce-cse.in/previous-papers"
            />


            <div className="resources-page">
                <div className="page-header">
                    <h1>Previous Question Papers</h1>
                    <p>Prepare better with our collection of previous year question papers</p>
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
                    <Loading message="Loading papers..." />
                ) : (
                    <div className="resources-grid">
                        {pyqs.length > 0 ? (
                            pyqs.map((item) => (
                                <div key={item._id} className="resource-card">
                                    <div className="card-header">
                                        <div className="subject-code">
                                            {item.subject?.toUpperCase() || "PYQ"}
                                        </div>
                                        <FaQuestionCircle color="#3f87c2" size={20} />
                                    </div>

                                    <h3>{item.subject || "Question Paper"}</h3>

                                    <div className="resource-info">
                                        <p>
                                            <strong>Exam Year:</strong> {item.examYear || "—"}
                                        </p>
                                        <p>
                                            <strong>Semester:</strong> {item.semester || "—"}
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
                                    No papers found for{" "}
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

export default PYQs;
