import Link from "next/link";
import { Toaster } from "react-hot-toast";

const inputStyles =
  "shadow-[0_3px_10px] shadow-black/20 py-2 px-5 rounded-lg w-[300px]";

const SignForm = ({ data, setData, clickHandler, register = false }) => {
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" bg-white mt-32 mx-auto p-8 rounded-2xl w-[500px] text-center flex flex-col items-center gap-8">
      <h2 className="text-xl font-bold text-neutral-700">Registration Form</h2>
      <input
        className={inputStyles}
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={changeHandler}
      />
      <input
        className={inputStyles}
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={changeHandler}
      />
      {register ? (
        <input
          className={inputStyles}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChange={changeHandler}
        />
      ) : null}
      <button
        className="bg-neutral-300 py-2 px-5 rounded-lg cursor-pointer font-semibold text-neutral-700 hover:bg-neutral-200"
        onClick={clickHandler}
      >
        Register
      </button>
      <div className="flex gap-2">
        <p>
          {register ? "If you have a account?" : "If you don't have a account?"}
        </p>
        <Link href={register ? "/singin" : "signup"} className="text-blue-700">
          {register ? "SingIn" : "SignUp"}
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default SignForm;
