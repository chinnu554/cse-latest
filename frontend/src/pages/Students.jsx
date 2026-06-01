import { useState, useEffect } from "react";
import "./Students.css";
import SEO from "../components/SEO";
import { API_BASE_URL } from "../config/api";

const StudentSkeleton = () => (
  <div className="students" aria-hidden="true">
    <div className="student-heading">
      <h1>Students</h1>
      <div className="skeleton student-search-skeleton"></div>
    </div>

    {["Second Years", "Third Years", "Fourth Years"].map((title) => (
      <div key={title}>
        <div className="skeleton student-title-skeleton"></div>
        <div className="students-cards">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="students-card student-skeleton-card">
              <div className="skeleton student-name-skeleton"></div>
              <div className="student-meta-skeleton-row">
                <div className="skeleton student-meta-skeleton"></div>
                <div className="skeleton student-meta-skeleton small"></div>
                <div className="skeleton student-meta-skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

function Students() {
  const [secondYears, setSecondYear] = useState([]);
  const [thirdYears, setThirdYears] = useState([]);
  const [fourthYears, setFourthYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const sortByMongoId = (arr) => {
    if (!Array.isArray(arr)) return [];
    return [...arr].sort((a, b) => a._id.localeCompare(b._id));
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);

        const [secondRes, thirdRes, fourthRes] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/students/secondyears`),
          fetch(`${API_BASE_URL}/students/thirdyears`),
          fetch(`${API_BASE_URL}/students/fourthyears`),
        ]);

        if (secondRes.status === "fulfilled" && secondRes.value.ok) {
          const data = await secondRes.value.json();
          setSecondYear(sortByMongoId(data));
        }

        if (thirdRes.status === "fulfilled" && thirdRes.value.ok) {
          const data = await thirdRes.value.json();
          setThirdYears(sortByMongoId(data));
        }

        if (fourthRes.status === "fulfilled" && fourthRes.value.ok) {
          const data = await fourthRes.value.json();
          setFourthYears(sortByMongoId(data));
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load student data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    });

    const elements = document.querySelectorAll(".students-card, .students h2");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading, secondYears, thirdYears, fourthYears, search]);

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
    !loading &&
    search &&
    filteredSecond.length === 0 &&
    filteredThird.length === 0 &&
    filteredFourth.length === 0;

  return (
    <>
      <SEO
        title="CSE Students | GKCE CSE Department"
        description="Meet the students of the Computer Science and Engineering (CSE) Department at Gokula Krishna College of Engineering, Sullurpet. Explore student profiles by year and batch."
        keywords="GKCE CSE students, CSE student list GKCE, Gokula Krishna College CSE, engineering students GKCE, CSE batches"
        canonicalUrl="https://gkce-cse.in/students"
      />
      <div>
        {loading ? (
        <StudentSkeleton />
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : (
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

          {noResults && <p style={{ textAlign: "center" }}>No student found</p>}

          {filteredSecond.length > 0 && <h2>Second Years</h2>}
          <div className="students-cards">
            {filteredSecond.map((student) => (
              <div key={student._id} className="students-card">
                <p>{student.name}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{student.rollNo}</p>
                  <p>{student.year} year</p>
                  <p>Section-{student.section}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredThird.length > 0 && <h2>Third Years</h2>}
          <div className="students-cards">
            {filteredThird.map((student) => (
              <div key={student._id} className="students-card">
                <p>{student.name}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{student.rollNo}</p>
                  <p>{student.year} year</p>
                  <p>Section-{student.section}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredFourth.length > 0 && <h2>Fourth Years</h2>}
          <div className="students-cards">
            {filteredFourth.map((student) => (
              <div key={student._id} className="students-card">
                <p>{student.name}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>{student.rollNo}</p>
                  <p>{student.year} year</p>
                  <p>Section-{student.section}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
      
    </>
  );
}

export default Students;
