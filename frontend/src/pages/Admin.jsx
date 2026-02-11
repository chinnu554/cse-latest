import { useState } from "react";
import "./Admin.css";
import { FaUser, FaLock } from 'react-icons/fa';
import SEO from "../components/SEO";

function AdminPanel() {
  const [accessToken, setAccessToken] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const [pdf, setPdf] = useState(null);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [fileType, setFileType] = useState("");
  const [unit, setUnit] = useState("");

  const [sliderImage, setSliderImage] = useState(null);
  const [sliderMessage, setSliderMessage] = useState("");
  const [sliderUploading, setSliderUploading] = useState(false);

  const [galleryImage, setGalleryImage] = useState(null);
  const [galleryMessage, setGalleryMessage] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  async function submitLogin() {
    try {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const result = await fetch("https://backend.devsparks.online/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await result.json();
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
      document.getElementById("demo").innerHTML = data.message;
      document.getElementById("demo").style.color =
        data.message === "Login successful" ? "green" : "red";

      if (data.access) setAccessToken(true);
    } catch (err) {
      console.error(err);
    }
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setMessage("Please select an image");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("role", role);
    formData.append("email", email);
    formData.append("image", image);

    try {
      const res = await fetch(
        "https://backend.devsparks.online/facultycreate/uploadTeaching",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("User added successfully!");
        setUsername("");
        setRole("");
        setEmail("");
        setImage(null);
        document.getElementById("img").value = null;
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    if (!pdf) return setMessage("Please select a PDF");
    if (!year || !semester || !subject || !fileType)
      return setMessage("Please fill in all PDF fields");

    setUploading(true);
    setMessage("");
    setDownloadUrl("");

    try {
      const formData = new FormData();
      formData.append("pdf", pdf);
      formData.append("year", year);
      formData.append("semester", semester);
      formData.append("subject", subject);
      formData.append("fileType", fileType);
      formData.append("unit", unit);

      const res = await fetch("https://backend.devsparks.online/resources/upload-resources", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setDownloadUrl(data.downloadUrl);
        setPdf(null);
        setYear("");
        setSemester("");
        setSubject("");
        setFileType("");
        setUnit("");
        document.getElementById("pdf").value = null;
      } else {
        setMessage(data.error || "PDF upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error while uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  const handleSliderUpload = async (e) => {
    e.preventDefault();
    if (!sliderImage) return setSliderMessage("Please select a slider image");

    setSliderUploading(true);
    setSliderMessage("");

    const formData = new FormData();
    formData.append("image", sliderImage);

    try {
      const res = await fetch("https://backend.devsparks.online/images/upload-slider", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setSliderMessage("Slider image uploaded successfully!");
        setSliderImage(null);
        document.getElementById("sliderImg").value = null;
      } else {
        setSliderMessage(data.message || "Slider upload failed");
      }
    } catch (err) {
      console.error(err);
      setSliderMessage("Server error while uploading slider image");
    } finally {
      setSliderUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    e.preventDefault();
    if (!galleryImage) return setGalleryMessage("Please select a gallery image");

    setGalleryUploading(true);
    setGalleryMessage("");

    const formData = new FormData();
    formData.append("image", galleryImage);

    try {
      const res = await fetch("https://backend.devsparks.online/images/upload-gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setGalleryMessage("Gallery image uploaded successfully!");
        setGalleryImage(null);
        document.getElementById("galleryImg").value = null;
      } else {
        setGalleryMessage(data.message || "Gallery upload failed");
      }
    } catch (err) {
      console.error(err);
      setGalleryMessage("Server error while uploading gallery image");
    } finally {
      setGalleryUploading(false);
    }
  };

  return (
    <>
      <SEO
        title="Admin Panel"
        description="Secure admin access for managing department resources and data."
        keywords="Admin, Login, Management, Dashboard"
        canonicalUrl={window.location.href}
      />
      {!accessToken ? (
        <div className="loginpage">
          <div className="login-background"></div>
          <div className="loginbox fade-in">
            <h2>Welcome Back</h2>
            <p className="subtitle">Please login to continue</p>

            <div className="input-group">
              <div className="icon">
                <FaUser />
              </div>
              <input type="text" id="username" placeholder="Username" required />
            </div>

            <div className="input-group">
              <div className="icon">
                <FaLock />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" onClick={submitLogin} className="login-btn">
              Login
            </button>
            <p id="demo" className="message"></p>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
          <h1>Admin Panel</h1>

          <h2>Add User</h2>
          <form onSubmit={handleUserSubmit}>
            <input
              type="file"
              id="img"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <br /><br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br /><br />
            <button type="submit">Add User</button>
          </form>

          <hr style={{ margin: "40px 0" }} />

          <h2>Upload PDF</h2>
          <form onSubmit={handlePdfSubmit}>
            <input
              type="file"
              id="pdf"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="File Type"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              required
            />
            <br /><br />
            <input
              type="text"
              placeholder="Unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
            <br /><br />
            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload PDF"}
            </button>
          </form>

          {message && <p>{message}</p>}
          {downloadUrl && (
            <p>
              PDF Download:{" "}
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                Click here
              </a>
            </p>
          )}

          <hr style={{ margin: "40px 0" }} />

          <h2>Upload Slider Image</h2>
          <form onSubmit={handleSliderUpload}>
            <input
              type="file"
              id="sliderImg"
              accept="image/*"
              onChange={(e) => setSliderImage(e.target.files[0])}
              required
            />
            <br /><br />
            <button type="submit" disabled={sliderUploading}>
              {sliderUploading ? "Uploading..." : "Upload Slider Image"}
            </button>
          </form>
          {sliderMessage && <p>{sliderMessage}</p>}

          <hr style={{ margin: "40px 0" }} />

          <h2>Upload Gallery Image</h2>
          <form onSubmit={handleGalleryUpload}>
            <input
              type="file"
              id="galleryImg"
              accept="image/*"
              onChange={(e) => setGalleryImage(e.target.files[0])}
              required
            />
            <br /><br />
            <button type="submit" disabled={galleryUploading}>
              {galleryUploading ? "Uploading..." : "Upload Gallery Image"}
            </button>
          </form>
          {galleryMessage && <p>{galleryMessage}</p>}
        </div>
      )}
    </>
  );
}

export default AdminPanel;
