// BpjsSection.tsx
// "Persentase Penduduk Ber-BPJS" section
import { useEffect, useRef, useState } from "react";

const statCards = [
  {
    icon: "/images/heart.png",
    value: "92,66%",
    label: "Cakupan BPJS Tertinggi",
    sub: "Kabupaten Mamuju",
    bg: "#C5EDEA",
    border: "#8DD5CF",
  },
  {
    icon: "/images/medicine.png",
    value: "75,43%",
    label: "Cakupan BPJS Terendah",
    sub: "Mamuju Tengah",
    bg: "#FFF3C4",
    border: "#F4CE6A",
  },
  {
    icon: "/images/bpjs.png",
    value: "83,1%",
    label: "Rata-rata Sulbar 2023",
    sub: "vs. 86,7% Nasional",
    bg: "#FFE5E0",
    border: "#EFAA9E",
  },
];

export default function BpjsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background: "#FFFBF0",
        padding: "clamp(3rem,8vh,6rem) clamp(1.5rem,7vw,8rem)",
        overflow: "hidden",
      }}
    >
      {/* Ornamen bunga kiri atas */}
      <img
        src="/images/bunga3.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-1rem",
          left: "1rem",
          width: "clamp(60px,9vw,110px)",
          pointerEvents: "none",
          opacity: 0.75,
          zIndex: 0,
        }}
      />

      {/* Section Label */}
      <div style={{ ...reveal(0.05), display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem", position: "relative", zIndex: 2 }}>
        <span style={{ display: "inline-block", width: 28, height: 2, background: "#0C2726", borderRadius: 2 }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0C2726",
        }}>
          Akses Pembiayaan Kesehatan
        </span>
      </div>

      {/* Layout: text kiri + ilustrasi kanan */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "2rem",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <div>
          {/* Headline */}
          <div style={reveal(0.12)}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.8vw, 3rem)",
              color: "#0C2726",
              margin: "0 0 0.5rem",
              lineHeight: 1.15,
            }}>
              Persentase Penduduk{" "}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#DB6058",
              }}>
                Ber-BPJS
              </span>
            </h2>
          </div>

          {/* Sub-text */}
          <div style={reveal(0.2)}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#475569",
              lineHeight: 1.8,
              margin: "0 0 2rem",
              maxWidth: 560,
            }}>
              Tanpa BPJS, hanya warga mampu membeli obat ke klinik — dan itu pun menggantungkan hasil penyakit. Perlu dikerasnya memanfaatkan BPJS agar mendapat pelayanan dari tenaga medis yang meningkatkan kualitas kesehatan di Sulawesi Barat.
            </p>
          </div>

          {/* Stat Cards */}
          <div style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}>
            {statCards.map((card, i) => (
              <div
                key={i}
                style={{
                  ...reveal(0.25 + i * 0.1),
                  background: card.bg,
                  border: `1.5px solid ${card.border}`,
                  borderRadius: 16,
                  padding: "1.2rem 1.4rem",
                  minWidth: 140,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  flex: "1 1 140px",
                }}
              >
                <img
                  src={card.icon}
                  alt={card.label}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                />
                {/* XX placeholder matching design */}
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  color: "#0C2726",
                  lineHeight: 1,
                }}>
                  {card.value}
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#334155",
                  textAlign: "center",
                  lineHeight: 1.3,
                }}>
                  {card.label}
                </div>
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.65rem",
                  color: "#64748b",
                  textAlign: "center",
                }}>
                  {card.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ilustrasi mahasiswa / petugas kesehatan */}
        <div style={{
          ...reveal(0.3),
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
          <img
            src="/images/mhs1.png"
            alt="Ilustrasi petugas BPJS"
            style={{
              width: "clamp(120px, 18vw, 280px)",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.12))",
            }}
          />
        </div>
      </div>

      {/* Ornamen bunga kanan bawah */}
      <img
        src="/images/bunga4.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          width: "clamp(50px,8vw,100px)",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />
    </section>
  );
}
