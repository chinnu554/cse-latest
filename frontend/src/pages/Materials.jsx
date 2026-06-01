import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import SEO from "../components/SEO";
import { API_BASE_URL } from "../config/api";
import "./Resources.css";
import { FaDownload, FaFileAlt } from "react-icons/fa";

function Materials() {
    const [year, setYear] = useState("2");
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, [year]);

    const fetchMaterials = async () => {
        setLoading(true);

        const yearMap = {
            "2": "second-year",
            "3": "third-year",
            "4": "fourth-year",
        };

        const yearPath = yearMap[year] || "second-year";

        try {
            const response = await fetch(
                `${API_BASE_URL}/resources/materials/${yearPath}`
            );

            if (!response.ok) throw new Error("Failed to fetch");

            const json = await response.json();

            setMaterials(Array.isArray(json.data) ? json.data : []);
        } catch (error) {
            console.error("Error fetching materials:", error);
            setMaterials([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="CSE Study Materials & Notes | GKCE CSE Department"
                description="Download CSE study materials, lecture notes, PDFs, and reference documents for all years and semesters at GKCE. Access subject-wise engineering resources easily."
                keywords="GKCE CSE study materials, CSE notes GKCE, B.Tech CSE lecture notes, engineering CSE PDFs, GKCE CSE semester materials"
                canonicalUrl="https://gkce-cse.in/study-materials"
            />

            <div className="resources-page">
                <div className="page-header">
                    <h1>Study Materials</h1>
                    <p>Access comprehensive lecture notes and study resources sorted by year</p>
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
                    <Loading message="Loading materials..." />
                ) : (
                    <div className="resources-grid">
                        {materials.length > 0 ? (
                            materials.map((item) => (
                                <div key={item._id} className="resource-card">
                                    <div className="card-header">
                                        <div className="subject-code">
                                            {item.subject?.toUpperCase() || "SUBJECT"}
                                        </div>
                                        <FaFileAlt color="#3f87c2" size={20} />
                                    </div>

                                    <h3>{item.subject.toUpperCase() || "Untitled Material"}</h3>

                                    <div className="resource-info">
                                        <p>
                                            <strong>SEMESTER:</strong> {item.semester.toUpperCase() || "—"}
                                        </p>
                                        <p>
                                            <strong>UNIT:</strong> {item.unit.toUpperCase() || "—"}
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
                                    No materials found for{" "}
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

export default Materials;
