import { useRef } from "react";
import { ValentineProposalProps } from "@/types/propTypes";

const ValentineProposal = ({
  showNoButton,
  setShowNoButton,
  handleYesClick,
}: ValentineProposalProps) => {
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-5xl md:text-6xl lg:text-7xl heart-pulse">💖</div>

        <h1 className="mb-4 font-bold text-pink-600 text-xl md:text-3xl lg:text-4xl leading-tight">
          Will you be my Valentine?
        </h1>

        <p className="mb-10 text-gray-600 text-sm md:text-base lg:text-lg">
          Choose wisely... 😉
        </p>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          ref={yesButtonRef}
          onClick={handleYesClick}
          className="bg-linear-to-r from-pink-600 to-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.5)] hover:shadow-[0_0_35px_rgba(236,72,153,0.75)] active:shadow-[0_0_50px_rgba(236,72,153,1)] hover:brightness-110 active:brightness-125 px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 border-none rounded-full font-bold text-white text-base md:text-lg lg:text-xl whitespace-nowrap hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer select-none"
        >
          Yes! 💕
        </button>

        <button
          onMouseEnter={() => setShowNoButton(true)}
          onTouchStart={() => setShowNoButton(true)}
          className={`bg-gray-100 px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-5 border-2 border-gray-300 rounded-full font-semibold text-gray-600 text-base md:text-lg lg:text-xl whitespace-nowrap transition-all duration-300 ease-in-out cursor-pointer select-none transform ${showNoButton ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}
        >
          No 😢
        </button>
      </div>
    </>
  );
};

export default ValentineProposal;
