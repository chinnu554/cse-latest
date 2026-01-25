import { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import "./Photo.css";

function Photo() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  useEffect(() => {
  if (isViewerOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isViewerOpen]);


  useEffect(() => {
    async function fetchPhoto() {
      try {
        const response = await fetch("http://localhost:5000/photo-gallery");
        const images = await response.json();
        setPhotos(images);
      } catch (err) {
        console.error("Error fetching photos", err);
      }
    }
    fetchPhoto();
  }, []);

  const openViewer = (index) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  return (
    <>
      <h1>Hello photo gallery</h1>

      <div className="album">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            className="photo-gallery"
            alt="gallery"
            onClick={() => openViewer(index)}
          />
        ))}
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={photos}
          currentIndex={currentIndex}
          onClose={closeViewer}
          disableScroll={true}
          closeOnClickOutside={true}
        />
      )}
    </>
  );
}

export default Photo;
