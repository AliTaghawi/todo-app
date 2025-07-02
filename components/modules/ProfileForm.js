import ProfileInput from "components/elements/ProfileInput";

const buttonStyle = "py-0.5 px-4 rounded-md mt-8";

const ProfileForm = ({ data, changeHandler, edit }) => {
  return (
    <div>
      <ProfileInput
        title="Name"
        type="text"
        name="name"
        value={data.name}
        onChange={changeHandler}
      />
      <ProfileInput
        title="lastName"
        type="text"
        name="lastName"
        value={data.lastName}
        onChange={changeHandler}
      />
      <ProfileInput
        title="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={changeHandler}
      />
      <div>
        <button
          className={`bg-neutral-400 text-neutral-900 ${buttonStyle} ${
            edit ? null : "w-[500px]"
          }`}
        >
          Save
        </button>
        {edit ? (
          <button className={`bg-neutral-400 text-neutral-900 ${buttonStyle}`}>
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileForm;
