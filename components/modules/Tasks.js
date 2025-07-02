import Link from "next/link";
import { RiMastodonLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

const Tasks = ({ data, fetchTodos, next, back }) => {
  const buttonColor = {
    todo: "bg-orange-400",
    inprogress: "bg-emerald-500",
    review: "bg-blue-600",
    done: "bg-cyan-500",
  };

  const statusHandler = async (todo, status) => {
    const result = await fetch("/api/todos/", {
      method: "PATCH",
      body: JSON.stringify({...todo, status}), 
      headers: {"Content-Type": "application/json"}
    })
    const res = await result.json()
    fetchTodos()
  }

  return (
    <>
      {data?.map((todo) => (
        <div
          key={todo._id}
          className=" shadow-[0_2px_5px] shadow-black/30 p-2 m-4 mt-8 rounded-md text-neutral-800"
        >
          <div className="flex justify-between items-center">
            <span
              className={`${
                buttonColor[todo.status]
              } block h-1 w-20 rounded-sm mb-2`}
            ></span>
            <Link href={`/edit-todo/${todo._id}`}>
              <CiEdit className="text-xl" />
            </Link>
          </div>
          <RiMastodonLine className="" />
          <h4 className="text-sm font-semibold">{todo.title}</h4>
          <p className="text-neutral-500 text-sm">{todo.description}</p>
          <div className="flex justify-between items-center mt-2">
            {back ? (
              <button
                className={`text-sm px-4 py-0.5 rounded-md text-white ${buttonColor[back]}`}
                onClick={() => {statusHandler(todo, back)}}
              >
                Back
              </button>
            ) : null}
            {next ? (
              <button
                className={`text-sm px-4 py-0.5 rounded-md text-white ${buttonColor[next]}`}
                onClick={() => {statusHandler(todo, next)}}
              >
                Next
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default Tasks;
