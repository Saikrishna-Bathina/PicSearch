import React from "react";
import "./ImageGrid.css";

export default function ImageGrid({ images, selected, setSelected }) {
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="image-grid">
      {images.map((img) => (
        <div
          key={img.id}
          className={`image-item ${
            selected.includes(img.id) ? "selected" : ""
          }`}
        >
          <img
            src={img.urls.small}
            alt={img.alt_description || "unsplash-img"}
            onClick={() => toggleSelect(img.id)}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={selected.includes(img.id)}
              onChange={() => toggleSelect(img.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
