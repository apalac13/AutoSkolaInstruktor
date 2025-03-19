"use client";
import { animate, useInView, useIsomorphicLayoutEffect } from "framer-motion";
import { useRef } from "react";

export default function Counter({ from, to, animatedOptions }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;

    if (!element || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion)").matches) {
      element.textContent = String(to);
      return;
    }

    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 2,
      ease: "easeInOut",
      ...animatedOptions,
      onUpdate(value) {
        element.textContent = value.toFixed(0);
      },
    });

    return () => {
      controls.stop();
    };
  }, [inView, from, to, animatedOptions]);

  return <span ref={ref} />;
}
