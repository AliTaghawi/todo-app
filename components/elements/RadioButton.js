const RadioButton = ({ title, value, status, changeHandler, children }) => {
  const buttonColor = {
    todo: "bg-orange-400",
    inprogress: "bg-emerald-500",
    review: "bg-blue-600",
    done: "bg-cyan-500",
  };

  return (
    <div className={`px-2 py-0.5 rounded-sm flex gap-2 text-white ${buttonColor[value]}`}>
      <label htmlFor={value} className="flex gap-1 items-center">
        {children} {title}
      </label>
      <input
        type="radio"
        value={value}
        name="status"
        id={value}
        checked={status === value}
        onChange={changeHandler}
      />
    </div>
  );
};

export default RadioButton;
