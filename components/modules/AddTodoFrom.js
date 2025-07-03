"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import RadioButton from "components/elements/RadioButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

const textStyle = "bg-white py-0.5 px-2.5 rounded-md outline-0 w-full";
const buttonStyle =
  "mt-5 bg-neutral-400 text-neutral-900 px-10 py-1 rounded-md font-semibold hover:bg-neutral-300 hover:outline-neutral-700 hover:outline-1";

const AddTodoFrom = ({ todoId }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  useEffect(() => {
    if (todoId) fetchTodo(todoId);
  }, []);

  const router = useRouter();

  async function fetchTodo(id) {
    const result = await fetch(`/api/todos/${id}`);
    const res = await result.json();
    setData(res.todo);
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const addHandler = async () => {
    const result = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setData({
        title: "",
        description: "",
        status: "todo",
      });
    }
  };

  const editHandler = async () => {
    const result = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const res = await result.json();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(res.message);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  };

  return (
    <div className="text-neutral-700 w-full mobile:w-[500px]">
      <div className="flex flex-col items-start mt-8">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={changeHandler}
          id="title"
          placeholder="title"
          className={textStyle}
        />
      </div>
      <div className="flex flex-col items-start mt-5">
        <label htmlFor="desc">Description:</label>
        <textarea
          name="description"
          value={data.description}
          onChange={changeHandler}
          id="desc"
          placeholder="Description"
          className={`${textStyle} h-[100px]`}
        />
      </div>
      <div className="flex items-center justify-between mt-5 max-mobile:flex-col max-mobile:items-start max-mobile:gap-5">
        <RadioButton
          title="Todo"
          value="todo"
          status={data.status}
          changeHandler={changeHandler}
        >
          <BsAlignStart />
        </RadioButton>
        <RadioButton
          title="In Progress"
          value="inprogress"
          status={data.status}
          changeHandler={changeHandler}
        >
          <FiSettings />
        </RadioButton>
        <RadioButton
          title="Review"
          value="review"
          status={data.status}
          changeHandler={changeHandler}
        >
          <AiOutlineFileSearch />
        </RadioButton>
        <RadioButton
          title="Done"
          value="done"
          status={data.status}
          changeHandler={changeHandler}
        >
          <MdDoneAll />
        </RadioButton>
      </div>
      {todoId ? (
        <div className="flex justify-between items-center">
          <button className={`${buttonStyle}`} onClick={editHandler}>
            Edit
          </button>
          <button
            className={`${buttonStyle} text-center`}
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button className={`${buttonStyle} w-full`} onClick={addHandler}>
          Add
        </button>
      )}
      <Toaster />
    </div>
  );
};

export default AddTodoFrom;
