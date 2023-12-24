import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header
      className={`sticky right-0 top-0 z-10 flex h-fit w-full items-center bg-white px-4 py-4 duration-700 ease-in-out animate-in fade-in-10 before:opacity-5 md:px-20`}
    >
      <Link href="/home" className="flex gap-2">
        <Image src={logo} alt="logo" priority />
        <span className="text-xl font-medium">Dooist</span>
      </Link>
    </header>
  );
};

export default Header;
