import { useRouter } from "next/navigation";
import Image from "next/image";
import icon from "@/assets/icon.svg";

const Welcome = () => {
  const { push } = useRouter();
  return (
    <section className="h-screen bg-black">
      <div className="flex h-full flex-col items-center justify-center gap-7 text-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src={icon} alt="icon" />
          <span className="text-center text-4xl font-medium">Dooist</span>
        </div>
        <div className="animate-in slide-in-from-bottom-10 fade-in-0 flex flex-col items-center justify-center text-xl font-extralight tracking-wide duration-700 ease-out">
          <p>Write what you need to do.</p>
          <p>Everyday.</p>
        </div>
      </div>
      <div className="absolute bottom-16 grid w-full place-content-center">
        <button
          onClick={() => push("/home")}
          className="rounded-full bg-white text-center"
        >
          <p className="px-16 py-4 text-black">Let&#39;s Go</p>
        </button>
      </div>
    </section>
  );
};

export default Welcome;
