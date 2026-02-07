import { useEffect, useState } from "react";
import "./resources.css";

function Material() {
  const [year, setYear] = useState("");
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleYearClick = (e, selectedYear) => {
    e.preventDefault();
    setYear(selectedYear);
    setShowMaterials(true);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (!year) return;

    const fetchMaterialsData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://api.gkce-cse.in/resources/materials/${year}`
        );
        const data = await res.json();
        setMaterials(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialsData();
  }, [year]);

  return (
    <div className="materials-section">
      <h1 className="material-heading">Material Section</h1>

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

      {showMaterials ? (
        loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading Materials...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="no-materials">
            <p>No Materials Found</p>
          </div>
        ) : (
          <>
            {materials.map((material, index) => (
              <div key={index} className="material-item">
                <p>{material.name}</p>
                <a
                  href={`http://api.gkce-cse.in/resources${material.url}`}
                  rel="noopener noreferrer"
                >
                  Download PDF
                </a>
              </div>
            ))}

            <div className="note">
              <p>
                <b>Note : </b>Students with neat and well-written handwritten notes
                are encouraged to submit them to the development team.
              </p>
            </div>
          </>
        )
      ) : (
        <div className="material-note">
          <p>Select a year to view materials</p>
          <p>
            Students are advised to use these materials only for academic
            reference. Neatly handwritten notes can be submitted to the
            development team.
          </p>
        </div>
      )}
    </div>
  );
}

export default Material;
