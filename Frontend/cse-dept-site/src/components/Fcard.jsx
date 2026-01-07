import "./Fcard.css"
import noImg from "../assets/images.png"
function facultyCard({user}){
    let userImage = user.imageUrl;
    if(!user.imageUrl){
        userImage = noImg;
    }
    return(
        <>
        <div className="f-card">
            <div>
                <img src={userImage} alt="faculty" className="f-img" />
            </div>
            <div>
                <h2>{user.username}</h2>
                <p>Role : {user.role}</p>
                <p>Email : {user.email}</p>
            </div>
        </div>
        
        </>
    );
}
export default facultyCard;