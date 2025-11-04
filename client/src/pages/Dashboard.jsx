import React, { useState } from "react";
import api from "../api/api";
import ImageGrid from "../components/ImageGrid";
import SearchSection from "../components/SearchBar";

export default function Dashboard({ user }) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]); 

  const handleSearch = async (term) => {
    setQuery(term);
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/images/search", { term });
      setImages(res.data || []);
      setSelected([]); 
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <SearchSection onSearch={handleSearch} />


{selected.length > 0 && (
  <div
    className="text-center mt-4"
    style={{
      color: "#6b7280",          
      fontSize: "1rem",          
      fontWeight: 500,           
      letterSpacing: "0.3px",
    }}
  >
    <i
      className="bi bi-check-circle me-2"
      style={{ color: "#6d28d9", fontSize: "1.1rem" }} 
    ></i>
    {selected.length} image{selected.length > 1 ? "s" : ""} selected
  </div>
)}


      {loading && <p className="text-center mt-3">Loading images...</p>}
      {error && <p className="text-center text-danger mt-3">{error}</p>}

      {images.length > 0 ? (
        <ImageGrid
          images={images}
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
        !loading && <p className="text-center mt-3">No images found.</p>
      )}
    </div>
  );
}
