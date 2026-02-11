import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import SEO from "../components/SEO";
import "./Resources.css";
import { FaDownload, FaFlask } from "react-icons/fa";

function LabManuals() {
    const [year, setYear] = useState("2");
    const [manuals, setManuals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchManuals();
    }, [year]);

    const fetchManuals = async () => {
        setLoading(true);

        const yearMap = {
            "2": "second-year",
            "3": "third-year",
            "4": "fourth-year",
        };

        const yearPath = yearMap[year] || "second-year";

        try {
            const response = await fetch(
                `https://backend.devsparks.online/resources/lab-manuals/${yearPath}`
            );

            if (!response.ok) throw new Error("Failed to fetch lab manuals");

            const json = await response.json();

            // ✅ IMPORTANT FIX
            setManuals(Array.isArray(json.data) ? json.data : []);
        } catch (error) {
            console.error("Error fetching lab manuals:", error);
            setManuals([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <SEO
                title="CSE Lab Manuals | GKCE CSE Department"
                description="Download CSE lab manuals for all laboratory courses at GKCE. Access practical records, experiment procedures, and semester-wise lab PDFs for B.Tech students."
                keywords="GKCE CSE lab manuals, CSE laboratory manuals GKCE, B.Tech CSE lab records, engineering lab PDFs GKCE, CSE practical experiments"
                canonicalUrl="https://gkce-cse.in/lab-manuals"
            />


            <div className="resources-page">
                <div className="page-header">
                    <h1>Lab Manuals</h1>
                    <p>Comprehensive guides and manuals for all computer science laboratories</p>
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
                    <Loading message="Loading manuals..." />
                ) : (
                    <div className="resources-grid">
                        {manuals.length > 0 ? (
                            manuals.map((item) => (
                                <div key={item._id} className="resource-card">
                                    <div className="card-header">
                                        <div className="subject-code">
                                            {item.subject?.toUpperCase() || "LAB"}
                                        </div>
                                        <FaFlask color="#3f87c2" size={20} />
                                    </div>

                                    <h3>{item.subject || "Lab Manual"} Lab</h3>

                                    <div className="resource-info">
                                        <p>
                                            <strong>Semester:</strong> {item.semester || "—"}
                                        </p>
                                        <p>
                                            <strong>Unit:</strong> {item.unit || "—"}
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
                                    No manuals found for{" "}
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

export default LabManuals;
