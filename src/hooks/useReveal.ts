// src/hooks/useReveal.ts
// Hook yang mendukung reveal saat scroll ke bawah DAN hide saat scroll ke atas
import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Menghasilkan CSS properties untuk animasi reveal
export function revealStyle(
  visible: boolean,
  delay = 0,
  direction: "up" | "down" = "up"
): React.CSSProperties {
  const translateHide = direction === "up" ? "translateY(32px)" : "translateY(-32px)";
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : translateHide,
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  };
}
