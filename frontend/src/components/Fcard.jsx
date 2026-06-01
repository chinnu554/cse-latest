import "./Fcard.css"
function facultyCard({ user }) {
    let userImage = user.imageUrl;
    return (
        <>
            <div className="f-card">
                <div>
                    <img src={userImage} alt="faculty" className="f-img" />
                </div>
                <div>
                    <h2>{user.username}</h2>
                    <p>Role : {user.role}</p>
                </div>
            </div>

        </>
    );
}
export default facultyCard;