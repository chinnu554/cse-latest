import { useEffect, useState } from "react";
import "./resources.css";

function Pyq() {
    const [year, setYear] = useState("");
    const [pyq, setPyq] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showPyq, setShowPyq] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleYearClick = (e, selectedYear) => {
        e.preventDefault();
        setYear(selectedYear);
        setShowPyq(true);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        if (!year) return;

        const fetchPyqData = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `http://api.gkce-cse.in/resources/pyqs/${year}`
                );
                const data = await res.json();
                setPyq(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setPyq([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPyqData();
    }, [year]);

    return (
        <div className="pyq-section">
            <h1 className="pyq-heading">PYQ Section</h1>

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

            {showPyq ? (
                loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading PYQ...</p>
                    </div>
                ) : pyq.length === 0 ? (
                    <div className="no-pyq">
                        <p>No PYQ Found</p>
                    </div>
                ) : (
                    <>
                        {pyq.map((pyq, index) => (
                            <div key={index} className="pyq-item">
                                <p>{pyq.name}</p>
                                <a
                                    href={`http://api.gkce-cse.in/resources${pyq.url}`}
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
                <div className="pyq-note">
                    <p>Select a year to view PYQ</p>
                    <p>

                    </p>
                </div>
            )}
        </div>
    );
}

export default Pyq;
