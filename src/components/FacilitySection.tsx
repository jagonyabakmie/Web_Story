// FacilitySection.tsx
// "Jumlah Fasilitas Per Kabupaten" section
import { useEffect, useRef, useState } from "react";

const kabData = [
  { name: "Mamuju", faskes: 29, color: "#2DD4BF" },
  { name: "Polewali Mandar", faskes: 26, color: "#34D399" },
  { name: "Majene", faskes: 22, color: "#60A5FA" },
  { name: "Mamuju Utara", faskes: 18, color: "#A78BFA" },
  { name: "Mamasa", faskes: 15, color: "#F59E0B" },
  { name: "Mamuju Tengah", faskes: 12, color: "#F87171" },
];

const MAX = 29;

export default function FacilitySection() {
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
      {/* Ornamen kiri atas */}
      <img
        src="/images/ornamen5.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(80px,12vw,180px)",
          pointerEvents: "none",
          opacity: 0.6,
          zIndex: 0,
        }}
      />

      {/* Ornamen kanan atas bunga */}
      <img
        src="/images/bunga5.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "1rem",
          right: "3%",
          width: "clamp(60px,9vw,120px)",
          pointerEvents: "none",
          opacity: 0.75,
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
          Akses Fasilitas Kesehatan
        </span>
      </div>

      {/* Grid: text kiri + chart kanan */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem,5vw,4rem)",
        alignItems: "start",
        position: "relative",
        zIndex: 2,
      }}>
        {/* LEFT — headline + narrative */}
        <div>
          <div style={reveal(0.12)}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
              color: "#0C2726",
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}>
              Jumlah Fasilitas{" "}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#DB6058",
              }}>
                Per Kabupaten
              </span>
            </h2>
          </div>

          <div style={reveal(0.2)}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#475569",
              lineHeight: 1.85,
              margin: "0 0 1rem",
            }}>
              Mencakup rumah sakit, puskesmas, klinik, dan posyandu per kabupaten. Puskesmas berfungsi sebagai ujung tombak layanan tingkat pertama yang menghubungkan populasi ke masyarakat untuk mempromosikan kesehatan.
            </p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#475569",
              lineHeight: 1.85,
              margin: 0,
            }}>
              Di Sulbar yang geografinya beragam dan luas, jumlah fasilitas rata-rata adalah tidak cukup untuk melayani masyarakat yang tersebar dan terpinggirkan hidup jauh dan terpencil.
            </p>
          </div>

          {/* Highlight card */}
          <div style={{
            ...reveal(0.3),
            background: "#C5EDEA",
            borderRadius: 14,
            padding: "1rem 1.4rem",
            marginTop: "1.5rem",
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
          }}>
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#0C2726",
                marginBottom: "0.2rem",
              }}>Faskes Terbanyak</div>
              <div style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#0C2726",
                lineHeight: 1,
              }}>29 unit</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.65rem",
                color: "#334155",
                marginTop: "0.2rem",
              }}>Kabupaten Mamuju</div>
            </div>
            <div style={{ width: 1, height: 48, background: "rgba(12,39,38,0.2)" }} />
            <div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#DB6058",
                marginBottom: "0.2rem",
              }}>Faskes Tersedikit</div>
              <div style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "1.6rem",
                color: "#DB6058",
                lineHeight: 1,
              }}>12 unit</div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.65rem",
                color: "#334155",
                marginTop: "0.2rem",
              }}>Mamuju Tengah</div>
            </div>
          </div>
        </div>

        {/* RIGHT — horizontal bar chart */}
        <div style={reveal(0.2)}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#64748b",
            marginBottom: "1.2rem",
          }}>
            Distribusi Fasilitas Kesehatan per Kabupaten
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {kabData.map((kab, i) => (
              <div key={kab.name} style={{ ...reveal(0.25 + i * 0.06) }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.3rem",
                }}>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#334155",
                  }}>
                    {kab.name}
                  </span>
                  <span style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: kab.color,
                  }}>
                    {kab.faskes} unit
                  </span>
                </div>
                <div style={{
                  height: 10,
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: 8,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: visible ? `${(kab.faskes / MAX) * 100}%` : "0%",
                    background: kab.color,
                    borderRadius: 8,
                    transition: `width 1s ease ${0.3 + i * 0.08}s`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ornamen bunga bawah kiri */}
      <img
        src="/images/bunga6.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "2%",
          width: "clamp(50px,8vw,100px)",
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />
    </section>
  );
}
