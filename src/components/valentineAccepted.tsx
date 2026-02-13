import { useState } from "react";
import VideoPlayer from "@/components/videoPlayer";

const ValentineAccepted = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayVideo = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-2 text-6xl md:text-7xl lg:text-8xl bounce-animation">
        🎉
      </div>

      <h1 className="bg-clip-text bg-linear-to-r from-pink-600 to-pink-400 mb-5 font-bold text-pink-600 text-3xl md:text-4xl lg:text-5xl">
        Congratulations! 💖
      </h1>

      <p className="mb-2 text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
        You made the right choice!
      </p>

      <p className="font-semibold text-pink-400 text-lg md:text-xl lg:text-2xl italic">
        Happy Valentine's Day! 💕✨
      </p>

      <div className="mt-4 text-3xl md:text-4xl lg:text-5xl">💑 💐 🌹</div>

      <button
        onClick={handlePlayVideo}
        className="bg-linear-to-r from-pink-600 to-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.75)] active:shadow-[0_0_50px_rgba(236,72,153,1)] hover:brightness-110 active:brightness-125 mt-4 px-8 md:px-10 lg:px-12 py-4 border-none rounded-full font-bold text-white text-base md:text-lg lg:text-xl whitespace-nowrap hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer select-none"
      >
        Play our sacred video! 🎥
      </button>

      <VideoPlayer
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default ValentineAccepted;
