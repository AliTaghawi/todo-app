"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Tasks from "@/modules/Tasks";

const todoContainersStyle = "w-full bg-white rounded-lg";
const bannerStyle = "text-white font-bold w-full text-center rounded-t-lg py-0.5 px-2";

function HomePage() {
  const [todos, setTodos] = useState();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/signin");
  }, [status]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const result = await fetch("api/todos");
    const res = await result.json();
    setTodos(res.todos);
  };

  return (
    <div className="flex justify-between items-start gap-4">
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-orange-400`}>Todo</p>
        <Tasks data={todos?.todo} fetchTodos={fetchTodos} next="inprogress" />
      </div>
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-emerald-500`}>In Progress</p>
        <Tasks
          data={todos?.inprogress}
          fetchTodos={fetchTodos}
          next="review"
          back="todo"
        />
      </div>
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-blue-600`}>Review</p>
        <Tasks
          data={todos?.review}
          fetchTodos={fetchTodos}
          next="done"
          back="inprogress"
        />
      </div>
      <div className={todoContainersStyle}>
        <p className={`${bannerStyle} bg-cyan-500`}>Done</p>
        <Tasks data={todos?.done} fetchTodos={fetchTodos} back="review" />
      </div>
    </div>
  );
}

export default HomePage;
