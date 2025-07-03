import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import ProfileInput from "components/elements/ProfileInput";

const DeleteAccountForm = ({ styles, setDel }) => {
  const [password, setPassword] = useState("");

  const deleteHandler = async () => {
    const result = await fetch("/api/profile", {
      method: "DELETE",
      body: JSON.stringify({ password }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setTimeout(() => {
        signOut();
      }, 500);
    }
  };

  return (
    <div className="mt-8">
      <ProfileInput
        type="password"
        name="password"
        title="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between items-center -mt-3">
        <button className={styles} onClick={() => setDel(false)}>
          Cancel
        </button>
        <button
          className={`${styles} bg-red-300 text-red-800 hover:bg-red-200 hover:outline-red-800`}
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountForm;
