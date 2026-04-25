// LifeExpectancySection.tsx
// Tren AHH — line chart AHH Sulbar vs Nasional
// Gaya card mirip distribusi fasilitas: bunga di tengah atas, judul tengah, background mint
import { useEffect, useRef, useState } from "react";

const ahhData = [
  { year: 2019, sulbar: 64.21, nasional: 71.34 },
  { year: 2020, sulbar: 64.88, nasional: 71.47 },
  { year: 2021, sulbar: 65.50, nasional: 71.57 },
  { year: 2022, sulbar: 65.93, nasional: 71.85 },
  { year: 2023, sulbar: 66.30, nasional: 72.28 },
  { year: 2024, sulbar: 71.03, nasional: 74.15 },
];

const W = 480;
const H = 200;
const PAD = { top: 24, right: 24, bottom: 36, left: 40 };

function scaleX(i: number, total: number) {
  return PAD.left + (i / (total - 1)) * (W - PAD.left - PAD.right);
}

function scaleY(val: number, minV: number, maxV: number) {
  return PAD.top + ((maxV - val) / (maxV - minV)) * (H - PAD.top - PAD.bottom);
}

function buildPath(data: number[], minV: number, maxV: number) {
  return data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${scaleX(i, data.length).toFixed(1)} ${scaleY(v, minV, maxV).toFixed(1)}`)
    .join(" ");
}

export default function LifeExpectancySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const dur = 1600;
    function step(ts: number) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [visible]);

  const reveal = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const sulbarVals = ahhData.map(d => d.sulbar);
  const nasVals = ahhData.map(d => d.nasional);
  const allVals = [...sulbarVals, ...nasVals];
  const minV = Math.floor(Math.min(...allVals)) - 1;
  const maxV = Math.ceil(Math.max(...allVals)) + 1;

  const sulbarPath = buildPath(sulbarVals, minV, maxV);
  const nasPath = buildPath(nasVals, minV, maxV);
  const pathLength = 700;

  const yTicks = [63, 66, 69, 72, 75];

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background: "#C8F0EA", // mint hijau seperti gambar
        padding: "clamp(3rem,8vh,6rem) clamp(1.5rem,7vw,8rem)",
        overflow: "hidden",
      }}
    >
      {/* Section label */}
      <div style={{
        ...reveal(0.05),
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        marginBottom: "2rem",
        position: "relative",
        zIndex: 2,
      }}>
        <span style={{ display: "inline-block", width: 28, height: 2, background: "#0C2726", borderRadius: 2 }} />
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#0C2726",
        }}>
          Tren Angka Harapan Hidup
        </span>
      </div>

      {/* Grid: teks kiri + chart kanan — stretch agar sama tinggi */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: "clamp(2rem,5vw,4rem)",
        alignItems: "stretch",
        position: "relative",
        zIndex: 2,
      }}>

        {/* ===== KIRI — Headline + Narasi + Legend ===== */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

          <div style={reveal(0.12)}>
            <h2 style={{
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}>
              {/* "Tren AHH Sulbar" — Lora italic */}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                fontWeight: 800,
                fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)",
                color: "#DB6058",
                display: "block",
              }}>
                Tren AHH Sulbar
              </span>
              {/* "vs Nasional" — Bricolage Grotesque */}
              <span style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 2.8vw, 2.3rem)",
                color: "#0C2726",
                display: "block",
              }}>
                vs Nasional
              </span>
            </h2>
          </div>

          <div style={reveal(0.2)}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
              color: "#1a3a32",
              lineHeight: 1.85,
              margin: "0 0 1.2rem",
            }}>
              Di Sulbar yang geografinya beragam, jumlah nakes tidak merata dan satu dokter harus melayani rata-rata dua kali lebih banyak penduduk dibanding rata-rata nasional — mengakibatkan pelayanan yang terbatas.
            </p>
          </div>

        </div>

        {/* ===== KANAN — Card Line Chart (gaya distribusi fasilitas) ===== */}
        <div style={{ ...reveal(0.15), display: "flex", flexDirection: "column" }}>
          <div style={{
            background: "#EEF9F7",
            borderRadius: 20,
            padding: "16px 24px 20px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
            boxShadow: "0 2px 16px rgba(0,80,60,0.07)",
          }}>

            {/* Bunga di tengah atas card — lebih besar, turun sedikit */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 3, marginTop: "0.6rem" }}>
              <img
                src="/images/bunga4.png"
                alt=""
                aria-hidden="true"
                style={{
                  width: "clamp(80px, 11vw, 126px)",
                  objectFit: "contain",
                  display: "inline-block",
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
                }}
              />
            </div>

            {/* Chart title — tengah */}
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#2C3E35",
              textAlign: "center",
              marginBottom: "0.5rem",
              marginTop: "0.5rem",
            }}>
              Distribusi Angka Harapan Hidup
            </div>

            {/* Legend mini dalam card */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.4rem",
              marginBottom: "0.8rem",
              flexWrap: "wrap",
            }}>
              {[
                { color: "#DB6058", label: "Sulawesi Barat", dashed: false },
                { color: "#2DD4BF", label: "Nasional", dashed: true },
              ].map((item) => (
                <span key={item.label} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: "#64748b",
                }}>
                  <svg width="22" height="10">
                    <line
                      x1="0" y1="5" x2="22" y2="5"
                      stroke={item.color}
                      strokeWidth="2.5"
                      strokeDasharray={item.dashed ? "5 3" : undefined}
                      strokeLinecap="round"
                    />
                  </svg>
                  {item.label}
                </span>
              ))}
            </div>

            {/* SVG Line Chart */}
            <svg
              viewBox={`0 0 ${W} ${H}`}
              style={{ width: "100%", height: "auto", flex: 1, overflow: "visible" }}
            >
              {/* Grid lines + Y ticks */}
              {yTicks.map(v => (
                <g key={v}>
                  <line
                    x1={PAD.left} y1={scaleY(v, minV, maxV)}
                    x2={W - PAD.right} y2={scaleY(v, minV, maxV)}
                    stroke="rgba(0,0,0,0.07)" strokeWidth={1}
                  />
                  <text
                    x={PAD.left - 6}
                    y={scaleY(v, minV, maxV) + 4}
                    textAnchor="end"
                    fontSize={8}
                    fill="#94a3b8"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {/* X axis labels */}
              {ahhData.map((d, i) => (
                <text
                  key={d.year}
                  x={scaleX(i, ahhData.length)}
                  y={H - 4}
                  textAnchor="middle"
                  fontSize={8}
                  fill="#94a3b8"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {d.year}
                </text>
              ))}

              {/* Area fill Sulbar */}
              <defs>
                <linearGradient id="sulbarFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DB6058" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#DB6058" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id="nasFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Nasional line — dashed */}
              <path
                d={nasPath}
                fill="none"
                stroke="#2DD4BF"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${pathLength} ${pathLength}`}
                strokeDashoffset={pathLength * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />

              {/* Sulbar line — solid */}
              <path
                d={sulbarPath}
                fill="none"
                stroke="#DB6058"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${pathLength} ${pathLength}`}
                strokeDashoffset={pathLength * (1 - progress)}
                style={{ transition: "stroke-dashoffset 0.05s linear" }}
              />

              {/* Dots */}
              {ahhData.map((d, i) => (
                <g
                  key={`dot-${i}`}
                  opacity={progress > (i / (ahhData.length - 1)) * 0.85 ? 1 : 0}
                  style={{ transition: "opacity 0.3s" }}
                >
                  <circle
                    cx={scaleX(i, ahhData.length)}
                    cy={scaleY(d.nasional, minV, maxV)}
                    r={3.5} fill="#2DD4BF" stroke="white" strokeWidth={1.5}
                  />
                  <circle
                    cx={scaleX(i, ahhData.length)}
                    cy={scaleY(d.sulbar, minV, maxV)}
                    r={3.5} fill="#DB6058" stroke="white" strokeWidth={1.5}
                  />
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}