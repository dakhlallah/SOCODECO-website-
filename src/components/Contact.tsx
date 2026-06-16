"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const gold = "#B8964E";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.12,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.6 + i * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    }),
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    padding: "1rem 0",
    fontSize: "0.85rem",
    color: "#1A1A1A",
    outline: "none",
    fontFamily: "inherit",
    marginBottom: "1.5rem",
    transition: "border-color 0.4s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "#999",
    display: "block",
    marginBottom: "0.25rem",
  };

  const skylinePath =
    "M50,300 L50,180 L80,180 L80,300 M120,300 L120,120 L150,120 L150,300 M190,300 L190,200 L210,200 L210,160 L240,160 L240,300 M280,300 L280,140 L320,140 L320,300 M360,300 L360,220 L390,220 L390,300 M430,300 L430,100 L460,100 L460,300 M500,300 L500,190 L530,190 L530,300 M570,300 L570,150 L600,150 L600,300";

  const connectingPath =
    "M80,180 L120,180 L120,120 M150,120 L190,120 L190,160 M240,160 L280,160 L280,140 M320,140 L360,140 L360,220 M390,220 L430,220 L430,100 M460,100 L500,100 L500,190 M530,190 L570,190 L570,150";

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "clamp(6rem,12vh,10rem) clamp(1.5rem,5vw,6rem)",
        background: "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background SVG wireframe */}
      <svg
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          opacity: 1,
          pointerEvents: "none",
        }}
        viewBox="0 0 650 400"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.path
          d={skylinePath}
          stroke="rgba(184,150,78,0.08)"
          strokeWidth={0.5}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        <motion.path
          d={connectingPath}
          stroke="rgba(184,150,78,0.08)"
          strokeWidth={0.5}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
        />
      </svg>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          gap: "4rem",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Left side */}
        <div style={{ flex: "1 1 55%", minWidth: "300px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: gold,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: gold,
              }}
            >
              Contact
            </span>
          </motion.div>

          {["Let's Build", "Something", "Extraordinary."].map((line, i) => (
            <motion.div
              key={line}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={headlineVariants}
            >
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  color: "#1A1A1A",
                  margin: 0,
                  fontStyle: i === 2 ? "italic" : "normal",
                }}
              >
                {line}
              </h2>
            </motion.div>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              fontSize: "0.85rem",
              color: "#888",
              maxWidth: "400px",
              marginTop: "2rem",
              lineHeight: 1.6,
            }}
          >
            Our team is ready to discuss your construction and engineering
            requirements.
          </motion.p>
        </div>

        {/* Right side — form */}
        <div style={{ flex: "1 1 35%", minWidth: "280px" }}>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Full Name", name: "name", type: "input" },
              { label: "Email", name: "email", type: "input" },
              {
                label: "Project Description",
                name: "description",
                type: "textarea",
              },
            ].map((field, i) => (
              <motion.div
                key={field.name}
                custom={i}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={formFieldVariants}
              >
                <label style={labelStyle}>{field.label}</label>
                {field.type === "input" ? (
                  <input
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={
                      field.name === "name"
                        ? "Your full name"
                        : "your@email.com"
                    }
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderBottomColor = gold)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderBottomColor =
                        "rgba(0,0,0,0.12)")
                    }
                  />
                ) : (
                  <textarea
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project"
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderBottomColor = gold)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderBottomColor =
                        "rgba(0,0,0,0.12)")
                    }
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              custom={3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={formFieldVariants}
              type="submit"
              style={{
                width: "100%",
                background: gold,
                color: "#FFFFFF",
                padding: "1rem",
                border: "none",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.4s",
                marginTop: "1rem",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#1A1A1A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = gold)
              }
            >
              Send Request
            </motion.button>
          </form>
        </div>
      </div>

      {/* Contact info row */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={infoVariants}
        style={{
          display: "flex",
          gap: "4rem",
          marginTop: "5rem",
          borderTop: "1px solid rgba(0,0,0,0.06)",
          paddingTop: "3rem",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
        }}
      >
        {[
          { city: "Kinshasa, DRC", detail: "Quartier de la Gombe" },
          { city: "Beirut, Lebanon", detail: "Regional Office" },
          { city: "contact@socodeco.org", detail: "" },
        ].map((item) => (
          <div key={item.city}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 400,
                color: "#1A1A1A",
                margin: 0,
              }}
            >
              {item.city}
            </p>
            {item.detail && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#999",
                  margin: "0.3rem 0 0",
                }}
              >
                {item.detail}
              </p>
            )}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
