import { useState } from "react";

function PDFUpload() {
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a PDF file to upload.");
      return;
    }

    if (!year || !semester || !branch || !subject || !unit) {
      setMessage("Please fill in all fields.");
      return;
    }

    setUploading(true);
    setMessage("");
    setDownloadUrl("");

    try {
      const data = new FormData();
      data.append("pdf", file);
      data.append("year", year);
      data.append("semester", semester);
      data.append("branch", branch);
      data.append("subject", subject);
      data.append("unit", unit);

      const response = await fetch("http://localhost:5000/upload-pdf", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setDownloadUrl(result.downloadUrl);
      } else {
        setMessage(result.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} /><br /><br />
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        /><br /><br />
        <input
          type="text"
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        /><br /><br />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>
      {message && <p>{message}</p>}
      {downloadUrl && (
        <p>
          Download: <a href={downloadUrl} target="_blank" rel="noopener noreferrer">Click here</a>
        </p>
      )}
    </div>
  );
}

export default PDFUpload;