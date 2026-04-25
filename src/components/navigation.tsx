import React from "react";

// ── Inline styles ──────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800;900&display=swap');

.nav-root {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Gradient background: teal-left → cyan-center → yellow-right */
.nav-gradient-bg {
  background: linear-gradient(
    105deg,
    #0E6973 0%,
    #1AC6D9 30%,
    #9CEFF9 55%,
    #d4f7c5 78%,
    #e8f77a 100%
  );
}

/* Glass pill wrapper */
.nav-pill-wrapper {
  background: rgba(255,255,255,0.22);
  border: 1px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow:
    0 4px 24px rgba(0,46,50,0.10),
    inset 0 1px 1px rgba(255,255,255,0.6);
  border-radius: 999px;
  transition: box-shadow 0.4s ease, background 0.4s ease;
}
.nav-pill-wrapper.scrolled {
  background: rgba(255,255,255,0.35);
  box-shadow:
    0 8px 40px rgba(0,46,50,0.18),
    inset 0 1px 1px rgba(255,255,255,0.7);
}

/* Brand badge */
.nav-brand {
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.06em;
  color: #002E32;
  background: rgba(255,255,255,0.55);
  border: 1px solid rgba(255,255,255,0.75);
  border-radius: 999px;
  padding: 6px 18px;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(0,46,50,0.10);
  text-transform: uppercase;
}

/* Nav link */
.nav-link {
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #002E32;
  text-decoration: none;
  padding: 6px 14px;
  border-radius: 999px;
  transition: background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  white-space: nowrap;
  position: relative;
}
.nav-link:hover {
  background: rgba(255,255,255,0.55);
  box-shadow: 0 2px 12px rgba(0,46,50,0.12);
  color: #0E6973;
}
.nav-link.active {
  background: rgba(255,255,255,0.65);
  box-shadow: 0 2px 12px rgba(0,46,50,0.14);
  color: #0E6973;
  font-weight: 800;
}

/* Mobile menu */
.nav-mobile-menu {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 49;
  background: rgba(14,105,115,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  gap: 8px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.nav-mobile-menu.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}
.nav-mobile-menu.closed {
  opacity: 0;
  transform: translateY(-12px);
  pointer-events: none;
}
.nav-mobile-link {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  padding: 14px 20px;
  border-radius: 16px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  transition: background 0.2s ease, color 0.2s ease;
}
.nav-mobile-link:hover {
  background: rgba(255,255,255,0.18);
  color: #ffffff;
}

/* Hamburger */
.nav-hamburger {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: rgba(255,255,255,0.4);
  border: 1px solid rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
}
.nav-hamburger:hover {
  background: rgba(255,255,255,0.6);
}

/* Sticky wrapper */
.nav-sticky-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  padding: 10px 16px;
  transition: padding 0.4s ease;
}
.nav-sticky-wrapper.scrolled {
  padding: 6px 16px;
}
`;

// ── Hook ───────────────────────────────────────────────────────────────────
// Inline useScroll in case the import path differs in your project
function useScrolled(threshold = 10) {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
        const handler = () => setScrolled(window.scrollY > threshold);
        window.addEventListener("scroll", handler, { passive: true });
        handler();
        return () => window.removeEventListener("scroll", handler);
    }, [threshold]);
    return scrolled;
}

// ── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
    { label: "Latar Belakang", href: "#latar-belakang" },
    { label: "BPJS", href: "#bpjs" },
    { label: "Fasilitas", href: "#fasilitas" },
    { label: "Tenaga Medis", href: "#tenaga-medis" },
    { label: "Tren AHH", href: "#tren-ahh" },
    { label: "Peta", href: "#peta" },
];

// ── Hamburger icon ─────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }: { open: boolean }) => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="#002E32"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={{
            transition: "transform 300ms ease",
            transform: open ? "rotate(-45deg)" : "rotate(0deg)",
        }}
    >
        <line
            x1="3" y1="5" x2="17" y2="5"
            style={{
                transition: "all 300ms ease",
                strokeDasharray: open ? "20 60" : "14 60",
                strokeDashoffset: open ? "-24px" : "0px",
            }}
        />
        <line x1="3" y1="10" x2="17" y2="10" />
        <line
            x1="3" y1="15" x2="17" y2="15"
            style={{
                transition: "all 300ms ease",
                strokeDasharray: open ? "20 60" : "14 60",
                strokeDashoffset: open ? "-24px" : "0px",
            }}
        />
    </svg>
);

// ── Main Component ─────────────────────────────────────────────────────────
const NavSection = () => {
    const [open, setOpen] = React.useState(false);
    const [activeHref, setActiveHref] = React.useState("#latar-belakang");
    const scrolled = useScrolled(10);

    // Lock body scroll when mobile menu open
    React.useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const handleNavClick = (href: string) => {
        setActiveHref(href);
        setOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />

            {/* Gradient bar behind the pill */}
            <div
                className="nav-root"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    width: "100%",
                }}
            >
                {/* Full-width gradient backdrop */}
                <div
                    className="nav-gradient-bg"
                    style={{
                        position: "absolute",
                        inset: 0,
                        opacity: scrolled ? 1 : 0.92,
                        transition: "opacity 0.4s ease",
                    }}
                />

                {/* Bottom border shimmer */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5) 40%, rgba(255,255,255,0.5) 60%, transparent)",
                    }}
                />

                {/* Nav bar */}
                <nav
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: scrolled ? "8px 20px" : "12px 20px",
                        transition: "padding 0.35s ease",
                        maxWidth: "1280px",
                        margin: "0 auto",
                    }}
                >
                    {/* Brand */}
                    <span className="nav-brand">Kelompok 1 3SD1</span>

                    {/* Desktop links */}
                    <div
                        className={`nav-pill-wrapper${scrolled ? " scrolled" : ""}`}
                        style={{
                            display: "none",
                            alignItems: "center",
                            gap: "2px",
                            padding: "5px 8px",
                        }}
                        id="desktop-nav"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`nav-link${activeHref === link.href ? " active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.href);
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="nav-hamburger"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                        id="mobile-hamburger"
                    >
                        <HamburgerIcon open={open} />
                    </button>
                </nav>

                {/* Responsive styles injected */}
                <style>{`
          @media (min-width: 768px) {
            #desktop-nav { display: flex !important; }
            #mobile-hamburger { display: none !important; }
          }
        `}</style>

                {/* Mobile menu */}
                <div className={`nav-mobile-menu${open ? " open" : " closed"}`}>
                    <div
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 800,
                            fontSize: "11px",
                            letterSpacing: "0.2em",
                            color: "rgba(255,255,255,0.5)",
                            textTransform: "uppercase",
                            marginBottom: "8px",
                            paddingLeft: "20px",
                        }}
                    >
                        Menu Navigasi
                    </div>
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="nav-mobile-link"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(link.href);
                            }}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Bottom credit */}
                    <div
                        style={{
                            marginTop: "auto",
                            paddingTop: "24px",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            color: "rgba(255,255,255,0.35)",
                            textAlign: "center",
                            textTransform: "uppercase",
                        }}
                    >
                        Kelompok 1 3SD1 · Politeknik Statistika STIS
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavSection;