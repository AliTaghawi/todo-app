import AddTodoFrom from "@/modules/AddTodoFrom";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { CiEdit } from "react-icons/ci";

const EditTodoPage = async ({todoId}) => {
  const session = await getSession()
  if (!session) redirect('/signin')
  return (
    <div>
      <h2 className="flex items-center gap-1.5 font-bold text-xl">
        <CiEdit className="text-2xl" /> Edit Todo
      </h2>
      <AddTodoFrom todoId={todoId}/>
    </div>
  );
};

export default EditTodoPage;