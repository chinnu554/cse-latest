import { useState, useEffect } from "react";
import "./Students.css";
import SEO from "../components/SEO";

function Students() {
  const [secondYears, setSecondYear] = useState([]);
  const [thirdYears, setThirdYears] = useState([]);
  const [fourthYears, setFourthYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchSecondYearStudents() {
      const response = await fetch("http://localhost:5000/secondyears");
      const data = await response.json();
      setSecondYear(data);
      setLoading(false);
    }

    async function fetchThirdYearStudents() {
      const response = await fetch("http://localhost:5000/thirdyears");
      const data = await response.json();
      setThirdYears(data);
    }

    async function fetchFourthYearStudents() {
      const response = await fetch("http://localhost:5000/fourthyears");
      const data = await response.json();
      setFourthYears(data);
    }

    fetchSecondYearStudents();
    fetchThirdYearStudents();
    fetchFourthYearStudents();

  }, []);

  const filterStudents = (students) =>
    students.filter((s) =>
      `${s.name} ${s.rollNo} ${s.section} ${s.year}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const filteredSecond = filterStudents(secondYears);
  const filteredThird = filterStudents(thirdYears);
  const filteredFourth = filterStudents(fourthYears);

  const noResults =
    search &&
    filteredSecond.length === 0 &&
    filteredThird.length === 0 &&
    filteredFourth.length === 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
      else {
        entry.target.classList.remove("active");
      }
    });
  });
  const hiddelements = document.querySelectorAll(".students-card");
  hiddelements.forEach((el) => observer.observe(el));
  const hiddelements2 = document.querySelectorAll(".students h2");
  hiddelements2.forEach((el) => observer.observe(el));

  return (
    <>
      <SEO
        title="Students"
        description="List of bright minds and future engineers of GKCE CSE Department."
        keywords="Students, Alumni, CSE, Engineering, GKCE"
      />
      <div>
        {
          (loading) ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading Students...</p>
            </div>
          )
            :
            (
              <div className="students">

                <div className="student-heading">
                  <h1>Students</h1>

                  <input
                    type="text"
                    placeholder="Search by name / roll no / section..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                  />
                </div>

                {noResults && (
                  <p style={{ textAlign: "center", marginTop: "20px", color: "gray" }}>
                    No student found
                  </p>
                )}
                <>
                  {
                    (!(filteredSecond.length === 0)) && (
                      <h2>Second Years</h2>
                    )
                  }
                  <div className="students-cards">
                    {filteredSecond.map((student, index) => (
                      <div key={index} className="students-card">
                        <h4>{student.name}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px" }}>
                          <p>{student.rollNo}</p>
                          <p>{student.year} year</p>
                          <p>Section-{student.section}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {
                    (!(filteredThird.length === 0)) && (
                      <h2>Third Years</h2>
                    )
                  }

                  <div className="students-cards">
                    {filteredThird.map((student, index) => (
                      <div key={index} className="students-card">
                        <h4>{student.name}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px" }}>
                          <p>{student.rollNo}</p>
                          <p>{student.year} year</p>
                          <p>Section-{student.section}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {
                    (!(filteredFourth.length === 0)) && (
                      <h2>Fourth Years</h2>
                    )
                  }
                  <div className="students-cards">
                    {filteredFourth.map((student, index) => (
                      <div key={index} className="students-card">
                        <h4>{student.name}</h4>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-20px" }}>
                          <p>{student.rollNo}</p>
                          <p>{student.year} year</p>
                          <p>Section-{student.section}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>

              </div>
            )
        }

      </div>
    </>
  );
}

export default Students;
