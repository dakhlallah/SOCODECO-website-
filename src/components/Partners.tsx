"use client";

const partners = [
  "AECOM",
  "Foster + Partners",
  "Arup Group",
  "WSP Global",
  "Dar Al-Handasah",
  "BESIX Group",
  "Vinci Construction",
  "Bouygues Bâtiment",
];

export default function Partners() {
  return (
    <section
      style={{
        background: "#FFFFFF",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#999",
          marginBottom: "2.5rem",
        }}
      >
        Partnered with leading organizations
      </p>

      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <div
          className="animate-marquee"
          style={{
            display: "flex",
            width: "max-content",
            whiteSpace: "nowrap",
          }}
        >
          {[...partners, ...partners].map((name, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(26,26,26,0.35)",
                paddingRight: "4rem",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "rgba(26,26,26,0.25)",
                  flexShrink: 0,
                }}
              />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
