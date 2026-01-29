import { useState } from "react";
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
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeViewer = () => setIsOpen(false);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));

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
          <div className="viewer" onClick={closeViewer}>
            <span className="close" onClick={closeViewer}>✕</span>
            <span className="count">{currentIndex + 1} / {allImages.length}</span>
            <span className="nav left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>❮</span>
            <img
              src={allImages[currentIndex].src}
              alt={allImages[currentIndex].label}
              className="viewer-img"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="nav right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>❯</span>
          </div>
        )}
      </div>
    </>
  );
}

export default DeptFac;
