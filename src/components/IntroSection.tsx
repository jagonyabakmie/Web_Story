// IntroSection.tsx
// "Latar Belakang" — Krisis Kesehatan yang Tersembunyi
import { useEffect, useRef, useState } from "react";

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background: "#F5FFFE",
        overflow: "hidden",
        padding: "clamp(3rem,8vh,6rem) clamp(1.5rem,7vw,8rem)",
      }}
    >
      {/* section label */}
      <div style={{ ...reveal(0.05), display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" }}>
        <span style={{ display: "inline-block", width: 28, height: 2, background: "#0C2726", borderRadius: 2 }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0C2726",
        }}>
          Latar Belakang
        </span>
      </div>

      {/* Two-column grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem, 5vw, 4rem)",
        alignItems: "start",
        position: "relative",
        zIndex: 2,
      }}>
        {/* LEFT — headline + ornamen */}
        <div style={{ position: "relative" }}>
          {/* Ornamen flower top-right of left column */}
          <img
            src="/images/bunga1.png"
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-1rem",
              right: "-2rem",
              width: "clamp(60px, 10vw, 120px)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <div style={reveal(0.15)}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              color: "#0C2726",
              lineHeight: 1.1,
              margin: "0 0 1.5rem",
              position: "relative",
              zIndex: 1,
            }}>
              Krisis Kesehatan{" "}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#DB6058",
              }}>
                yang Tersembunyi
              </span>
            </h2>
          </div>

          {/* AHH badge */}
          <div style={{
            ...reveal(0.25),
            display: "inline-flex",
            alignItems: "center",
            gap: "1.5rem",
            background: "#C5EDEA",
            borderRadius: 16,
            padding: "1rem 1.8rem",
            marginBottom: "1rem",
            position: "relative",
            zIndex: 1,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#0C2726",
                marginBottom: "0.2rem",
              }}>AHH NASIONAL</div>
              <div style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#0C2726",
              }}>74,15</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 600,
                color: "#0C2726",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>TAHUN</div>
            </div>
            <div style={{ width: 1, height: 48, background: "rgba(12,39,38,0.2)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#DB6058",
                marginBottom: "0.2rem",
              }}>AHH SULBAR</div>
              <div style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#DB6058",
              }}>71,03</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 600,
                color: "#DB6058",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>TAHUN</div>
            </div>
          </div>

          {/* Ornamen map shape */}
          <div style={{ ...reveal(0.3), position: "relative", zIndex: 1, marginTop: "1rem" }}>
            <img
              src="/images/ornamen4.png"
              alt="Peta Sulawesi Barat"
              style={{
                width: "clamp(100px, 18vw, 200px)",
                opacity: 0.85,
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        </div>

        {/* RIGHT — narrative paragraphs */}
        <div style={reveal(0.2)}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            lineHeight: 1.85,
            color: "#334155",
            margin: "0 0 1.2rem",
          }}>
            Angka Harapan Hidup (AHH) merupakan salah satu indikator utama dalam mengukur kualitas hidup dan pembangunan manusia. Indonesia memasukkan angkanya dalam perhitungan AHH secara nasional, namun disparitas antar-provinsi masih menjadi persoalan serius.
          </p>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            lineHeight: 1.85,
            color: "#334155",
            margin: "0 0 1.2rem",
          }}>
            Sulawesi Barat konsisten menempati posisi bawah dalam data AHH BPS — bersama Papua. Penyebab kesenjangannya struktural: keterbatasan BPJS, kekurangan tenaga kesehatan, serta minimnya fasilitas kesehatan dan tidak meratanya fasilitas di wilayah yang dapat dijangkau.
          </p>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            lineHeight: 1.85,
            color: "#334155",
            margin: 0,
          }}>
            Sebagai provinsi muda (berdiri 2004), Sulbar menghadapi tantangan ganda: membangun infrastruktur kesehatan dari awal sekaligus melayani populasi yang tersebar di wilayah dengan geografi yang sulit dan berbukit.
          </p>
        </div>
      </div>

      {/* Ornamen bunga bottom-right */}
      <img
        src="/images/bunga2.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-1rem",
          right: "3%",
          width: "clamp(70px, 10vw, 130px)",
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />
    </section>
  );
}
