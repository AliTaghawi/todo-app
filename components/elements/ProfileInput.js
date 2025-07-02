const ProfileInput = ({ title, type, name, value, onChange }) => {
  return (
    <div className="flex flex-col mt-4">
      <label htmlFor={name}>{title}:</label>
      <input
        type={type}
        id={name}
        name={name}
        className="bg-white py-0.5 px-2.5 rounded-md outline-0 w-[500px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ProfileInput;
