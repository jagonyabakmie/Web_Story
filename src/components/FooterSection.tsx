// FooterSection.tsx
// "Bukan Takdir. Ini Sistem yang Bisa Dibenahi." closing + footer
import { useEffect, useRef, useState } from "react";

export default function FooterSection() {
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
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <footer ref={ref} style={{ position: "relative" }}>
      {/* ── CLOSING SECTION ─────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          background: "#C5EDEA",
          padding: "clamp(4rem,10vh,8rem) clamp(1.5rem,7vw,8rem)",
          overflow: "hidden",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Ornamen blob kiri */}
        <img
          src="/images/ornamen8.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "clamp(160px, 28vw, 420px)",
            pointerEvents: "none",
            opacity: 0.6,
            zIndex: 0,
          }}
        />

        {/* Ornamen bunga kanan atas */}
        <img
          src="/images/bunga3.png"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "1rem",
            right: "20%",
            width: "clamp(50px,7vw,100px)",
            pointerEvents: "none",
            opacity: 0.7,
            zIndex: 1,
          }}
        />

        {/* Illustration — mhs1 kanan */}
        <img
          src="/images/mhs1.png"
          alt="Ilustrasi mahasiswa kesehatan"
          style={{
            position: "absolute",
            right: "clamp(1rem,5vw,4rem)",
            bottom: 0,
            height: "clamp(200px,45vh,500px)",
            width: "auto",
            objectFit: "contain",
            zIndex: 2,
            pointerEvents: "none",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
          }}
        />

        {/* Illustration — mhs2 kanan (offset) */}
        <img
          src="/images/mhs2.png"
          alt="Ilustrasi tenaga kesehatan"
          style={{
            position: "absolute",
            right: "clamp(7rem,18vw,18rem)",
            bottom: 0,
            height: "clamp(140px,30vh,340px)",
            width: "auto",
            objectFit: "contain",
            zIndex: 1,
            pointerEvents: "none",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))",
          }}
        />

        {/* TEXT content */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: 580,
          }}
        >
          <div style={reveal(0.1)}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "#0C2726",
              lineHeight: 1.1,
              margin: "0 0 1.2rem",
            }}>
              Bukan Takdir.{" "}
              <br />
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#DB6058",
              }}>
                Ini Sistem
              </span>{" "}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#0C2726",
              }}>
                yang Bisa Dibenahi.
              </span>
            </h2>
          </div>

          <div style={reveal(0.2)}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
              color: "#1a3b38",
              lineHeight: 1.85,
              margin: 0,
              maxWidth: 480,
            }}>
              Angka harapan hidup Sulawesi Barat bukan hanya statistik — Ia adalah cerminan dari setiap puskesmas yang kekurangan dokter, setiap warga yang tidak bisa mengakses BPJS, dan setiap fasilitas yang memisahkan masyarakat dari layanan kesehatan.
            </p>
          </div>
        </div>
      </div>

      {/* ── FOOTER BAR ──────────────────────────────────────── */}
      <div
        style={{
          background: "#0C2726",
          padding: "1.5rem clamp(1.5rem,7vw,8rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Left — branding */}
        <div>
          <div style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "#C5EDEA",
            letterSpacing: "-0.01em",
          }}>
            Sulbar · AHH
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.68rem",
            color: "rgba(197,237,234,0.55)",
            marginTop: "0.2rem",
          }}>
            Data Storytelling — Akses Kesehatan Sulawesi Barat 2024
          </div>
        </div>

        {/* Center — nav links */}
        <div style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          {["Hero", "Latar", "BPJS", "Faskes", "Nakes", "Tren", "Peta"].map((label) => (
            <span
              key={label}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "rgba(197,237,234,0.65)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C5EDEA")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(197,237,234,0.65)")}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Right — source */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.3rem",
        }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.62rem",
            color: "rgba(197,237,234,0.45)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}>
            Sumber Data
          </div>
          <div style={{
            display: "flex",
            gap: "0.6rem",
            alignItems: "center",
          }}>
            <img
              src="/images/stis.webp"
              alt="STIS"
              style={{ height: 22, width: "auto", opacity: 0.8, filter: "brightness(10)" }}
            />
          </div>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.6rem",
            color: "rgba(197,237,234,0.35)",
            marginTop: "0.2rem",
          }}>
            BPS · Kemenkes RI · 2024
          </div>
        </div>
      </div>
    </footer>
  );
}
