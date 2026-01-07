import logo from '../assets/GKCE-LOGO.png'
import './Header.css'
function Header(){
    return(
        <>
         <div className='header'>
            <img src={logo} alt="college img" className='clg-logo'/>
            <div>
                <h1>Computer Science Engineering</h1>
                <h3>Gokula Krishna College of Engineering</h3>
            </div>
         </div>
        </>
    );
}
export default Header