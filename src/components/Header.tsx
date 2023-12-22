import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header>
      <Link
        className={`md:mx-20 animate-in fade-in-10 fixed z-10 mx-4 flex gap-2 pt-6 duration-700 ease-in-out before:opacity-5`}
        href="/home"
      >
        <Image src={logo} alt="logo" priority />
        <span className="text-xl font-medium">Dooist</span>
      </Link>
    </header>
  );
};

export default Header;
