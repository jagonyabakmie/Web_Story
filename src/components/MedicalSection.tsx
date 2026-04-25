// MedicalSection.tsx
// "2370 total nakes Sulbar" + "DISTRIBUSI PER JENIS TENAGA" bar chart
import { useEffect, useRef, useState } from "react";

const nakesData = [
  { label: "Dokter Umum", value: 380, color: "#2DD4BF" },
  { label: "Dokter Spesialis", value: 120, color: "#34D399" },
  { label: "Perawat", value: 980, color: "#60A5FA" },
  { label: "Bidan", value: 620, color: "#F472B6" },
  { label: "Apoteker", value: 150, color: "#A78BFA" },
  { label: "Lainnya", value: 120, color: "#F59E0B" },
];

const MAX_VAL = 980;

export default function MedicalSection() {
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
        background: "#F5FFFE",
        padding: "clamp(3rem,8vh,6rem) clamp(1.5rem,7vw,8rem)",
        overflow: "hidden",
      }}
    >
      {/* Ornamen bunga atas kanan */}
      <img
        src="/images/bunga2.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "3%",
          width: "clamp(60px,9vw,110px)",
          pointerEvents: "none",
          opacity: 0.7,
          zIndex: 0,
        }}
      />

      {/* Section label */}
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
          Tenaga Kesehatan Sulbar
        </span>
      </div>

      {/* Grid: stat kiri + chart kanan */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: "clamp(2rem,5vw,4rem)",
        alignItems: "start",
        position: "relative",
        zIndex: 2,
      }}>
        {/* LEFT — big number + narrative */}
        <div>
          <div style={reveal(0.1)}>
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "#0C2726",
              lineHeight: 1,
              marginBottom: "0.2rem",
            }}>
              2370
            </div>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              fontWeight: 700,
              color: "#DB6058",
              marginBottom: "1.5rem",
            }}>
              total nakes Sulbar
            </div>
          </div>

          <div style={reveal(0.2)}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#475569",
              lineHeight: 1.85,
              margin: "0 0 1rem",
            }}>
              Sekitar puskesmas di setiap kabupaten hanya memiliki beberapa dokter dan sangat bergantung pada bidan yang yang dalam masa dinas. Kondisi ini jauh di bawah standar WHO.
            </p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#475569",
              lineHeight: 1.85,
              margin: 0,
            }}>
              Di Sulbar yang geografis beragam, jumlah nakes tidak merata dan satu dokter harus melayani rata-rata dua kali lebih banyak penduduk dibanding rata-rata nasional.
            </p>
          </div>

          {/* mhs2 ilustrasi */}
          <div style={{ ...reveal(0.3), marginTop: "1.5rem" }}>
            <img
              src="/images/mhs2.png"
              alt="Ilustrasi tenaga kesehatan"
              style={{
                width: "clamp(100px,16vw,220px)",
                objectFit: "contain",
                filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.1))",
              }}
            />
          </div>
        </div>

        {/* RIGHT — bar chart "DISTRIBUSI PER JENIS TENAGA" */}
        <div>
          <div style={{
            ...reveal(0.12),
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#64748b",
            textAlign: "center",
            marginBottom: "1.5rem",
            padding: "0.6rem 1rem",
            background: "rgba(0,0,0,0.03)",
            borderRadius: 8,
          }}>
            Distribusi Per Jenis Tenaga
          </div>

          {/* Vertical bar chart */}
          <div style={{
            ...reveal(0.2),
            display: "flex",
            alignItems: "flex-end",
            gap: "clamp(0.4rem,1.5vw,1rem)",
            height: 200,
            justifyContent: "center",
            padding: "0 0.5rem",
          }}>
            {nakesData.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.4rem",
                  flex: 1,
                }}
              >
                {/* Value label */}
                <div style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.6rem, 1.1vw, 0.75rem)",
                  color: item.color,
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.5s ease ${0.4 + i * 0.07}s`,
                }}>
                  {item.value}
                </div>

                {/* Bar */}
                <div style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: "6px 6px 0 0",
                  height: "160px",
                  display: "flex",
                  alignItems: "flex-end",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: "100%",
                    background: item.color,
                    borderRadius: "6px 6px 0 0",
                    height: visible ? `${(item.value / MAX_VAL) * 100}%` : "0%",
                    transition: `height 0.9s ease ${0.35 + i * 0.08}s`,
                  }} />
                </div>

                {/* Label */}
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(0.48rem, 0.8vw, 0.6rem)",
                  fontWeight: 600,
                  color: "#64748b",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}>
                  {item.label.split(" ").map((w, wi) => (
                    <span key={wi} style={{ display: "block" }}>{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Y-axis labels */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
            paddingTop: "0.4rem",
            borderTop: "1px solid rgba(0,0,0,0.08)",
          }}>
            {[0, 200, 400, 600, 800, 1000].map(v => (
              <span key={v} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.58rem",
                color: "#94a3b8",
              }}>{v}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
