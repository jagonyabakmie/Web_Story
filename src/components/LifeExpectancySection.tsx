// LifeExpectancySection.tsx
// Tren AHH — line chart AHH Sulbar vs Nasional
import { useEffect, useRef, useState } from "react";

// AHH data Sulbar vs Nasional
const ahhData = [
  { year: 2019, sulbar: 64.21, nasional: 71.34 },
  { year: 2020, sulbar: 64.88, nasional: 71.47 },
  { year: 2021, sulbar: 65.50, nasional: 71.57 },
  { year: 2022, sulbar: 65.93, nasional: 71.85 },
  { year: 2023, sulbar: 66.30, nasional: 72.28 },
  { year: 2024, sulbar: 71.03, nasional: 74.15 },
];

const W = 500;
const H = 180;
const PAD = { top: 20, right: 20, bottom: 32, left: 40 };

function scaleX(i: number, total: number) {
  return PAD.left + (i / (total - 1)) * (W - PAD.left - PAD.right);
}

function scaleY(val: number, minV: number, maxV: number) {
  return PAD.top + ((maxV - val) / (maxV - minV)) * (H - PAD.top - PAD.bottom);
}

function buildPath(data: number[], minV: number, maxV: number) {
  return data.map((v, i) => `${i === 0 ? "M" : "L"} ${scaleX(i, data.length)} ${scaleY(v, minV, maxV)}`).join(" ");
}

export default function LifeExpectancySection() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
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

  // Animate the line draw progress
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const dur = 1500;
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
  const minV = Math.min(...allVals) - 1;
  const maxV = Math.max(...allVals) + 1;

  const sulbarPath = buildPath(sulbarVals, minV, maxV);
  const nasPath = buildPath(nasVals, minV, maxV);

  // For animation: use stroke-dasharray trick
  const pathLength = 600; // approximate

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
      {/* Ornamen bunga atas kanan */}
      <img
        src="/images/bunga4.png"
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
          Tren Angka Harapan Hidup
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.3fr",
        gap: "clamp(2rem,5vw,4rem)",
        alignItems: "center",
        position: "relative",
        zIndex: 2,
      }}>
        {/* LEFT — headline */}
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
              Tren AHH{" "}
              <span style={{
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
                color: "#DB6058",
              }}>
                Sulbar vs Nasional
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
              Di Sulbar yang geografis berperan, jumlah nakes tidak merata dan satu dokter harus melayani rata-rata dua kali lebih banyak penduduk dibanding rata-rata nasional mengakibatkan pelayanan yang terbatas.
            </p>
          </div>

          {/* Legend */}
          <div style={{ ...reveal(0.28), display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 24, height: 3, background: "#DB6058", borderRadius: 3 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#334155" }}>
                AHH Sulawesi Barat
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 24, height: 3, background: "#2DD4BF", borderRadius: 3 }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#334155" }}>
                AHH Nasional
              </span>
            </div>
          </div>

          {/* Highlight pills */}
          <div style={{ ...reveal(0.35), display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <div style={{
              background: "#FFE5E0",
              border: "1.5px solid #EFAA9E",
              borderRadius: 12,
              padding: "0.7rem 1.1rem",
            }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#DB6058", marginBottom: "0.2rem" }}>
                AHH SULBAR 2024
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#DB6058" }}>
                71,03 <span style={{ fontSize: "0.65rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>tahun</span>
              </div>
            </div>
            <div style={{
              background: "#C5EDEA",
              border: "1.5px solid #8DD5CF",
              borderRadius: 12,
              padding: "0.7rem 1.1rem",
            }}>
              <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0C2726", marginBottom: "0.2rem" }}>
                NASIONAL 2024
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#0C2726" }}>
                74,15 <span style={{ fontSize: "0.65rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>tahun</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — SVG line chart */}
        <div style={reveal(0.2)}>
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 260,
              overflow: "visible",
            }}
          >
            {/* Grid lines */}
            {[63, 66, 69, 72, 75].map(v => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  y1={scaleY(v, minV, maxV)}
                  x2={W - PAD.right}
                  y2={scaleY(v, minV, maxV)}
                  stroke="rgba(0,0,0,0.07)"
                  strokeWidth={1}
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
                y={H - 2}
                textAnchor="middle"
                fontSize={8}
                fill="#94a3b8"
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {d.year}
              </text>
            ))}

            {/* Nasional line */}
            <path
              d={nasPath}
              fill="none"
              stroke="#2DD4BF"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - progress)}
            />

            {/* Sulbar line */}
            <path
              d={sulbarPath}
              fill="none"
              stroke="#DB6058"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={pathLength}
              strokeDashoffset={pathLength * (1 - progress)}
            />

            {/* Dots */}
            {ahhData.map((d, i) => (
              <g key={`dot-${i}`} opacity={progress > (i / (ahhData.length - 1)) * 0.9 ? 1 : 0}
                style={{ transition: "opacity 0.3s" }}>
                <circle
                  cx={scaleX(i, ahhData.length)}
                  cy={scaleY(d.nasional, minV, maxV)}
                  r={3.5}
                  fill="#2DD4BF"
                  stroke="white"
                  strokeWidth={1.5}
                />
                <circle
                  cx={scaleX(i, ahhData.length)}
                  cy={scaleY(d.sulbar, minV, maxV)}
                  r={3.5}
                  fill="#DB6058"
                  stroke="white"
                  strokeWidth={1.5}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* mhs3 ilustrasi pojok kanan bawah */}
      <div style={{
        ...reveal(0.35),
        position: "absolute",
        bottom: 0,
        right: "5%",
        zIndex: 1,
        pointerEvents: "none",
      }}>
        <img
          src="/images/mhs3.png"
          alt="Ilustrasi tenaga kesehatan"
          style={{
            width: "clamp(80px,13vw,180px)",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          }}
        />
      </div>
    </section>
  );
}
