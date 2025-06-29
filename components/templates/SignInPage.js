"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import SignForm from "@/modules/SignForm";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

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
