import {useEffect} from "react"
import avHall from "../../images/lab-images/avhall.png"
import avHall1 from "../../images/lab-images/avhall1.png"
import labOne from "../../images/lab-images/lab1.png"
import labTwo from "../../images/lab-images/lab2.png"
import labThree from "../../images/lab-images/lab3.png"
import labFour from "../../images/lab-images/lab4.png"
import labFive from "../../images/lab-images/lab5.png"
import "./DeptFac.css"
function DeptFac(){
    return(
        <div className="dept-fac">
            <h1 className="heading">Department Facilities Page</h1>
            <div className="dept-labs">
            <h1>Computer Labs</h1>
            <p>The department boasts several state-of-the-art computer labs that provide students with access to the latest software and hardware technologies. These labs are designed to support various academic programs, allowing students to gain hands-on experience in programming, software development, and other computer science-related activities.</p>
            <div className="img-box">
                <img src={labOne} alt="Computer Lab 1" style={{width:"600px", height:"300px"}}/>
                <h2>Lab 1</h2>
            </div>
            <div className="img-box">
                <img src={labTwo} alt="Computer Lab 2" style={{width:"600px", height:"300px"}}/>
                <h2>Lab 2</h2>
            </div>
            <div className="img-box">
                <img src={labThree} alt="Computer Lab 3" style={{width:"600px", height:"300px"}}/>
                <h2>Lab 3</h2>
            </div>
             <div className="img-box">
                <img src={labFour} alt="Computer Lab 4" style={{width:"600px", height:"300px"}}/>
                <h2>Lab 4</h2>
            </div>
            <div className="img-box">
                <img src={labFive} alt="Computer Lab 5" style={{width:"600px", height:"300px"}}/>
                <h2>Lab 5</h2>
            </div>
           
            </div>
            
            <div className="dept-labs">
            <h1>Audio Visual Hall</h1>
            <p>The Audio Visual Hall is equipped with modern audiovisual technology to facilitate interactive learning and presentations. It features comfortable seating arrangements, high-quality sound systems, and projection equipment to enhance the educational experience for students and faculty alike.</p>
            <div className="img-box">
                <img src={avHall} alt="Audio Visual Hall" style={{width:"600px", height:"300px"}}/>
            </div>
            <div className="img-box">
                <img src={avHall1} alt="Audio Visual Hall" style={{width:"600px", height:"300px"}}/>
            </div>
            </div>
            
        </div>
    )   
}
export default DeptFac;