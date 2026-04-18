'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TextCursor = ({
  text = '+',
  spacing = 60,
  followMouseDirection = false,
  exitDuration = 0.4,
  removalInterval = 40,
  maxPoints = 7,
  boundaryRef,   // ref of the element to listen on + position relative to
}) => {
  const [trail, setTrail] = useState([]);
  const lastMoveTimeRef = useRef(Date.now());
  const idCounter = useRef(0);

  useEffect(() => {
    const el = boundaryRef?.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setTrail((prev) => {
        const newTrail = [...prev];

        if (newTrail.length === 0) {
          newTrail.push({ id: idCounter.current++, x: mouseX, y: mouseY });
        } else {
          const last = newTrail[newTrail.length - 1];
          const dx = mouseX - last.x;
          const dy = mouseY - last.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance >= spacing) {
            const steps = Math.floor(distance / spacing);
            for (let i = 1; i <= steps; i++) {
              const t = (spacing * i) / distance;
              newTrail.push({
                id: idCounter.current++,
                x: last.x + dx * t,
                y: last.y + dy * t,
                angle: followMouseDirection ? (Math.atan2(dy, dx) * 180) / Math.PI : 0,
              });
            }
          }
        }

        return newTrail.length > maxPoints
          ? newTrail.slice(newTrail.length - maxPoints)
          : newTrail;
      });

      lastMoveTimeRef.current = Date.now();
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [boundaryRef, spacing, followMouseDirection, maxPoints]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15 }}>
      <AnimatePresence>
        {trail.map((item, i) => {
          const age = trail.length - 1 - i;
          const scale = 1 - (age / maxPoints) * 0.45;
          const opacity = 1 - (age / maxPoints) * 0.6;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity, scale }}
              exit={{ opacity: 0, scale: 0, transition: { duration: exitDuration } }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                transform: 'translate(-50%, -50%)',
                userSelect: 'none',
                pointerEvents: 'none',
                color: '#1e7a62',
                fontWeight: 300,
                fontSize: `${1.1 + scale * 0.5}rem`,
                lineHeight: 1,
                fontFamily: 'sans-serif',
                textShadow: '0 1px 6px rgba(30,122,98,0.25)',
              }}
            >
              {text}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default TextCursor;
