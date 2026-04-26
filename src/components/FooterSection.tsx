// FooterSection.tsx
// Layout: mhs2 kiri — teks tengah — mhs1 kanan
// Tombol BPS Pusat & BPS Sulbar di bawah teks
import { useEffect, useRef, useState } from "react";

export default function FooterSection() {
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

  const reveal = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(36px) scale(0.97)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  return (
    <footer ref={ref} style={{ position: "relative" }}>

      {/* ── CLOSING SECTION ── */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #B8FFE7 0%, #d6fff1 60%, #e8fffb 100%)",
          overflow: "hidden",
          minHeight: "72vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(3rem,8vh,6rem) 0 0",
        }}
      >
        {/* Wave top */}
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: 60,
            pointerEvents: "none",
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          <path d="M0 0 C360 60 1080 0 1440 60 L1440 0 Z" fill="rgba(184,255,231,0.5)" />
        </svg>

        {/* ── mhs2 — KIRI ── */}
        <div
          style={{
            ...reveal(0.05),
            position: "absolute",
            left: "clamp(0rem, 3vw, 3rem)",
            bottom: 0,
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <img
            src="/images/mhs2.png"
            alt="Ilustrasi tenaga kesehatan"
            className="float-anim-slow"
            style={{
              height: "clamp(240px, 48vh, 520px)",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.10))",
            }}
          />
        </div>

        {/* ── mhs1 — KANAN ── */}
        <div
          style={{
            ...reveal(0.05),
            position: "absolute",
            right: "clamp(0rem, 3vw, 3rem)",
            bottom: 0,
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <img
            src="/images/mhs1.png"
            alt="Ilustrasi mahasiswa kesehatan"
            className="float-anim"
            style={{
              height: "clamp(260px, 52vh, 560px)",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.12))",
            }}
          />
        </div>

        {/* ── Teks TENGAH ── */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            textAlign: "center",
            maxWidth: "clamp(320px, 44vw, 680px)",
            padding: "0 1rem clamp(2rem,5vh,4rem)",
          }}
        >
          {/* Judul */}
          <div style={reveal(0.1)}>
            <h2
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                lineHeight: 1.08,
                margin: "0 0 1.4rem",
                color: "#0C2726",
              }}
            >
              Bukan Takdir.
              <br />
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  color: "#DB6058",
                }}
              >
                Ini Sistem
              </span>{" "}
              <span
                style={{
                  fontFamily: "'Lora', serif",
                  fontStyle: "italic",
                  color: "#0C2726",
                }}
              >
                yang Bisa Dibenahi.
              </span>
            </h2>
          </div>

          {/* Paragraf */}
          <div style={reveal(0.22)}>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(0.88rem, 1.5vw, 1.05rem)",
                fontWeight: 500,
                color: "#1a3b38",
                lineHeight: 1.9,
                margin: "0 0 2rem",
                textAlign: "center",
              }}
            >
              Angka harapan hidup Sulawesi Barat bukan hanya statistik — Ia
              adalah cerminan dari setiap puskesmas yang kekurangan dokter,
              setiap warga yang tidak bisa mengakses BPJS, dan setiap fasilitas
              yang memisahkan masyarakat dari layanan kesehatan.
            </p>
          </div>

          {/* ── Tombol BPS ── */}
          <div
            style={{
              ...reveal(0.34),
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {/* BPS Pusat */}
            <a
              href="https://www.bps.go.id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "#1B2A5E",
                color: "#fff",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.04em",
                padding: "0.75rem 1.6rem",
                borderRadius: 999,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(27,42,94,0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(27,42,94,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(27,42,94,0.25)";
              }}
            >
              {/* BPS Logo SVG mini */}
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.15"/>
                <rect x="6" y="8" width="6" height="24" rx="2" fill="#4CAF50"/>
                <rect x="17" y="14" width="6" height="18" rx="2" fill="#2196F3"/>
                <rect x="28" y="4" width="6" height="28" rx="2" fill="#FF5722"/>
              </svg>
              BPS Pusat
            </a>

            {/* BPS Sulbar */}
            <a
              href="https://sulbar.bps.go.id"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "#0C2726",
                color: "#B8FFE7",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.78rem, 1.2vw, 0.9rem)",
                letterSpacing: "0.04em",
                padding: "0.75rem 1.6rem",
                borderRadius: 999,
                textDecoration: "none",
                border: "1.5px solid #B8FFE7",
                boxShadow: "0 4px 20px rgba(12,39,38,0.22)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLAnchorElement).style.background = "#163332";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(12,39,38,0.32)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.background = "#0C2726";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(12,39,38,0.22)";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.12"/>
                <rect x="6" y="8" width="6" height="24" rx="2" fill="#4CAF50"/>
                <rect x="17" y="14" width="6" height="18" rx="2" fill="#B8FFE7"/>
                <rect x="28" y="4" width="6" height="28" rx="2" fill="#FF5722"/>
              </svg>
              BPS Sulawesi Barat
            </a>
          </div>
        </div>
      </div>

      {/* ── FOOTER BAR ── */}
      <div
        style={{
          background: "#0C2726",
          padding: "1.4rem clamp(1.5rem,7vw,8rem)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {/* Branding */}
        <div>
          <div
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              color: "#B8FFE7",
              letterSpacing: "-0.01em",
            }}
          >
            Sulbar · AHH
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.66rem",
              color: "rgba(184,255,231,0.5)",
              marginTop: "0.2rem",
            }}
          >
            Data Storytelling — Akses Kesehatan Sulawesi Barat 2024
          </div>
        </div>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            gap: "1.4rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { label: "Hero", href: "#hero" },
            { label: "Latar", href: "#latar-belakang" },
            { label: "BPJS", href: "#bpjs" },
            { label: "Faskes", href: "#fasilitas" },
            { label: "Nakes", href: "#tenaga-medis" },
            { label: "Tren", href: "#tren-ahh" },
            { label: "Peta", href: "#peta" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "rgba(184,255,231,0.6)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#B8FFE7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(184,255,231,0.6)")}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Credit */}
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "0.6rem",
            color: "rgba(184,255,231,0.35)",
            textAlign: "right",
          }}
        >
          Kelompok 1 · 3SD1
          <br />
          Politeknik Statistika STIS · 2024
        </div>
      </div>
    </footer>
  );
}
