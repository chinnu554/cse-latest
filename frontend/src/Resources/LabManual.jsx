import { useEffect, useState } from "react";
import "./resources.css";

function LabManual() {
    const [year, setYear] = useState("");
    const [LabManual, setLabManual] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLabManual, setShowLabManual] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleYearClick = (e, selectedYear) => {
        e.preventDefault();
        setYear(selectedYear);
        setShowLabManual(true);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (!year) return;

        const fetchLabManualData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://api.gkce-cse.in/resources/lab-manuals/${year}`
                );
                const data = await res.json();
                setLabManual(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setLabManual([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLabManualData();
    }, [year]);

    return (
        <div className="labmanual-section">
            <h1 className="labmanual-heading">Lab Manual Section</h1>

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

            {showLabManual ? (
                loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading Lab Manual...</p>
                    </div>
                ) : LabManual.length === 0 ? (
                    <div className="no-labmanual">
                        <p>No Lab Manual Found</p>
                    </div>
                ) : (
                    <>
                        {LabManual.map((LabManual, index) => (
                            <div key={index} className="labmanual-item">
                                <p>{LabManual.name}</p>
                                <a
                                    href={`http://api.gkce-cse.in/resources${LabManual.url}`}
                                    rel="noopener noreferrer"
                                >
                                    Download PDF
                                </a>
                            </div>
                        ))}

                        <div className="note">
                            <p>
                                <b>Note:</b>
                            </p>
                        </div>
                    </>
                )
            ) : (
                <div className="labmanual-note">
                    <p>Select a year to view Lab Manual</p>
                    <p>
                        Lab manuals are provided for reference and practice purposes. Students should follow instructions given by their lab faculty during practical sessions.
                    </p>
                </div>
            )}
        </div>
    );
}

export default LabManual;
