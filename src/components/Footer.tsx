"use client";

const gold = "#B8964E";
const navLinks = ["Projects", "Services", "About", "Contact"];

export default function Footer() {
  return (
    <footer
      style={{
        padding: "3rem clamp(1.5rem,5vw,6rem)",
        background: "#F9F8F6",
        borderTop: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "#1A1A1A",
          }}
        >
          SOCODECO
        </span>

        <nav style={{ display: "flex", gap: "3rem" }}>
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#999",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      {/* Description */}
      <p
        style={{
          marginTop: "3rem",
          fontSize: "0.8rem",
          color: "#999",
          maxWidth: "500px",
          lineHeight: 1.6,
        }}
      >
        Construction and civil engineering firm operating in the Democratic
        Republic of Congo and Lebanon. Building the structures of tomorrow.
      </p>

      {/* Bottom row */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "#BBB" }}>
          &copy; 2024 SOCODECO. All rights reserved.
        </span>

        <div style={{ display: "flex", gap: "2rem" }}>
          {["Privacy Policy", "Terms"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "0.7rem",
                color: "#BBB",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#BBB")}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
