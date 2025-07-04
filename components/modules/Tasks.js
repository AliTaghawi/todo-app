import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { LuCalendarClock } from "react-icons/lu";
import { RiMastodonLine, RiDeleteBin2Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { buttonColor } from "@/utils/constants";

const buttonStyle = "text-sm px-4 py-0.5 rounded-md text-white flex items-center gap-0.5 hover:opacity-80 cursor-pointer";

const Tasks = ({ data, fetchTodos, next, back }) => {
  const statusHandler = async (todo, status) => {
    const result = await fetch("/api/todos/", {
      method: "PATCH",
      body: JSON.stringify({ ...todo, status }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    fetchTodos();
  };

  const deleteHandler = async (_id) => {
    const result = await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ _id }),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      fetchTodos();
    }
  };

  return (
    <>
      {!data?.length ? (
        <p className="text-center m-2">No task to show in this filed!</p>
      ) : null}
      {data?.map((todo) => (
        <div
          key={todo._id}
          className=" shadow-[0_2px_5px] shadow-black/30 p-2 m-4 mt-8 rounded-md text-neutral-800 min-w-[200px]"
        >
          <div className="flex justify-between items-center">
            <span
              className={`${
                buttonColor[todo.status]
              } block h-1 w-20 rounded-sm mb-2`}
            ></span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  deleteHandler(todo._id);
                }}
              >
                <RiDeleteBin2Line />
              </button>
              <Link href={`/edit-todo/${todo._id}`}>
                <CiEdit className="text-xl" />
              </Link>
            </div>
          </div>
          <div className="flex items-start justify-between mt-2">
            <RiMastodonLine />
            <p className="text-neutral-500 text-sm flex items-center gap-1">{new Date(todo.deadline).toLocaleDateString()}<LuCalendarClock /></p>
          </div>
          <h4 className="text-sm font-semibold">{todo.title}</h4>
          <p className="text-neutral-500 text-sm">{todo.description}</p>
          <div className="flex justify-between items-center mt-2">
            {back ? (
              <button
                className={`${buttonStyle} ${buttonColor[back]}`}
                onClick={() => {
                  statusHandler(todo, back);
                }}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className={`${buttonStyle} ml-auto ${buttonColor[next]}`}
                onClick={() => {
                  statusHandler(todo, next);
                }}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
        </div>
      ))}
      <Toaster />
    </>
  );
};

export default Tasks;
