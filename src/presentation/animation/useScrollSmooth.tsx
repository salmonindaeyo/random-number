"use client";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export const useScrollSmooth = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const transform = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
    mass: 1.5,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onResize = () => {
      document.body.style.height = `${wrapper.scrollHeight}px`;
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { wrapperRef, contentRef, transform };
};
