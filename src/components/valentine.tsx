import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface FallingHeart {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface ExplosionHeart {
  id: number;
  angle: number;
  distance: number;
  duration: number;
  delay: number;
}

interface ButtonPosition {
  top: string;
  left: string;
}

const ValentineProposal = () => {
  const [answered, setAnswered] = useState<boolean>(false);
  const [noButtonPosition, setNoButtonPosition] = useState<ButtonPosition>({
    top: "50%",
    left: "65%",
  });
  const [explosionHearts, setExplosionHearts] = useState<ExplosionHeart[]>([]);
  const [fallingHearts, setFallingHearts] = useState<FallingHeart[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Generate falling hearts
    const hearts: FallingHeart[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 15 + Math.random() * 25,
    }));
    setFallingHearts(hearts);
  }, []);

  const moveNoButton = (e: React.MouseEvent | React.TouchEvent): void => {
    if (answered) return;

    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;
    const button = noButtonRef.current;

    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonWidth = 100;
    const buttonHeight = 50;

    const padding = 10;
    const maxTop = containerRect.height - buttonHeight - padding;
    const maxLeft = containerRect.width - buttonWidth - padding;

    const newTop = padding + Math.random() * (maxTop - padding);
    const newLeft = padding + Math.random() * (maxLeft - padding);

    setNoButtonPosition({
      top: `${newTop}px`,
      left: `${newLeft}px`,
    });
  };

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

    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play failed:", err));
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
    }, 2000);
  };

  return (
    <div className="relative bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 w-screen h-screen overflow-hidden font-sans">
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.6;
            }
            90% {
              opacity: 0.6;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes heartPulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes heartExplode {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(var(--tx), var(--ty)) scale(0.5);
              opacity: 0;
            }
          }

          @keyframes fadeInScale {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-20px);
            }
            60% {
              transform: translateY(-10px);
            }
          }

          .falling-heart {
            animation: fall var(--duration) linear var(--delay) infinite;
          }

          .heart-pulse {
            animation: heartPulse 1.5s ease-in-out infinite;
          }

          .heart-explode {
            animation: heartExplode var(--duration) ease-out forwards;
            animation-delay: var(--delay);
          }

          .fade-in-scale {
            animation: fadeInScale 0.5s ease-out;
          }

          .bounce-animation {
            animation: bounce 1s ease-in-out;
          }

          .yes-button {
            transition: all 0.3s ease;
          }

          .yes-button:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
          }

          .yes-button:active {
            transform: scale(0.95);
          }

          .no-button {
            transition: all 0.2s ease;
          }

          .no-button:hover {
            background: #ff6b9d;
          }
        `}
      </style>

      {/* Falling Hearts Background */}
      {fallingHearts.map((heart) => (
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

      {/* Audio element */}
      <audio ref={audioRef} src="/celebration-sound.mp3" preload="auto" />

      {/* Main Container */}
      <div className="z-2 box-border relative flex justify-center items-center p-5 w-full h-full">
        {!answered ? (
          <div className="z-10 relative bg-white/95 shadow-2xl p-10 md:p-12 lg:p-14 rounded-[30px] w-full max-w-137.5 text-center fade-in-scale">
            <div className="mb-5 text-5xl md:text-6xl lg:text-7xl heart-pulse">
              💖
            </div>

            <h1 className="mb-4 font-bold text-pink-600 text-2xl md:text-3xl lg:text-4xl leading-tight">
              Will you be my Valentine?
            </h1>

            <p className="mb-10 text-gray-600 text-sm md:text-base lg:text-lg">
              Choose wisely... 😉
            </p>

            <div
              ref={containerRef}
              className="relative mt-8 w-full h-45 md:h-50 lg:h-55"
            >
              {/* Yes Button */}
              <button
                ref={yesButtonRef}
                onClick={handleYesClick}
                className="top-1/2 left-[20%] z-100 absolute bg-linear-to-r from-pink-600 to-pink-400 shadow-lg px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 border-none rounded-full font-bold text-white text-base md:text-lg lg:text-xl whitespace-nowrap -translate-x-1/2 -translate-y-1/2 cursor-pointer yes-button"
              >
                Yes! 💕
              </button>

              {/* No Button */}
              <button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                className="z-99 absolute bg-gray-100 px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 border-2 border-gray-300 rounded-full font-semibold text-gray-600 text-base md:text-lg lg:text-xl whitespace-nowrap -translate-x-1/2 -translate-y-1/2 touch-none cursor-pointer no-button"
                style={{
                  top: noButtonPosition.top,
                  left: noButtonPosition.left,
                }}
              >
                No 😢
              </button>

              {/* Heart Explosion Effect */}
              {explosionHearts.map((heart) => {
                const angle = (heart.angle * Math.PI) / 180;
                const tx = Math.cos(angle) * heart.distance;
                const ty = Math.sin(angle) * heart.distance;

                return (
                  <div
                    key={heart.id}
                    className="top-1/2 left-[20%] z-200 absolute text-2xl md:text-3xl pointer-events-none heart-explode"
                    style={
                      {
                        "--tx": `${tx}px`,
                        "--ty": `${ty}px`,
                        "--duration": `${heart.duration}s`,
                        "--delay": `${heart.delay}s`,
                      } as React.CSSProperties
                    }
                  >
                    ❤️
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="z-10 bg-white/95 shadow-2xl px-8 md:px-12 lg:px-14 py-10 md:py-14 lg:py-16 rounded-[30px] w-full max-w-150 text-center fade-in-scale">
            <div className="mb-5 text-6xl md:text-7xl lg:text-8xl bounce-animation">
              🎉
            </div>

            <h1 className="bg-clip-text bg-linear-to-r from-pink-600 to-pink-400 mb-5 font-bold text-pink-600 text-3xl md:text-4xl lg:text-5xl">
              Congratulations! 💖
            </h1>

            <p className="mb-4 text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
              You made the right choice!
            </p>

            <p className="text-gray-400 text-base md:text-lg lg:text-xl italic">
              Happy Valentine's Day! 💕✨
            </p>

            <div className="mt-8 text-3xl md:text-4xl lg:text-5xl">
              💑 💐 🌹
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineProposal;
