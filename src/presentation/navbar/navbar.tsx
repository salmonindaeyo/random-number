"use client";
import { useNav } from "@/core/contexts/nav-context";

export const Navbar = () => {
  const { isNavVisible } = useNav();

  if (!isNavVisible) return null;

  return (
    <div
      id="main-navbar"
      className="flex bg-white justify-between items-center p-4 pl-0 fixed top-0 left-0 right-0 z-50"
    >
      <div
        id="nav-title"
        className="text-[3.1325vw] px-[30px] font-bold transition-opacity duration-300"
      >
        troika
      </div>
      <div className="flex gap-4">
        <div className="text-sm">Home</div>
        <div className="text-sm">About</div>
        <div className="text-sm">Contact</div>
      </div>
    </div>
  );
};
