import FallingHearts from "@/components/fallingHearts";
import Valentine from "@/components/valentine";

const BeMyValentine = () => {
  return (
    <main className="relative flex justify-center items-center bg-linear-to-br from-indigo-500 via-purple-500 to-purple-700 w-screen h-dvh overflow-hidden">
      <FallingHearts />
      <Valentine />
    </main>
  );
};

export default BeMyValentine;
