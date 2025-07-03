"use client"
import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  return (
    <button
      className="flex items-center gap-1 text-base cursor-pointer hover:bg-white/10 py-0.5 px-1.5 rounded-md"
      onClick={() => signOut()}
    >
      <FiLogOut className="text-2xl" />
      Logout
    </button>
  );
};

export default LogoutButton;
