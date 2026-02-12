"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ExplosionHeart } from "@/types/types";
import ValentineProposal from "@/components/valentineProposal";
import ValentineAccepted from "@/components/valentineAccepted";
import ExplosionHearts from "@/components/explosionHearts";

const Valentine = () => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [explosionHearts, setExplosionHearts] = useState<ExplosionHeart[]>([]);
  const [showNoButton, setShowNoButton] = useState<boolean>(false);
  const [noPosition, setNoPosition] = useState<number>(0);
  const [translateValues, setTranslateValues] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const celebrationAudioRef = useRef<HTMLAudioElement>(null);
  const errorAudioRef = useRef<HTMLAudioElement>(null);

  const calculateTranslateValues = () => {
    if (!containerRef.current || !buttonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    const padding = 16;

    const containerWidth = container.width;
    const containerHeight = container.height;
    const buttonWidth = button.width;
    const buttonHeight = button.height;

    const positions = [
      `translate(${containerWidth / 2 - buttonWidth / 2 - padding}px, ${-(containerHeight / 2) + buttonHeight / 2 + padding}px)`,
      `translate(${-(containerWidth / 2) + buttonWidth / 2 + padding}px, ${-(containerHeight / 2) + buttonHeight / 2 + padding}px)`,
      `translate(${-(containerWidth / 2) + buttonWidth / 2 + padding}px, ${containerHeight / 2 - buttonHeight / 2 - padding}px)`,
      `translate(${containerWidth / 2 - buttonWidth / 2 - padding}px, ${containerHeight / 2 - buttonHeight / 2 - padding}px)`,
    ];

    setTranslateValues(positions[noPosition]);
  };

  const playErrorSound = () => {
    if (!errorAudioRef.current) return;

    errorAudioRef.current.currentTime = 0;
    errorAudioRef.current
      .play()
      .catch((err) =>
        console.error("❌ ERROR :: Error audio play failed:", err),
      );
  };

  const moveNoButton = () => {
    setNoPosition((prev) => (prev + 1) % 4);
  };

  const triggerConfetti = (): void => {
    const duration = 10000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    const randomInRange = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: [
          "#ff69b4",
          "#ff1493",
          "#ff6b9d",
          "#ffc0cb",
          "#ff85a1",
          "#FFD700",
          "#FF69B4",
        ],
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: [
          "#ff69b4",
          "#ff1493",
          "#ff6b9d",
          "#ffc0cb",
          "#ff85a1",
          "#FFD700",
          "#FF69B4",
        ],
      });
    }, 250);
  };

  const handleYesClick = (): void => {
    setAnswered(true);
    setShowNoButton(false);

    if (celebrationAudioRef.current) {
      celebrationAudioRef.current
        .play()
        .catch((err) =>
          console.error("❌ ERROR :: Celebration audio play failed:", err),
        );
    }

    triggerConfetti();

    const heartExplosion: ExplosionHeart[] = Array.from(
      { length: 40 },
      (_, i) => ({
        id: i,
        angle: (i / 40) * 360,
        distance: 80 + Math.random() * 120,
        duration: 0.8 + Math.random() * 0.6,
        delay: Math.random() * 0.2,
      }),
    );

    setExplosionHearts(heartExplosion);

    setTimeout(() => {
      setExplosionHearts([]);
    }, 10000);
  };

  useEffect(() => {
    if (showNoButton) {
      setTimeout(() => {
        calculateTranslateValues();
      }, 0);
    }
  }, [showNoButton, noPosition]);

  useEffect(() => {
    const handleResize = () => {
      if (showNoButton) {
        calculateTranslateValues();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showNoButton, noPosition]);

  return (
    <div
      ref={containerRef}
      className="z-2 relative flex flex-col justify-center items-center bg-white/95 shadow-2xl p-4 rounded-xl w-[84%] max-w-200 h-[90vh] max-h-120 text-pink-600 text-lg md:text-xl lg:text-2xl text-center"
    >
      <audio
        ref={celebrationAudioRef}
        src="/assets/sounds/celebration-sound.mp3"
        preload="auto"
      />

      <audio
        ref={errorAudioRef}
        src="/assets/sounds/error-sound.mp3"
        preload="auto"
      />

      {!answered ? (
        <ValentineProposal
          showNoButton={showNoButton}
          setShowNoButton={setShowNoButton}
          handleYesClick={handleYesClick}
          playErrorSound={playErrorSound}
        />
      ) : (
        <ValentineAccepted />
      )}

      <ExplosionHearts explosionHearts={explosionHearts} />

      {showNoButton && (
        <button
          ref={buttonRef}
          onPointerDown={() => {
            playErrorSound();
            moveNoButton();
          }}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          className="top-1/2 left-1/2 absolute bg-gray-100 px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 border-2 border-gray-300 rounded-full font-semibold text-gray-600 text-base md:text-lg lg:text-xl whitespace-nowrap transition-transform -translate-x-1/2 -translate-y-1/2 duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer select-none"
          style={{
            transform: translateValues || "translate(-50%, -50%)",
          }}
        >
          No 😢
        </button>
      )}
    </div>
  );
};

export default Valentine;
