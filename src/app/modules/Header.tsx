"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Avatar } from "@ui/Avatar";
import Link from "next/link";

const Header: React.FC = () => {
  const [isHomePage, setIsHomePage] = React.useState(false);

  useEffect(() => {
    setIsHomePage(window.location.pathname === "/");
  }, []);

  return (
    <header className={"grid grid-cols-3 items-center gap-4 bg-blue-900 p-2 px-10 text-center"}>
      <Link href={ "/" }>
        <Image src={"/assets/MadleLogo.svg"} alt={"MadleLogo"} width={"100"} height={"100"} />
      </Link>
      <h1 className={"text-3xl font-semibold uppercase italic text-white"}>Madle</h1>
      <div className={"text-end"}>
        {isHomePage ? <Avatar src="/assets/avatar.png" alt="avatar" className="w-14" /> : null}
      </div>
    </header>
  );
};

export default Header;
