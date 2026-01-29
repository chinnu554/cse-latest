import { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import "./Photo.css";
import SEO from "../components/SEO";

function Photo() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
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
      <SEO
        title="Photo Gallery"
        description="Explore the vibrant campus life, events, and facilities of GKCE CSE Department."
        keywords="Gallery, Photos, Campus Life, Events, GKCE CSE"
      />

      <div className="photo-page-container">
        <div className="photo-header">
          <h1>Photo Gallery</h1>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading photos...</p>
          </div>
        ) : (
          <div className="album">
            {photos.length > 0 ? (
              photos.map((photo, index) => (
                <div key={index} className="photo-card fade-in">
                  <img
                    src={photo}
                    className="photo-gallery-img"
                    alt={`Gallery item ${index + 1}`}
                    onClick={() => openViewer(index)}
                    loading="lazy"
                  />
                  <div className="photo-overlay" onClick={() => openViewer(index)}>
                    <span>View</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No photos available.</p>
            )}
          </div>
        )}

        {isViewerOpen && (
          <ImageViewer
            src={photos}
            currentIndex={currentIndex}
            onClose={closeViewer}
            disableScroll={true}
            closeOnClickOutside={true}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)"
            }}
          />
        )}
      </div>
    </>
  );
}

export default Photo;
