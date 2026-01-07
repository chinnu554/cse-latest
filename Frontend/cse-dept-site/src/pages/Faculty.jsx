import {useState,useEffect} from 'react'
import FacultyCard from '../components/Fcard.jsx';
import "./Faculty.css"
function NonTeaching(){
    const [teachers,setTeachers] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        try{
            async function fetchTeachers(){
            const response = await fetch("http://localhost:5000/faculty/all-teaching");
            const data = await response.json();
            setTeachers(data);
            setLoading(false);
        }
        fetchTeachers()
        }
        catch(err){
            console.log("Error occured while fetching the teaching faculty details",err)
        }
      
            

    },[]);
    return(
    <>
    <div className='teaching-matter'>
        <h1>Faculty</h1>
        </div>
    {
        (loading)?(
           <div className="loading-container">
          <div className="spinner"></div>
             <p>Loading faculty...</p>
          </div>
        )
        :
        (
            <div className='teacher-section'>
        {
            teachers.map((user,index)=>(
                <div className='teacher-card' key={index}>
                    <FacultyCard user={user}/>
                </div>
            )
            )
        }
     </div>
        )
    }
     
    </>
    );
}
export default NonTeaching;