import type React from "react";
import Image from "next/image";
import { Avatar } from "@ui/Avatar";

const Header: React.FC = () => {
  return (
    <header className={"grid grid-cols-3 items-center gap-4 bg-blue-900 p-2 px-10 text-center"}>
      <Image src={"/assets/MadleLogo.svg"} alt={"MadleLogo"} width={"100"} height={"100"} />
      <h1 className={"text-4xl font-semibold uppercase italic text-white"}>Madle</h1>
      <div className={"text-end"}>
        <Avatar src="/assets/avatar.png" alt="avatar" className="w-14" />
      </div>
    </header>
  );
};

export default Header;
