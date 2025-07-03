"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import SignForm from "@/modules/SignForm";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.back();
  }, [status]);

  const clickHandler = async () => {
    const res = await signIn("credentials", { ...form, redirect: false });
    if (res.status === 200) {
      router.replace("/");
    } else {
      toast.error(res.error);
    }
  };

  return <SignForm data={form} setData={setForm} clickHandler={clickHandler} />;
};

export default SignInPage;
