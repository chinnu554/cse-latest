import { useEffect, useState } from "react";
import "./resources.css";

function Syllabus() {
    const [year, setYear] = useState("");
    const [syllabus, setSyllabus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSyllabus, setShowSyllabus] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleYearClick = (e, selectedYear) => {
        e.preventDefault();
        setYear(selectedYear);
        setShowSyllabus(true);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (!year) return;

        const fetchSyllabusData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://api.gkce-cse.in/resources/syllabus/${year}`
                );
                const data = await res.json();
                setSyllabus(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setSyllabus([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSyllabusData();
    }, [year]);

    return (
        <div className="materials-section">
            <h1 className="syllabus-heading">Syllabus Section</h1>

            <div className="select-section">
                <h2>Select Year</h2>

                <div className="resources-dropdown">
                    <button
                        className="selection-button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        Years
                    </button>

                    {isDropdownOpen && (
                        <div className="resources-dropdown-content">
                            <ul>
                                <li>
                                    <a href="#" onClick={(e) => handleYearClick(e, "first-years")}>
                                        1st Year
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleYearClick(e, "second-years")}>
                                        2nd Year
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleYearClick(e, "third-years")}>
                                        3rd Year
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleYearClick(e, "fourth-years")}>
                                        4th Year
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {showSyllabus ? (
                loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading Syllabus...</p>
                    </div>
                ) : syllabus.length === 0 ? (
                    <div className="no-syllabus">
                        <p>No Syllabus Found</p>
                    </div>
                ) : (
                    <>
                        {syllabus.map((syllabus, index) => (
                            <div key={index} className="syllabus-item">
                                <p>{syllabus.name}</p>
                                <a
                                    href={`http://api.gkce-cse.in/resources${syllabus.url}`}
                                    rel="noopener noreferrer"
                                >
                                    Download PDF
                                </a>
                            </div>
                        ))}

                        <div className="note">
                            <p>
                                <b>Note : </b>This syllabus is for reference only. Please follow the official university syllabus for exams
                            </p>
                        </div>
                    </>
                )
            ) : (
                <div className="syllabus-note">
                    <p>Select a year to view syllabus</p>
                    <p>The syllabus provided here is for reference and academic guidance. Students are advised to follow the official syllabus released by the university or college for exams and evaluations. Any updates or changes will be reflected as soon as possible.</p>
                </div>
            )}
        </div>
    );
}

export default Syllabus;
