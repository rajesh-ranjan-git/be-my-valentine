"use client";

import { useEffect, useState } from "react";
import { FallingHeart } from "@/types/types";

const FallingHearts = () => {
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);

  useEffect(() => {
    const hearts: FallingHeart[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 15 + Math.random() * 25,
    }));

    setFallingHearts(hearts);
  }, []);

  return (
    <>
      {fallingHearts?.length &&
        fallingHearts.map((heart) => (
          <div
            key={heart.id}
            className="-top-12 z-1 absolute pointer-events-none falling-heart"
            style={
              {
                left: `${heart.left}%`,
                fontSize: `${heart.size}px`,
                "--duration": `${heart.duration}s`,
                "--delay": `${heart.delay}s`,
              } as React.CSSProperties
            }
          >
            ❤️
          </div>
        ))}
    </>
  );
};

export default FallingHearts;
