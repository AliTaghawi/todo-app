const ProfileDetails = ({ data }) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="flex items-center text-neutral-800 gap-2">
        <span className="text-neutral-500">Name:</span>
        <p>{data.name}</p>
      </div>
      <div className="flex items-center text-neutral-800 gap-2">
        <span className="text-neutral-500">last name:</span>
        <p>{data.lastName}</p>
      </div>
      <div className="flex items-center text-neutral-800 gap-2">
        <span className="text-neutral-500">Email:</span>
        <p>{data.email}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
