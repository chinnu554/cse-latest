import {useState,useEffect} from "react"
import "./Photo.css"
function Photo(){
    const [photos,setPhotos] = useState([])
    useEffect(()=>{
         async function fetchPhoto(){
        const response = await fetch("http://localhost:5000/photo-gallery");
        const images = await response.json();
        setPhotos(images);
    }
    fetchPhoto();
    },[])
   
    return(
         <>
          <h1>Hello photo gallery</h1>
          <div className="album">
             {
            photos.map((photo)=> <img className="photo-gallery" src={photo} alt="images" />)
             }
          </div>
         </>
    );
}
export default Photo;