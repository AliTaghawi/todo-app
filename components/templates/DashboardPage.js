"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { CiEdit } from "react-icons/ci";
import ProfileForm from "@/modules/ProfileForm";
import ProfileDetails from "@/modules/ProfileDetails";
import ChangePassword from "@/modules/ChangePassword";
import DeleteAccountForm from "@/modules/DeleteAccountForm";

const buttonStyle =
  "bg-neutral-400 text-neutral-900 hover:bg-neutral-300 hover:outline-neutral-900 hover:outline-1 py-0.5 px-4 rounded-md mt-8";

const DashboardPage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    lastName: "",
    password: "",
  });
  const [edit, setEdit] = useState(false);
  const [updatePass, setUpdatePass] = useState(false);
  const [del, setDel] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const result = await fetch("/api/profile");
    const res = await result.json();
    if (res.error) {
      console.log(res);
    } else {
      const completed = res.name && res.lastName;
      setProfileData((prev) => ({ ...prev, ...res, completed }));
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const saveHandler = async () => {
    const result = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify(profileData),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setProfileData((prev) => ({
        ...prev,
        completed: prev.name && prev.lastName,
      }));
      setEdit(false);
    }
  };

  return (
    <div className="w-fit mobile:min-w-[500px] min-w-full">
      <div className="text-xl font-bold flex items-center gap-2">
        <CgProfile />
        <h2>Profile</h2>
        {!edit ? (
          <button
            className="ml-auto cursor-pointer"
            onClick={() => {
              setEdit(true);
              setDel(false);
              setUpdatePass(false);
            }}
          >
            <CiEdit />
          </button>
        ) : null}
      </div>
      {profileData.completed && !edit ? (
        <>
          <ProfileDetails data={profileData} />
          <div className="flex justify-between items-center gap-8 max-sm:flex-col max-sm:gap-0">
            <button
              className={`${buttonStyle} max-sm:w-full`}
              onClick={() => {
                setUpdatePass(true);
                setDel(false);
                setEdit(false);
              }}
            >
              Change password
            </button>
            <button
              className={`${buttonStyle} bg-red-300 text-red-800 hover:bg-red-200 hover:outline-red-800 max-sm:w-full`}
              onClick={() => {
                setDel(true);
                setUpdatePass(false);
                setEdit(false);
              }}
            >
              Delete account
            </button>
          </div>
        </>
      ) : (
        <ProfileForm
          data={profileData}
          changeHandler={changeHandler}
          edit={edit}
          setEdit={setEdit}
          saveHandler={saveHandler}
        />
      )}
      {updatePass ? <ChangePassword setUpdatePass={setUpdatePass} /> : null}
      {del ? <DeleteAccountForm setDel={setDel} styles={buttonStyle} /> : null}
      <Toaster />
    </div>
  );
};

export default DashboardPage;
