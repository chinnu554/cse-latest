import "./Navbar.css";
import { Link } from "react-router-dom";
import {useState,useEffect} from "react"
function Navbar() {
  const [mobile,setMobile] = useState(false);
  const [open,setOpen] = useState(false);
  useEffect(()=>{
      const checkScreen = () => {
      setMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize",checkScreen)
    return ()=>{
      window.removeEventListener("resize",checkScreen)
    }
  },[])
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
      (mobile)?(
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
          
          <div className={`slidebar ${open ? "open" : "closed"}`}>
            <button onClick={()=>{setOpen(!open)}} className="close-button">X</button>
            <div className="mob-links">
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">Home</Link>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/admin">Admin</Link>
              <p className="seperator" >─────────────────</p>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">Coursed Offered</Link>
              <p className="seperator" >─────────────────</p>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/faculty">Faculty</Link>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/students">Students</Link>
              <p className="seperator" >─────────────────</p>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/dept-facility">Dept Facilities</Link>
              <p className="seperator" >─────────────────</p>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">2nd year materials</Link>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">3rd year materials</Link>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">4th year materials</Link>
              <p className="seperator" >─────────────────</p>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">Photo Gallery</Link>
              <Link className="mob-link" onClick={()=>{setOpen(!open)}} to="/">Placements</Link>

            </div>
          </div>
            }
          <button className="mob-slide-btn" onClick={() => setOpen(!open)}>&#9776;</button>
        </div>
        </div>
      ):
      (
        <div className="navbar">
      <div className="marquee">
        <p>
          <a href="./admission.pdf" target="_blank">Admissions Open • Gokula Krishna College Of Engineering (GKCE) • B.Tech • Apply Now</a>
        </p>
      </div>

      <div className="Links">
      
        <Link className="sep-links" to="/"><button className="link-btn">Home</button></Link>

        <Link className="sep-links" to="/admin"><button className="link-btn">Admins</button></Link>

        <Link className="sep-links" to="/admin"><button className="link-btn">Acadamics</button></Link>

        <div className="dropdown">
          <button>People▾</button>
          <div className="content">
            <Link to="/faculty">Faculty</Link>
            <Link to="/students">Students</Link>
          </div>
        </div>

        <Link className="sep-links" to="/dept-facility"><button className="link-btn">Facilities</button></Link>
      
        <div className="dropdown">
          <button>Materials▾</button>
          <div className="content">
            <Link to="">2nd year</Link>
            <Link to="">3rd year</Link>
            <Link to="">4th year</Link>
          </div>
        </div>

        
        
          <div className="dropdown">
          <button>Others▾</button>
          <div className="content">
            <Link to="">Photos Gallery</Link>
            <Link to="">Placements</Link>
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
