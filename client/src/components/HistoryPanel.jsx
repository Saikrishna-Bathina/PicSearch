import React, { useEffect, useState } from "react";
import api from "../api/api"; 

export default function RecentSearches() {
  const [history, setHistory] = useState([  ]);

  useEffect(() => {
    
    (async () => {
      try {
        const res = await api.get("/api/images/history");
        setHistory(res.data || []);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    })();
    
  }, []);

  if (history.length === 0) return null;

  return (
<ul className="list-unstyled">
  {history.map((h, index) => {
    const formattedDate = new Date(h.timestamp).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    return (
      <li
        key={index}
        className="d-flex align-items-center justify-content-between mb-2"
        style={{ color: "#374151", fontSize: "0.95rem" }}
      >
        <div className="d-flex align-items-center">
          <i
            className="fa-regular fa-clock me-2"
            style={{
              color: "#6b7280",
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          ></i>
          <span>{h.term}</span>
        </div>

        <span style={{ color: "#9CA3AF", fontSize: "0.8rem" }}>{formattedDate}</span>
      </li>
    );
  })}
</ul>


  );
}