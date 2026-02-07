import { useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import labOne from "../../images/lab-images/lab1.png";
import labTwo from "../../images/lab-images/lab2.png";
import labThree from "../../images/lab-images/lab3.png";
import labFour from "../../images/lab-images/lab4.png";
import labFive from "../../images/lab-images/lab5.png";
import avHall from "../../images/lab-images/avhall.png";
import avHall1 from "../../images/lab-images/avhall1.png";
import "./DeptFac.css";
import SEO from "../components/SEO";

function DeptFac() {
  const allImages = [
    { src: labOne, label: "Advanced Computing Lab" },
    { src: labTwo, label: "Network Simulation Lab" },
    { src: labThree, label: "AI & ML Lab" },
    { src: labFour, label: "Data Science Lab" },
    { src: labFive, label: "IoT & Embedded Systems Lab" },
    { src: avHall, label: "Seminar Hall (AV-1)" },
    { src: avHall1, label: "Conference Hall (AV-2)" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openViewer = (index) => {
    if (window.innerWidth <= 768) return;
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeViewer = () => setIsOpen(false);

  return (
    <>
      <SEO
        title="Department Facilities"
        description="State-of-the-art laboratories and audio-visual halls for CSE students."
        keywords="Labs, Computer Labs, Seminar Hall, AV Hall, Infrastructure"
      />
      <div className="dept-fac">
        <h1 className="page-title">Department Facilities</h1>

        <div className="section-container">
          <h2 className="section-title">Computer Laboratories</h2>
          <div className="facilities-grid">
            {allImages.slice(0, 5).map((img, index) => (
              <div className="facility-card" key={index} onClick={() => openViewer(index)}>
                <div className="img-wrapper">
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                  />
                </div>
                <div className="card-content">
                  <h3>{img.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-container">
          <h2 className="section-title">Audio Visual Halls</h2>
          <div className="facilities-grid">
            {allImages.slice(5).map((img, index) => (
              <div className="facility-card" key={index + 5} onClick={() => openViewer(index + 5)}>
                <div className="img-wrapper">
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                  />
                </div>
                <div className="card-content">
                  <h3>{img.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isOpen && (
          <ImageViewer
            src={allImages.map((img) => img.src)}
            currentIndex={currentIndex}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeViewer}
          />
        )}
      </div>
    </>
  );
}

export default DeptFac;
