"use client";

import { useEffect, useRef } from "react";

const DEFAULT_KEYCAP_TEXT = "LOADING";
const DEFAULT_ACCENT_COLOR = "#0ea5e9";
const DEFAULT_ANIMATION_SPEED = 400;

const RESPONSIVE_STYLES = {
  base: {
    size: 25,
    radius: 6,
    fontSize: "0.5rem",
    shadowOffset: 3,
    shadowBlur: 8,
    shadowInset: 1.5,
    translateY: 1.5,
    gapRem: 0.5,
    paddingBottom: 30,
  },
  "425px": {
    size: 30,
    radius: 7,
    fontSize: "0.6rem",
    shadowOffset: 3.5,
    shadowBlur: 10,
    shadowInset: 1.75,
    translateY: 1.75,
    gapRem: 0.6,
    paddingBottom: 35,
  },
  "600px": {
    size: 40,
    radius: 9,
    fontSize: "0.8rem",
    shadowOffset: 4.8,
    shadowBlur: 12.8,
    shadowInset: 2.4,
    translateY: 3.2,
    gapRem: 0.7,
    paddingBottom: 40,
  },
  "1024px": {
    size: 50,
    radius: 12,
    fontSize: "1rem",
    shadowOffset: 6,
    shadowBlur: 16,
    shadowInset: 3,
    translateY: 4,
    gapRem: 0.875,
    paddingBottom: 50,
  },
};

const removeActiveClass = (keys: (HTMLDivElement | null)[]) => {
  keys.forEach((key) => {
    if (key !== null) key.classList.remove("active");
  });
};

const addActiveClass = (keys: (HTMLDivElement | null)[], index: number) => {
  if (keys[index] !== null) {
    keys[index]!.classList.add("active");
  }
};

const generateResponsiveStyles = (accentColor: string): string => {
  let styles = "";

  // Generate @media queries
  Object.entries(RESPONSIVE_STYLES).forEach(([breakpoint, style]) => {
    const mediaQuery =
      breakpoint === "base" ? "" : `@media (min-width: ${breakpoint}) `;
    const mediaOpen = mediaQuery ? `${mediaQuery}{` : "";
    const mediaClose = mediaQuery ? "}" : "";

    styles += `
      ${mediaOpen}
        .keycap-base {
          width: ${style.size}px;
          height: ${style.size}px;
          border-radius: ${style.radius}px;
          font-size: ${style.fontSize};
          box-shadow:
            0 ${style.shadowOffset}px 0 #d1d5db,
            0 ${style.shadowOffset + 2}px ${style.shadowBlur}px rgba(0, 0, 0, 0.1),
            inset 0 -${style.shadowInset}px ${style.shadowInset * 2}px rgba(0, 0, 0, 0.05);
        }

        .keycap-base.active {
          transform: translateY(${style.translateY}px);
          box-shadow:
            0 ${style.shadowOffset / 2}px 0 #d1d5db,
            0 ${style.shadowOffset / 1.5}px ${style.shadowBlur * 0.75}px ${accentColor},
            inset 0 -${style.shadowInset / 1.5}px ${style.shadowInset}px rgba(0, 0, 0, 0.1);
        }

        .keyboard-container {
          gap: ${style.gapRem}rem;
          padding-bottom: ${style.paddingBottom}px;
        }
      ${mediaClose}
    `;
  });

  return styles;
};

interface LoadingUIProps {
  keycapText?: string;
  accentColor?: string;
  animationSpeed?: number;
}

export default function LoadingUI({
  keycapText = DEFAULT_KEYCAP_TEXT,
  accentColor = DEFAULT_ACCENT_COLOR,
  animationSpeed = DEFAULT_ANIMATION_SPEED,
}: LoadingUIProps) {
  const keycapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const animateSequence = () => {
    const keys = keycapRefs.current;
    removeActiveClass(keys);
    addActiveClass(keys, currentIndexRef.current);

    currentIndexRef.current = (currentIndexRef.current + 1) % keys.length;

    timeoutIdRef.current = setTimeout(animateSequence, animationSpeed);
  };

  useEffect(() => {
    animateSequence();

    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [animationSpeed]);

  return (
    <>
      <style>{`
        .keycap-base {
          position: relative;
          background: #ffffff;
          border: 1px solid #f2f2f2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #374151;
          cursor: default;
          user-select: none;

          transition: transform 0.13s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.13s ease;
          transform: translateZ(0);
        }

        ${generateResponsiveStyles(accentColor)}

        .keyboard-container {
          display: flex;
          perspective: 1000px;
          position: relative;
        }
      `}</style>

      <div
        className="flex items-center justify-center"
        role="status"
        aria-label="로딩 중"
        aria-live="polite"
      >
        <section className="keyboard-container">
          {keycapText.split("").map((char, index) => (
            <div
              key={index}
              ref={(el) => {
                keycapRefs.current[index] = el;
              }}
              className="keycap-base"
            >
              {char}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
