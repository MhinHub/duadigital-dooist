import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header>
      <Link
        className={`fixed z-10 mx-4 flex w-full items-center gap-2 bg-white pb-5 pt-6 duration-700 ease-in-out animate-in fade-in-10 before:opacity-5 md:mx-20`}
        href="/home"
      >
        <Image src={logo} alt="logo" priority />
        <span className="text-xl font-medium">Dooist</span>
      </Link>
    </header>
  );
};

export default Header;
