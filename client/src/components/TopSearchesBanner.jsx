import React, { useEffect, useState } from "react";
import api from "../api/api"; 

export default function TopSearchesBadges() {
  const [top, setTop] = useState([]); 

  useEffect(() => {
    
    (async () => {
      try {
        const res = await api.get("/api/images/top-searches");
        setTop(res.data || []);
      } catch (err) {
        console.error("Top searches error:", err);
      }
    })();
    
  }, []);

  if (top.length === 0) return null;

  return (
    <div>
      <h5 style={{ fontWeight: 'bold', marginBottom: '15px' ,textAlign:'left'}}>Top Searches</h5>
      <div className="d-flex align-items-center flex-wrap">
        {top.map((t, i) => (
          <span key={i} 
            className="me-3 mb-2" 
            style={{ 
              backgroundColor: '#f5f5f5', 
              color: '#333', 
              cursor: 'pointer',
              padding: '8px 12px', 
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}