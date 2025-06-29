"use client"
import SignForm from "@/modules/SignForm";
import { useState } from "react";

function SignUpPage() {

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const clickHandler = () => {
    console.log(form)
  }
  
  return (
    <SignForm data={form} setData={setForm} register={true} clickHandler={clickHandler} />
  );
}

export default SignUpPage;
