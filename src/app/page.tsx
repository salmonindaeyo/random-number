"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "./fireworks.css";

export default function Home() {
  const [numbers, setNumbers] = useState<number[]>([0, 0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const successAudioRef = useRef<HTMLAudioElement | null>(null);
  const randomAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // สร้าง Audio elements เมื่อ component โหลด
    successAudioRef.current = new Audio("/sounds/success.mp3");
    successAudioRef.current.volume = 0.5;

    randomAudioRef.current = new Audio("/sounds/randomsound.mp3");
    randomAudioRef.current.volume = 0.5;
    // ตั้งค่าให้เล่นเสียงวนซ้ำ
    if (randomAudioRef.current) {
      randomAudioRef.current.loop = true;
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAnimating) {
      // เริ่มเล่นเสียง random
      if (randomAudioRef.current) {
        randomAudioRef.current
          .play()
          .catch((error) => console.log("Random sound failed:", error));
      }

      intervalId = setInterval(() => {
        setNumbers([
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]);
      }, 50);
    } else {
      // หยุดเสียง random เมื่อ animation จบ
      if (randomAudioRef.current) {
        randomAudioRef.current.pause();
        randomAudioRef.current.currentTime = 0;
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      // หยุดเสียงเมื่อ component unmount
      if (randomAudioRef.current) {
        randomAudioRef.current.pause();
        randomAudioRef.current.currentTime = 0;
      }
    };
  }, [isAnimating]);

  const playSuccessSound = () => {
    if (successAudioRef.current) {
      successAudioRef.current.currentTime = 0;
      successAudioRef.current
        .play()
        .catch((error) => console.log("Success sound failed:", error));
    }
  };

  const generateRandom = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setShowFireworks(false);

    const newNumber = Math.floor(Math.random() * 1000);
    const digits = String(newNumber).padStart(3, "0").split("").map(Number);

    setTimeout(() => {
      setNumbers(digits);
      setIsAnimating(false);
      setShowFireworks(true);
      playSuccessSound();
      setTimeout(() => setShowFireworks(false), 6000);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {showFireworks && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex gap-4 mb-6">
          {numbers.map((num, index) => (
            <motion.div
              key={index}
              className="w-20 h-24 bg-blue-500 rounded-lg flex items-center justify-center text-white text-4xl font-bold"
              animate={
                isAnimating
                  ? {
                      y: [-20, 20],
                      transition: {
                        repeat: Infinity,
                        duration: 0.3,
                        repeatType: "reverse",
                      },
                    }
                  : {}
              }
            >
              {num}
            </motion.div>
          ))}
        </div>
        <button
          onClick={generateRandom}
          disabled={isAnimating}
          className={`w-full py-3 rounded-lg text-white font-semibold
            ${
              isAnimating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
        >
          {isAnimating ? "กำลังสุ่ม..." : "สุ่มตัวเลข"}
        </button>
      </div>
    </div>
  );
}
