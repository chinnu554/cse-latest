import logo from '../assets/GKCE-LOGO.png'
import './Header.css'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

function Header() {
  return (
    <header className='header'>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
        <img src={logo} alt="Gokula Krishna College of Engineering Logo" className='clg-logo' />

        <div className="title">
          <h1>Computer Science Engineering</h1>
          <h3>Gokula Krishna College of Engineering</h3>
        </div>

      </div>
      <div className="contact-info">
        <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: 'center' }}>
          <FaPhone className='phone-icon' aria-label="Phone" />
          <a href="tel:+911234567890">+91 12345 67890</a>
        </div>
        <div style={{ display: "flex", gap: "5px", justifyContent: "center", alignItems: 'center' }}>
          <FaEnvelope className='email-icon' aria-label="Email" />
          <a href="suresh@gkce.edu.in">suresh@gkce.edu.in</a>
        </div>
      </div>
    </header>
  )
}

export default Header
