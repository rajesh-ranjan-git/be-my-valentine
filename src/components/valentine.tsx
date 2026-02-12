"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ExplosionHeart } from "@/types/types";
import ValentineProposal from "@/components/valentineProposal";
import ValentineAccepted from "@/components/valentineAccepted";
import ExplosionHearts from "@/components/explosionHearts";

const Valentine = () => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [explosionHearts, setExplosionHearts] = useState<ExplosionHeart[]>([]);

  const triggerConfetti = (): void => {
    const duration = 3000;
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
    }, 2000);
  };

  return (
    <div className="z-2 relative flex flex-col justify-center items-center bg-white/95 p-4 rounded-xl w-[84%] max-w-200 h-[90vh] max-h-120 text-pink-600 text-lg md:text-xl lg:text-2xl text-center">
      {!answered ? (
        <ValentineProposal handleYesClick={handleYesClick} />
      ) : (
        <ValentineAccepted />
      )}

      <ExplosionHearts explosionHearts={explosionHearts} />
    </div>
  );
};

export default Valentine;
