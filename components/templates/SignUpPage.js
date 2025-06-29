"use client"
import SignForm from "@/modules/SignForm";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const router = useRouter()

  const clickHandler = async () => {
    const result = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {"Content-Type": "application/json"}
    })
    const res = await result.json()
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(res.message)
      router.push("/signin")
    }
  }
  
  return (
    <SignForm data={form} setData={setForm} register={true} clickHandler={clickHandler} />
  );
}

export default SignUpPage;
