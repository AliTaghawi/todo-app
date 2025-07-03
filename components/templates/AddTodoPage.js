import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";
import { GrAddCircle } from "react-icons/gr";
import AddTodoFrom from "@/modules/AddTodoFrom";

const AddTodoPage = async () => {
  const session = await getSession();
  if (!session) redirect("/signin");
  return (
    <div>
      <h2 className="flex items-center gap-1.5 font-bold text-xl">
        <GrAddCircle /> Add New Todo
      </h2>
      <AddTodoFrom />
    </div>
  );
};

export default AddTodoPage;
