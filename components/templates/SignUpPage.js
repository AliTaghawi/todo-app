"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import SignForm from "@/modules/SignForm";

function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.back();
  }, [status]);

  const clickHandler = async () => {
    const result = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    console.log(res);
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    }
  };

  return (
    <SignForm
      data={form}
      setData={setForm}
      register={true}
      clickHandler={clickHandler}
    />
  );
}

export default SignUpPage;
