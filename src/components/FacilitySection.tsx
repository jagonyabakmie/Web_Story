// FacilitySection.tsx
// "Jumlah Fasilitas Per Kabupaten" section
import { useEffect, useRef, useState } from "react";

const kabData = [
  { name: "Majene", faskes: 13 },
  { name: "Polewali Mandar", faskes: 24 },
  { name: "Mamasa", faskes: 20 },
  { name: "Mamuju", faskes: 29 },
  { name: "Pasangkayu", faskes: 16 },
  { name: "Mamuju Tengah", faskes: 12 },
];

const MAX = Math.max(...kabData.map((d) => d.faskes));
const MIN = Math.min(...kabData.map((d) => d.faskes));

const barColor = (faskes: number) => {
  if (faskes === MAX) return "#1d9e75";
  if (faskes === MIN) return "#DB6058";
  return "#5DCAA5";
};

export default function FacilitySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { setVisible(e.isIntersecting); },
      { threshold: 0.08 }
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
        background: "linear-gradient(180deg, #e0f9f5 0%, #edfcfa 100%)",
        padding: "clamp(3rem,8vh,6rem) clamp(1.5rem,7vw,8rem)",
        overflow: "hidden",
      }}
    >
      {/* ── Section label ── */}
      <div style={{
        ...reveal(0.05),
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        marginBottom: "1.5rem",
        position: "relative",
        zIndex: 2,
      }}>
        <span style={{
          display: "inline-block",
          width: 28,
          height: 2,
          background: "#1d9e75",
          borderRadius: 2,
        }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#e3ba16",
        }}>
          Fasilitas Kesehatan
        </span>
      </div>

      {/* ── Main grid: text left + chart right ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(2rem,5vw,4rem)",
        alignItems: "start",
        position: "relative",
        zIndex: 2,
      }}>

        {/* ── LEFT: headline + paragraphs ── */}
        <div>
          <div style={reveal(0.12)}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.6vw, 3rem)",
              color: "#DB6058",
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}>
              <div>Jumlah Fasilitas</div> {/* Membungkus dengan div agar pindah baris */}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic", // Catatan: "bold italic" bukan standar CSS, pakai "italic" saja karena h2 sudah bold
                color: "#000000",
                display: "block",    // Menambah display block agar pasti turun ke bawah
                marginTop: "0.2rem"  // Memberi sedikit jarak antar baris jika perlu
              }}>
                Per Kabupaten
              </span>
            </h2>
          </div>
          {/* Box paragraph — berlatar Rectangle19.webp */}
          <div style={{
            ...reveal(0.18),
            position: "relative",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: "1rem",
          }}>
            {/* Rectangle19 sebagai background */}
            <img
              src="/images/Rectangle 19.webp"
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "150%",
                objectFit: "cover",
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 0,
              }}
            />
            <p style={{
              position: "relative",
              zIndex: 1,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#1a3a32",
              lineHeight: 1.85,
              margin: 0,
              padding: "13px 16px",
            }}>
              Mencakup rumah sakit, puskesmas, klinik, dan posyandu per
              kabupaten. Puskesmas berfungsi sebagai ujung tombak layanan
              tingkat pertama yang mengutamakan upaya{" "}
              <strong style={{ fontWeight: 700 }}>promotif</strong> dan{" "}
              <strong style={{ fontWeight: 700 }}>preventif</strong>.
            </p>
          </div>

          <div style={reveal(0.24)}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#1a3a32",
              lineHeight: 1.85,
              margin: "0 0 0.75rem",
            }}>
              <strong style={{ fontWeight: 700 }}>Posyandu</strong> hadir
              sebagai layanan berbasis masyarakat untuk mempercepat penurunan
              angka kematian ibu dan bayi.
            </p>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#1a3a32",
              lineHeight: 1.85,
              margin: 0,
            }}>
              Di Sulbar yang geografinya berbukit, jumlah fasilitas saja tidak
              cukup — jaraknya pun menentukan apakah warga benar-benar bisa
              mengaksesnya.
            </p>
          </div>
        </div>

        {/* ── RIGHT: bar chart card ── */}
        <div style={reveal(0.2)}>

          {/* Chart card */}
          <div style={{
            background: "#e8f5ec",
            borderRadius: 18,
            padding: "20px 20px 18px",
            border: "1.5px solid rgba(255,255,255,0.7)",
            position: "relative",
          }}>

            {/* Bunga2 menempel di atas judul chart */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "4px",
            }}>
              <img
                src="/images/bunga3.png"
                alt=""
                aria-hidden="true"
                style={{
                  width: "clamp(100px, 11vw, 110px)",
                  height: "auto",
                  objectFit: "contain",
                  pointerEvents: "none",
                  userSelect: "none",
                  display: "block",
                }}
              />
            </div>

            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0C2726",
              marginBottom: "4px",
              textAlign: "center",
            }}>
              Distribusi Fasilitas Kesehatan per Kabupaten
            </div>

            {/* Legend */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "5px 12px",
              marginBottom: "1.2rem",
              marginTop: "6px",
            }}>
              {[
                { color: "#1d9e75", label: "Terbanyak (Mamuju)" },
                { color: "#5DCAA5", label: "Kabupaten lain" },
                { color: "#DB6058", label: "Tersedikit (Mamuju Tengah)" },
              ].map(({ color, label }) => (
                <span key={label} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 10,
                  color: "#1a3a32",
                }}>
                  <span style={{
                    width: 10, height: 10,
                    borderRadius: 2,
                    background: color,
                    flexShrink: 0,
                  }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Horizontal bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {kabData.map((kab, i) => (
                <div key={kab.name} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ease ${0.28 + i * 0.07}s, transform 0.6s ease ${0.28 + i * 0.07}s`,
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.28rem",
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
                      color: barColor(kab.faskes),
                    }}>
                      {kab.faskes} unit
                    </span>
                  </div>
                  <div style={{
                    height: 10,
                    background: "rgba(0,0,0,0.08)",
                    borderRadius: 8,
                    overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: visible ? `${(kab.faskes / MAX) * 100}%` : "0%",
                      background: barColor(kab.faskes),
                      borderRadius: 8,
                      transition: `width 1s ease ${0.35 + i * 0.08}s`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}