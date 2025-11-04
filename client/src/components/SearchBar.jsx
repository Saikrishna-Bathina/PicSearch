import React, { useState } from "react";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import TopSearchesBadges from "./TopSearchesBanner";
import RecentSearches from "./HistoryPanel";

export default function SearchSection({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
          Search beautiful images...
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="d-flex justify-content-center mb-4">
        <InputGroup style={{ maxWidth: "700px" }}>
          <InputGroup.Text
            style={{
              background: "white",
              borderRight: "none",
              borderRadius: "8px 0 0 8px",
              paddingLeft: "16px",
            }}
          >
            <i className="bi bi-search" style={{ color: "#aaa" }}></i>
          </InputGroup.Text>

          <FormControl
            type="text"
            placeholder="Nature, technology, abstract..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            style={{
              borderLeft: "none",
              borderRight: "none",
              padding: "12px 20px",
            }}
          />

          <Button
            type="submit"
            style={{
              backgroundColor: "#6d28d9",
              borderColor: "#6d28d9",
              borderRadius: "0 8px 8px 0",
              fontWeight: "bold",
              marginLeft: "8px", 
              padding: "0 20px",
            }}
          >
            Search
          </Button>
        </InputGroup>
      </form>

      <Row
        className="justify-content-center mt-5"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <Col md={6} className="mb-4 mb-md-0">
          <TopSearchesBadges />
        </Col>

        <Col md={4}>
          <h5 style={{ fontWeight: "bold", textAlign: "left" }}>Recent Searches</h5>
          <RecentSearches />
        </Col>
      </Row>
    </div>
  );
}
