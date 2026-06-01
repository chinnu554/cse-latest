import { useState, useEffect } from "react";
import ImageViewer from "react-simple-image-viewer";
import "./Photo.css";
import SEO from "../components/SEO";
import { API_BASE_URL } from "../config/api";

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
        const response = await fetch(`${API_BASE_URL}/images/photo-gallery`);
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

  const PhotoSkeleton = () => (
    <div className="album" aria-label="Loading photos">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="photo-card photo-skeleton-card" key={index}>
          <div className="skeleton photo-skeleton-image"></div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <SEO
        title="GKCE CSE Photo Gallery | Campus & Events"
        description="Explore photos of campus life, technical events, workshops, seminars, and facilities of the CSE Department at Gokula Krishna College of Engineering (GKCE)."
        keywords="GKCE CSE gallery, GKCE campus photos, CSE department events GKCE, GKCE workshops photos, engineering college gallery GKCE"
        canonicalUrl="https://gkce-cse.in/gallery"
      />


      <div className="photo-page-container">
        <div className="photo-header">
          <h1>Photo Gallery</h1>
        </div>

        {loading ? (
          <PhotoSkeleton />
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
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 10000
            }}
          />
        )}
      </div>
    </>
  );
}

export default Photo;
