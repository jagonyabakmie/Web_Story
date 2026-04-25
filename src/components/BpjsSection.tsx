// BpjsSection.tsx
import { useEffect, useRef, useState } from "react";

// ── Pie data ──────────────────────────────────────────────────────────────────
const PIE_DATA = [
  {
    label: "Persentase Penduduk yang Memiliki BPJS Kesehatan Penerima Bantuan Iuran (PBI)",
    shortLabel: "PBI",
    value: 66.11,
    color: "#E8834A",
  },
  {
    label: "Persentase Penduduk yang Memiliki BPJS Kesehatan Non-Penerima Bantuan Iuran (Non-PBI)",
    shortLabel: "Non-PBI",
    value: 20.02,
    color: "#2BA7A7",
  },
  {
    label: "Lainnya",
    shortLabel: "Lainnya",
    value: 13.87,
    color: "#F4CE6A",
  },
];

// ── SVG helpers ───────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function slicePath(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = polar(cx, cy, r, a2);
  const e = polar(cx, cy, r, a1);
  return [
    `M ${cx} ${cy}`,
    `L ${s.x} ${s.y}`,
    `A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${e.x} ${e.y}`,
    "Z",
  ].join(" ");
}
function buildSlices() {
  const total = PIE_DATA.reduce((s, d) => s + d.value, 0);
  let cur = 0;
  return PIE_DATA.map((d) => {
    const start = cur;
    cur += (d.value / total) * 360;
    return { ...d, start, end: cur };
  });
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart({
  hovered,
  setHovered,
}: {
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const slices = buildSlices();
  const cx = 450, cy = 450, r = 425, ir = 310;

  return (
    <svg
      width={700}
      height={700}
      viewBox="0 0 700 700"
      style={{ overflow: "visible", cursor: "pointer", display: "block" }}
    >
      {/* soft outer glow */}
      <circle cx={cx} cy={cy} r={r + 12} fill="rgba(0,0,0,0.07)" />

      {slices.map((s, i) => {
        const isHov = hovered === i;
        const mid = (s.start + s.end) / 2;
        const lp = polar(cx, cy, (r + ir) / 2, mid);
        const nudge = isHov ? polar(0, 0, 16, mid) : { x: 0, y: 0 };

        return (
          <g
            key={i}
            transform={`translate(${nudge.x},${nudge.y})`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ transition: "transform 0.28s cubic-bezier(.34,1.56,.64,1)" }}
          >
            <path
              d={slicePath(cx, cy, isHov ? r + 16 : r, s.start, s.end)}
              fill={s.color}
              stroke="white"
              strokeWidth={5}
              style={{
                filter: isHov ? `drop-shadow(0 8px 20px ${s.color}99)` : "none",
                transition: "filter 0.2s",
              }}
            />
            <text
              x={lp.x}
              y={lp.y + 6}
              textAnchor="middle"
              fontSize={isHov ? 36 : 29}
              fill="white"
              fontFamily="'Bricolage Grotesque', sans-serif"
              fontWeight={800}
              style={{ pointerEvents: "none", transition: "font-size 0.15s" }}
            >
              {s.value.toFixed(2)}%
            </text>
          </g>
        );
      })}

      {/* donut hole */}
      <circle cx={cx} cy={cy} r={ir} fill="rgba(180,236,232,0.55)" style={{ pointerEvents: "none" }} />
      <circle cx={cx} cy={cy} r={ir - 6} fill="rgba(200,242,238,0.70)" style={{ pointerEvents: "none" }} />

      {/* center label */}
      {hovered !== null ? (
        <>
          <text
            x={cx} y={cy - 16}
            textAnchor="middle" fontSize={13} fill="#1a4a44"
            fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight={600}
            style={{ pointerEvents: "none" }}
          >
            {slices[hovered].shortLabel}
          </text>
          <text
            x={cx} y={cy + 18}
            textAnchor="middle" fontSize={45}
            fill={PIE_DATA[hovered].color}
            fontFamily="'Bricolage Grotesque', sans-serif" fontWeight={800}
            style={{ pointerEvents: "none" }}
          >
            {PIE_DATA[hovered].value.toFixed(2)}%
          </text>
        </>
      ) : (
        <>
          <text
            x={cx} y={cy - 12}
            textAnchor="middle" fontSize={13} fill="#2a7a70"
            fontFamily="'Plus Jakarta Sans', sans-serif"
            style={{ pointerEvents: "none" }}
          >
            Total
          </text>
          <text
            x={cx} y={cy + 22}
            textAnchor="middle" fontSize={50} fill="#0C2726"
            fontFamily="'Bricolage Grotesque', sans-serif" fontWeight={800}
            style={{ pointerEvents: "none" }}
          >
            100%
          </text>
        </>
      )}
    </svg>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function BpjsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const reveal = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap');
      `}</style>

      <section
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(150deg, #cff4ef 0%, #b6ede7 45%, #9adfd8 100%)",
          overflow: "hidden",
          boxSizing: "border-box",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* ── Dot grid — right half background ── */}
        <div style={{
          position: "absolute",
          top: 0, right: 0,
          width: "55%", height: "100%",
          backgroundImage: "radial-gradient(circle, rgba(43,167,167,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* ── BPJS logo bubble — top right, shifted down ── */}
        <div style={{
          position: "absolute",
          top: "clamp(5rem,10vh,8rem)",
          right: "clamp(20rem,4vw,4rem)",
          zIndex: 4,
          width: "clamp(200px,35vw,280px)",
          height: "clamp(200px,35vw,280px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #ffffff 0%, #d6f4f0 55%, #a8e2dc 100%)",
          boxShadow: "0 6px 28px rgba(43,167,167,0.22), 0 2px 6px rgba(0,0,0,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <img
            src="/images/bpjs.png"
            alt="Logo BPJS Kesehatan"
            style={{ width: "70%", height: "70%", objectFit: "contain" }}
          />
        </div>

        {/* ── mhs1 character — bigger, absolute right ── */}
        <img
          src="/images/mhs1.png"
          alt="Ilustrasi petugas BPJS"
          style={{
            position: "absolute",
            bottom: 0,
            right: "clamp(-1rem,1vw,1.5rem)",
            height: "clamp(500px,85vh,900px)",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 3,
            filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.12))",
          }}
        />

        {/* ── vector13 — yellow wave ornament bottom ── */}
        <svg
          viewBox="0 0 1440 170"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0, left: 0,
            width: "100%",
            height: "clamp(100px,15vh,170px)",
            pointerEvents: "none",
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          <path
            d="M0 110 C200 55 420 145 660 88 C880 38 1100 128 1300 72 C1380 50 1420 85 1440 68 L1440 170 L0 170 Z"
            fill="#F4CE6A" opacity={0.50}
          />
          <path
            d="M0 132 C220 90 460 158 700 118 C920 80 1140 150 1340 108 C1400 92 1428 118 1440 104 L1440 170 L0 170 Z"
            fill="#F4CE6A" opacity={0.72}
          />
          <path
            d="M0 150 C180 126 380 160 580 144 C780 128 980 158 1180 140 C1300 128 1390 150 1440 138 L1440 170 L0 170 Z"
            fill="#F1BD1E" opacity={0.88}
          />
          {[50, 170, 300, 440, 580, 710, 850, 980, 1110, 1250, 1390].map((x, i) => (
            <circle key={i} cx={x} cy={112 + (i % 3) * 11} r={4.5} fill="#D4A017" opacity={0.45} />
          ))}
        </svg>

        {/* ══════════════════════════════════════════════════════════════════════
            UPPER AREA — tag + title + description (left-aligned)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(2.2rem,5vh,4rem) clamp(2rem,6vw,6rem) 0",
          maxWidth: "55%",
        }}>
          {/* Tag */}
          <div style={{
            ...reveal(0.04),
            display: "flex", alignItems: "center", gap: "0.7rem",
            marginBottom: "clamp(0.8rem,1.4vh,1.2rem)",
          }}>
            <span style={{
              display: "inline-block", width: 32, height: 2.5,
              background: "#F1BD1E", borderRadius: 2,
            }} />
            <span style={{
              fontSize: "clamp(1.3rem,1.9vw,1.5rem)",
              fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase" as const, color: "#F1BD1E",
            }}>
              Jaminan Kesehatan
            </span>
          </div>

          {/* Title */}
          <div style={reveal(0.1)}>
            <h2 style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem,5vw,4.4rem)",
              color: "#D0312D",
              margin: "0 0 clamp(0.7rem,1.4vh,1.1rem)",
              lineHeight: 1.1,
              textUnderlineOffset: "6px",
            }}>
              Persentase Penduduk{" "}
              <span style={{ fontStyle: "lora", color: "#1e1e1e" }}>Ber-BPJS</span>
            </h2>
          </div>

          {/* Description */}
          <div style={reveal(0.17)}>
            <p style={{
              fontSize: "clamp(1.8rem,2.3vw,2rem)",
              color: "#1f4a47",
              lineHeight: 1.8,
              margin: 0,
              maxWidth: 850,
            }}>
              Tanpa BPJS, banyak orang memilih menunda berobat karena biaya — dan itulah
              yang perlahan menggerus harapan hidup. Penelitian menunjukkan bahwa JKN
              efektif memperluas akses layanan dan turut meningkatkan AHH.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            LOWER AREA — chart title + legend LEFT | donut CENTER (no box)
        ═══════════════════════════════════════════════════════════════════════ */}
        <div style={{
          ...reveal(0.24),
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          padding: "clamp(1.4rem,3vh,2.4rem) clamp(2rem,6vw,6rem) clamp(120px,17vh,180px)",
          gap: "clamp(1.5rem,3vw,3rem)",
        }}>

          {/* LEFT — chart title + legend */}
          <div style={{
            flex: "0 0 auto",
            width: "clamp(500px,50vw,700px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(14px,2vh,22px)",
            marginLeft: "100px",
          }}>
            {/* chart section title */}
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(2rem,2.2vw,2.05rem)",
              fontWeight: 700,
              color: "#0C2726",
              paddingLeft: 12,
              borderLeft: "5px solid #E8834A",
              lineHeight: 1.5,
            }}>
              Persentase Penduduk Sulawesi Barat yang Memiliki Jaminan Kesehatan
            </div>

            {/* legend items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {PIE_DATA.map((d, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "15px 25px", borderRadius: 30,
                    background: hovered === i ? `${d.color}22` : "rgba(255,255,255,0.30)",
                    border: `1.5px solid ${hovered === i ? d.color + "66" : "rgba(255,255,255,0.50)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div style={{
                    width: 13, height: 13, borderRadius: 3,
                    backgroundColor: d.color, flexShrink: 0, marginTop: 3,
                    boxShadow: hovered === i ? `0 2px 8px ${d.color}88` : "none",
                    transition: "box-shadow 0.2s",
                  }} />
                  <div>
                    <div style={{
                      fontSize: "clamp(27px,4vw,20px)",
                      color: "#1f4a47", lineHeight: 1.5,
                    }}>
                      {d.label}
                    </div>
                    <div style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontSize: "clamp(70px,7vw,50px)",
                      fontWeight: 800, color: d.color, marginTop: 2,
                      transform: hovered === i ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "left center",
                      transition: "transform 0.2s ease",
                    }}>
                      {d.value.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — pie chart, no box */}
          <div style={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "center",
            paddingRight: "400px",
            transform: "translateY(-200px)", 
          }}>
            <DonutChart hovered={hovered} setHovered={setHovered} />
          </div>

        </div>
      </section>
    </>
  );
}
