import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <nav className="flex justify-between border-b px-2 h-16 items-center">
      <Link
        href="/"
        className="font-extrabold text-red-950 hover:text-red-800 transition-colors"
      >
        otcGuide
      </Link>
      <ul>
        <li>
          <Link href="/">Refresh</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
