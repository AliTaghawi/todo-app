import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { CiEdit } from "react-icons/ci";
import AddTodoFrom from "@/modules/AddTodoFrom";

const EditTodoPage = async ({todoId}) => {
  const session = await getServerSession(authOption)
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