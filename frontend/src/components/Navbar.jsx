import "./Navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const closeSidebar = () => setOpen(false);

  useEffect(() => {
    const checkScreen = () => {
      setMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen)
    return () => {
      window.removeEventListener("resize", checkScreen)
    }
  }, [])
  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);
  return (

    <>
      {
        (mobile) ? (
          <div>
            <div className="navbar">
              <div className="marquee">
                <p>
                  Admissions Open • Gokula Krishna College Of Engineering (GKCE) • B.Tech • Apply Now
                </p>
              </div>
            </div>
            <div className="besties">
              {

                <>
                <div
                  className={`sidebar-backdrop ${open ? "open" : ""}`}
                  onClick={closeSidebar}
                  aria-hidden="true"
                />
                <div className={`slidebar ${open ? "open" : "closed"}`}>
                  <button onClick={closeSidebar} className="close-button">X</button>
                  <div className="mob-links">
                    <Link className="mob-link" onClick={closeSidebar} to="/">Home</Link>
                    <p className="seperator" >─────────────────</p>
                    <Link className="mob-link" onClick={closeSidebar} to="/academic">Academics</Link>
                    <p className="seperator" >─────────────────</p>
                    <Link className="mob-link" onClick={closeSidebar} to="/faculty">Faculty</Link>
                    <Link className="mob-link" onClick={closeSidebar} to="/students">Students</Link>
                    <p className="seperator" >─────────────────</p>
                    <Link className="mob-link" onClick={closeSidebar} to="/dept-facility">Dept Facilities</Link>
                    <p className="seperator" >─────────────────</p>
                    <Link className="mob-link" onClick={closeSidebar} to="/resources/materials">Materials</Link>
                    <Link className="mob-link" onClick={closeSidebar} to="/resources/syllabus">Syllabus</Link>
                    <Link className="mob-link" onClick={closeSidebar} to="/resources/pyqs">PYQ's</Link>
                    <Link className="mob-link" onClick={closeSidebar} to="/resources/lab-manuals">Lab Manuals</Link>
                    <p className="seperator" >─────────────────</p>
                    <Link className="mob-link" onClick={closeSidebar} to="/photo-gallery">Photo Gallery</Link>
                    <Link className="mob-link" onClick={closeSidebar} to="/">Placements</Link>
                    <p className="seperator" >─────────────────</p>
                  </div>
                </div>
                </>
              }
              <button className="mob-slide-btn" onClick={() => setOpen(!open)}>&#9776;</button>
            </div>
          </div>
        ) :
          (
            <div className="navbar">
              <div className="marquee">
                <p>
                  <a href="./admission.pdf" target="_blank">Admissions Open • Gokula Krishna College Of Engineering (GKCE) • B.Tech • Apply Now</a>
                </p>
              </div>

              <div className="Links">

                <Link className="sep-links" to="/"><button className="link-btn">Home</button></Link>

                <Link className="sep-links" to="/academic"><button className="link-btn">Academics</button></Link>

                <div className="dropdown">
                  <button>People▾</button>
                  <div className="content">
                    <Link to="/faculty">Faculty</Link>
                    <Link to="/students">Students</Link>
                  </div>
                </div>

                <Link className="sep-links" to="/dept-facility"><button className="link-btn">Facilities</button></Link>

                <div className="dropdown">
                  <button>Resources▾</button>
                  <div className="content">
                    <Link to="/resources/materials">Materials</Link>
                    <Link to="/resources/syllabus">Syllabus</Link>
                    <Link to="/resources/pyqs">PYQ'S</Link>
                    <Link to="/resources/lab-manuals">Lab Manual</Link>
                  </div>
                </div>



                <div className="dropdown">
                  <button>Others▾</button>
                  <div className="content">
                    <Link to="/photo-gallery">Photos Gallery</Link>
                    <Link to="/">Placements</Link>
                  </div>
                </div>

              </div>
            </div>
          )
      }
    </>
  );
}

export default Navbar;
