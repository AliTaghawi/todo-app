import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Tasks from "@/modules/Tasks";
import { buttonColor } from "@/utils/constants";

const TaskList = ({ data, fetchTodos, next, back, color, title }) => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(window.innerWidth > 600 ? true : false);
  }, []);

  return (
    <div className={`bg-white rounded-lg w-full overflow-hidden relative pb-8 ${open || !data ? "h-auto" : "h-[200px]"}`} >
      <p className={`text-white font-bold w-full text-center rounded-t-lg py-0.5 px-2 ${buttonColor[color]}`}>
        {title}
      </p>
      <Tasks data={data} fetchTodos={fetchTodos} next={next} back={back} />
      <button
        className="text-2xl w-full bg-gray-700/30 flex justify-center py-0.5 absolute z-10 bottom-0"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
    </div>
  );
};

export default TaskList;
