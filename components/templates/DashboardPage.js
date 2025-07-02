"use client";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileForm from "@/modules/ProfileForm";

const DashboardPage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    lastName: "",
    password: "",
  });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const result = await fetch("/api/profile");
    const res = await result.json();
    if (res.error) {
      console.log(res);
    } else {
      setProfileData((prev) => ({ ...prev, ...res }));
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="text-xl font-bold flex items-center gap-2">
        <CgProfile />
        Profile
      </h2>
      {profileData.name && profileData.lastName ? (
        "ali"
      ) : (
        <ProfileForm
          data={profileData}
          changeHandler={changeHandler}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export default DashboardPage;
