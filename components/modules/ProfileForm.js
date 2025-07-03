import ProfileInput from "components/elements/ProfileInput";

const buttonStyle =
  "bg-neutral-400 text-neutral-900 hover:bg-neutral-300 hover:outline-neutral-900 hover:outline-1 py-0.5 px-4 rounded-md mt-8";

const ProfileForm = ({ data, changeHandler, edit, setEdit, saveHandler }) => {
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
      <div className="flex justify-between items-center">
        {edit ? <button className={buttonStyle} onClick={() => setEdit(false)}>Cancel</button> : null}
        <button className={`${buttonStyle} ${edit ? null : "w-[500px]"}`} onClick={saveHandler} >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
