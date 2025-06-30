"use client";

import { useState } from "react";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

const textStyle = "bg-white py-0.5 px-2.5 rounded-md outline-0 w-[500px]";

const AddTodoFrom = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const textChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const statusHandler = (e) => {
    setData((prev) => ({ ...prev, status: e.target.value }));
  };
  return (
    <div className="text-neutral-700">
      <div className="flex flex-col items-start mt-8">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={textChange}
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
          onChange={textChange}
          id="desc"
          placeholder="Description"
          className={`${textStyle} h-[100px]`}
        />
      </div>
      <div className="flex items-center gap-4 mt-5">
        <div className="bg-orange-300 px-2 py-0.5 rounded-sm flex gap-2 ">
          <label htmlFor="todo" className="flex gap-1 items-center">
            <BsAlignStart /> Todo
          </label>
          <input
            type="radio"
            value="todo"
            id="todo"
            checked={data.status === "todo"}
            onChange={statusHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTodoFrom;
