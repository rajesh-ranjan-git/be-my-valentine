import { VideoPlayerProps } from "@/types/propTypes";

const VideoPlayer = ({ isModalOpen, handleCloseModal }: VideoPlayerProps) => {
  return (
    <>
      {isModalOpen && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-linear-to-br from-black via-rose-950/90 to-black backdrop-blur-md p-4 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-rose-400/30 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>

          <div
            className="relative bg-linear-to-br from-rose-900/40 to-pink-900/30 shadow-[0_0_40px_rgba(244,63,94,0.35)] backdrop-blur-xl border border-rose-400/30 rounded-3xl w-full max-w-4xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 border border-rose-300/20 rounded-3xl animate-pulse pointer-events-none" />

            <button
              onClick={handleCloseModal}
              className="top-4 right-4 z-10 absolute flex justify-center items-center bg-linear-to-br from-rose-500 to-pink-600 hover:shadow-[0_0_15px_rgba(244,63,94,0.8)] rounded-full w-10 h-10 font-semibold text-white text-xl hover:scale-110 transition-all duration-300"
            >
              ✕
            </button>

            <div className="pt-5 pb-4 text-center">
              <h2 className="font-semibold text-rose-200 text-xl md:text-2xl tracking-wide">
                Our sacred video 💖
              </h2>
            </div>

            <div className="relative flex justify-center items-center bg-black">
              <video
                className="w-auto h-auto max-h-[70vh]"
                controls
                autoPlay
                controlsList="nodownload"
              >
                <source
                  src="/assets/videos/our-sacred-video.mp4"
                  type="video/mp4"
                />
              </video>

              <div className="absolute inset-0 bg-linear-to-t from-rose-900/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
