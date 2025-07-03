"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const { status, data } = useSession();
  const router = useRouter()
  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-end gap-3 mt-3">
        <p className="flex gap-2 items-center text-xs font-normal cursor-pointer" onClick={() => router.push("/dashboard")}>
          {data?.user.email}
          <CgProfile className="text-base" />
        </p>
        <button
          className="flex items-center gap-1 text-base cursor-pointer hover:bg-white/10 py-0.5 px-1.5 rounded-md"
          onClick={() => signOut()}
        >
          <FiLogOut className="text-2xl" />
          Logout
        </button>
      </div>
    );
  }
};

export default LogoutButton;
