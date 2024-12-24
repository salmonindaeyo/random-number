"use client";
import { useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap-trial";
import { ScrollTrigger } from "gsap-trial/ScrollTrigger";
import { useNav } from "@/core/contexts/nav-context";

export const AnimationPage = () => {
  const [isShow, setIsShow] = useState(true);
  const { setIsNavVisible } = useNav();

  useEffect(() => {
    const initAnimation = () => {
      gsap.registerPlugin(ScrollTrigger);

      const textElement = document.querySelector(".troika-text");
      if (!textElement) return;

      ScrollTrigger.getAll().forEach((t) => t.kill());

      gsap.set(textElement, {
        fontSize: "35vw",
        y: "0",
        transformOrigin: "0% 50%",
      });

      gsap.to(textElement, {
        scrollTrigger: {
          trigger: ".animation-container",
          start: "top top",
          end: "+=720",
          scrub: 0.5,
          markers: false,
          toggleActions: "play none none none",
          onUpdate: (self) => {
            console.log(self.progress);
            if (self.progress === 1) {
              setIsShow(false);
              setIsNavVisible(true);
            } else {
              setIsShow(true);
              setIsNavVisible(false);
            }
          },
        },
        fontSize: "3.1325vw",
        y: "0",
        scale: 1,
        transformOrigin: "0% 50%",
        ease: "power2.inOut",
      });
    };

    const timer = setTimeout(initAnimation, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="relative">
      <div id="smooth-content">
        <div className="min-h-screen animation-container">
          <div className="h-[350px]"></div>

          <div className=" relative h-screen flex items-center ">
            <div
              className="troika-text px-[30px] font-bold"
              style={{
                fontSize: "35vw",
                position: "relative",
              }}
            >
              troika
            </div>
          </div>

          <div className="h-[1000px]"></div>
        </div>
      </div>
    </div>
  );
};
