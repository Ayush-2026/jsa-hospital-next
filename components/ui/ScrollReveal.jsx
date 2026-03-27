"use client";

import { useEffect, useRef, useState } from "react";

const variants = {
  fadeUp:    { hidden: "opacity-0 translate-y-10",  visible: "opacity-100 translate-y-0" },
  fadeDown:  { hidden: "opacity-0 -translate-y-10", visible: "opacity-100 translate-y-0" },
  fadeLeft:  { hidden: "opacity-0 translate-y-10",  visible: "opacity-100 translate-y-0" },
  fadeRight: { hidden: "opacity-0 translate-y-10",  visible: "opacity-100 translate-y-0" },
  zoom:      { hidden: "opacity-0 scale-95",         visible: "opacity-100 scale-100"     },
  zoomDown:  { hidden: "opacity-0 scale-105",        visible: "opacity-100 scale-100"     },
};

export default function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 700,
  threshold = 0.12,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const v = variants[variant] || variants.fadeUp;

  return (
    <div
      ref={ref}
      className={`${className} ${v.hidden} transition-all ease-out ${visible ? v.visible : ""}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}
