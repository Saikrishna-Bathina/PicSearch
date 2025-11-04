import React from "react";
import { Tooltip } from "react-tooltip"; 
import Logo from '/logo.png'

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const providers = [
    { label: "Google", url: `${BACKEND}/auth/google`, icon: "https://img.icons8.com/color/48/google-logo.png" },
    { label: "GitHub", url: `${BACKEND}/auth/github`, icon: "https://img.icons8.com/ios-filled/48/github.png" },
  ];

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="PicSearch Logo"
          style={{ width: "300px", marginBottom: "20px" }}
        />
        <p style={{ color: "#6b7280", maxWidth: "300px" }}>
          Discover and explore beautiful images across the web.
        </p>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={cardStyle}>
          <h2 className="mb-4" style={{ fontWeight: "bold" }}>
            Welcome Back!
          </h2>
          <p className="text-muted mb-4">
            Sign in to continue to your account.
          </p>

          <div className="d-grid gap-3 mb-4" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {providers.map((p) => (
              <a
                key={p.label}
                href={p.url}
                className="btn d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "#e5e7eb",
                  border: "1px solid",
                  padding: "12px 20px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                <img
                  src={p.icon}
                  alt={`${p.label} icon`}
                  className="me-2"
                  style={{ width: "20px", height: "20px", marginRight: "10px" }}
                />
                Continue with {p.label}
              </a>
            ))}

            <div
              className="btn d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#e5e7eb",
                color: "#9ca3af",
                border: "1px solid #d1d5db",
                padding: "12px 20px",
                fontSize: "1rem",
                fontWeight: 500,
                borderRadius: "8px",
                cursor: "not-allowed",
                position: "relative",
              }}
              title="Facebook login requires business verification (approx. 7 days), so this feature is temporarily unavailable."
            >
              <img
                src="https://img.icons8.com/color/48/facebook-new.png"
                alt="Facebook icon"
                style={{ width: "20px", height: "20px", marginRight: "10px" }}
              />
              Continue with Facebook
            </div>
          </div>

          <p className="small text-muted" style={{ lineHeight: "1.5" }}>
            By signing in, you agree to our
            <a
              href="#"
              className="ms-1 me-1"
              style={{
                color: "#5b21b6",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Terms of Service
            </a>
            and
            <a
              href="#"
              className="ms-1"
              style={{
                color: "#5b21b6",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
