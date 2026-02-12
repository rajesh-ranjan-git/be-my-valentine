import { ExplosionHeartsProps } from "@/types/propTypes";

const ExplosionHearts = ({ explosionHearts }: ExplosionHeartsProps) => {
  return (
    <>
      {explosionHearts.map((heart) => {
        const angle = (heart.angle * Math.PI) / 180;
        const tx = Math.cos(angle) * heart.distance;
        const ty = Math.sin(angle) * heart.distance;

        return (
          <div
            key={heart.id}
            className="top-1/2 left-1/2 absolute text-2xl md:text-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none heart-explode"
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
    </>
  );
};

export default ExplosionHearts;
