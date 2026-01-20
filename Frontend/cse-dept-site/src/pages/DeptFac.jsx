import { useState } from "react";
import labOne from "../../images/lab-images/lab1.png";
import labTwo from "../../images/lab-images/lab2.png";
import labThree from "../../images/lab-images/lab3.png";
import labFour from "../../images/lab-images/lab4.png";
import labFive from "../../images/lab-images/lab5.png";
import avHall from "../../images/lab-images/avhall.png";
import avHall1 from "../../images/lab-images/avhall1.png";
import "./DeptFac.css";

function DeptFac() {
  // All images for lightbox
  const allImages = [
    { src: labOne, label: "Lab 1" },
    { src: labTwo, label: "Lab 2" },
    { src: labThree, label: "Lab 3" },
    { src: labFour, label: "Lab 4" },
    { src: labFive, label: "Lab 5" },
    { src: avHall, label: "Audio Visual Hall 1" },
    { src: avHall1, label: "Audio Visual Hall 2" },
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
    <div className="dept-fac">
      <h1 className="heading">Department Facilities Page</h1>
        <h1 style={{marginLeft:"60px"}}>Computer Labs</h1>
      <div className="dept-labs">
        
       

        {allImages.slice(0, 5).map((img, index) => (
          <div className="img-box" key={index}>
            <img
              src={img.src}
              alt={img.label}
              style={{ width: "600px", height: "300px", cursor: "pointer" }}
              onClick={() => openViewer(index)}
            />
            <h2>{img.label}</h2>
          </div>
        ))}
      </div>
        <h1 style={{marginLeft:"60px"}}>Audio Visual Hall</h1>
      <div className="dept-labs">
        
        

        {allImages.slice(5).map((img, index) => (
          <div className="img-box" key={index + 5}>
            <img
              src={img.src}
              alt={img.label}
              style={{ width: "600px", height: "300px", cursor: "pointer" }}
              onClick={() => openViewer(index + 5)}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="viewer" onClick={closeViewer}>
          <span className="close" onClick={closeViewer}>
            ✕
          </span>

          <span className="count">
            {currentIndex + 1} / {allImages.length}
          </span>

          <span className="nav left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            ❮
          </span>

          <img
            src={allImages[currentIndex].src}
            alt={allImages[currentIndex].label}
            className="viewer-img"
            onClick={(e) => e.stopPropagation()}
          />

          <span className="nav right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            ❯
          </span>
        </div>
      )}
    </div>
  );
}

export default DeptFac;
