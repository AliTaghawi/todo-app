"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Tasks from "@/modules/Tasks";
import TaskList from "@/modules/TaskList";

const todoContainersStyle = "bg-white rounded-lg w-full";
const bannerStyle =
  "text-white font-bold w-full text-center rounded-t-lg py-0.5 px-2";

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
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start gap-4 max-w-[1400px] mx-auto">
      <TaskList
        data={todos?.todo}
        fetchTodos={fetchTodos}
        next="inprogress"
        color="todo"
        title="Todo"
      />
      <TaskList
        data={todos?.inprogress}
        fetchTodos={fetchTodos}
        next="review"
        back="todo"
        color="inprogress"
        title="In Progress"
      />
      <TaskList
        data={todos?.review}
        fetchTodos={fetchTodos}
        next="done"
        back="inprogress"
        color="review"
        title="Review"
      />
      <TaskList
        data={todos?.done}
        fetchTodos={fetchTodos}
        back="review"
        color="done"
        title="Done"
      />
    </div>
  );
}

export default HomePage;
