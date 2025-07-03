import { useState } from "react";
import toast from "react-hot-toast";
import ProfileInput from "components/elements/ProfileInput";

const buttonStyle =
  "bg-neutral-400 text-neutral-900 hover:bg-neutral-300 hover:outline-neutral-900 hover:outline-1 py-0.5 px-4 rounded-md mt-8";

const ChangePassword = ({ setUpdatePass }) => {
  const [data, setData] = useState({
    password: "",
    newPassword: "",
    repeatPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateHandler = async () => {
    const result = await fetch("/api/update-password", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setUpdatePass(false);
    }
  };

  return (
    <div>
      <ProfileInput
        title="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={changeHandler}
      />
      <ProfileInput
        title="New password"
        type="password"
        name="newPassword"
        value={data.newPassword}
        onChange={changeHandler}
      />
      <ProfileInput
        title="Repeat Password"
        type="password"
        name="repeatPassword"
        value={data.repeatPassword}
        onChange={changeHandler}
      />
      <div className="flex justify-between items-center">
        <button className={buttonStyle} onClick={updateHandler}>
          Change
        </button>
        <button className={buttonStyle} onClick={() => setUpdatePass(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
