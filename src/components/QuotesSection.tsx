// QuotesSection.tsx
// Quote: "Dokter dan nakes adalah nyawa dari sistem layanan kesehatan."
import { useEffect, useRef, useState } from "react";

export default function QuotesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background: "#FFFBF0",
        padding: "clamp(3.5rem,9vh,7rem) clamp(1.5rem,7vw,8rem)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
      }}
    >
      {/* Ornamen bunga kiri */}
      <img
        src="/images/ornamen6.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "2%",
          transform: "translateY(-50%)",
          width: "clamp(60px,9vw,130px)",
          pointerEvents: "none",
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      {/* Ornamen kanan */}
      <img
        src="/images/ornamen7.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: "2%",
          transform: "translateY(-50%)",
          width: "clamp(60px,9vw,130px)",
          pointerEvents: "none",
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      {/* Ornamen bunga atas tengah */}
      <img
        src="/images/bunga1.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "0.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(50px,8vw,100px)",
          pointerEvents: "none",
          opacity: 0.65,
          zIndex: 0,
        }}
      />

      {/* Quote content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 680,
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
          transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
        }}
      >
        {/* Large opening quote mark */}
        <div style={{
          fontFamily: "'Lora', serif",
          fontStyle: "italic",
          fontSize: "clamp(4rem, 8vw, 7rem)",
          color: "#C5EDEA",
          lineHeight: 0.5,
          marginBottom: "0.5rem",
          userSelect: "none",
        }}>
          "
        </div>

        <blockquote
          style={{
            fontFamily: "'Lora', serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
            color: "#0C2726",
            lineHeight: 1.4,
            margin: "0 0 1.2rem",
          }}
        >
          Dokter dan nakes adalah{" "}
          <span style={{ color: "#DB6058", textDecoration: "underline", textDecorationColor: "#DB605855", textUnderlineOffset: 4 }}>
            nyawa
          </span>{" "}
          dari sistem layanan kesehatan.
        </blockquote>

        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "#64748b",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          — Prinsip dasar sistem kesehatan WHO
        </div>
      </div>
    </section>
  );
}
